import prisma from "@/lib/db/prisma";

export async function GET() {
    try {
        const User = await prisma.user.findMany();

        return Response.json(User)
    } catch (error) {
        console.error(error)
    
        return Response.json(
            {error: "faild. to fetch"},
            {status: 500}
        )
    }

}