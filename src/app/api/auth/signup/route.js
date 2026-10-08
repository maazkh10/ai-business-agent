import prisma from "@/lib/db/prisma";


export  async function POST(request) {
    
    try {
        const body = await request.json()

        const {name , email} = body

        if (!email) {
            return Response.json({
                error: "Email  is required"
            }  ,{status: 400})
        }

        // check for user exist 

        const userExis = await prisma.user.findUnique({
            where: {email}
        })

        if (userExis) {
            return Response.json(
                {error: "User ALredy exist"},
                {status:  400}
            )
        }

        // create tthe user 

        const newUser = await prisma.user.create({
            data: {name , email}
        })

        return Response.json(
            {message: "User created succylfft " , user: newUser},
            {status: 2000}
        )
    } catch (error) {
        return Response.json(
            {error: "somthing error happend"},
            {status: 5000}
        )
    }
}