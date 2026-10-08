import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/db/prisma";

export async function POST(request) {
    try {
        const body = await request.json()

        const {userId , organizationName} = body

        const organization = await prisma.organization.create({
            data: {
                name : organizationName
            }
        })

        const membership  = await prisma.organizationMember.create({
            data: {
                userId: userId,
                organizationId: organization.id,
                role: "Admin"
            }
        })
        return Response.json(
            {message: "succufully created" , organization , membership},
            {status: 200}
        )
    } catch (error) {
        return Response.json(
            {error: "sometjing went wrong", error},
            {status: 400}
        )
    }
}