import prisma from "@/lib/db/prisma";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const organizationId = searchParams.get("organizationId");

        // Enforce organization isolation guard
        if (!organizationId) {
            return Response.json(
                { error: "organizationId is required" },
                { status: 400 }
            );
        }

        // Fetch products filtered by the organization
        const products = await prisma.product.findMany({
            where: {
                organizationId: organizationId,
            },
        });

        return Response.json(
            { message: "Products retrieved successfully", products },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { error: "Something went wrong", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, price, organizationId, sku, description } = body;

        if (!name || price === undefined || !organizationId) {
            return Response.json(
                { error: "Name, price, and organizationId are required" },
                { status: 400 }
            );
        }

        // Verify organization exists first
        const organizationExists = await prisma.organization.findUnique({
            where: { id: organizationId }
        });

        if (!organizationExists) {
            return Response.json(
                { error: "Organization not found" },
                { status: 404 }
            );
        }

        const createProduct = await prisma.product.create({
            data: {
                name,
                price: Number(price),
                organizationId,
                sku,
                description
            }
        });

        return Response.json(
            { message: "Product created successfully", product: createProduct },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            { error: "Something went wrong", details: error.message },
            { status: 500 }
        );
    }
}