
import prisma from "@/lib/db/prisma";

export async function POST(request) {
    try {
        const body =  await request.json()
    
        const {name , email , phone , organizationId} = body
    
        if (!email || !name || !organizationId) {
            return Response.json(
                {error : "all fields are required"},
                {status: 400}
            )
        }
    
        // chcek fot organizationId in db maybe 
        const organizationIdcehck = await prisma.organization.findUnique({
            where :{id: organizationId}
        })
        
        if (!organizationIdcehck) {
            return Response.json(
                {error: "organization not matched"},
                {status: 400}
            )
        }

        const createcust = await prisma.customer.create(
          {  data : {
            name , email , phone , organizationId
          }}
        )

        return Response.json(
            {message: "Customer created succefully" , customer : createcust},
            {status: 201}
        )
   } catch (error) {
    return Response.json(
        { error: "something error happened", details: error.message },
        { status: 500 } // Correct 3-digit HTTP status code
    );
}
}

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const organizationId = searchParams.get("organizationId")

    if (!organizationId) {
        return Response.json(
            {error : "missing organization id get one"},
            {status : 400}
        )
    }
    // fetch from db 
    const getFromit = await prisma.customer.findMany({where: {organizationId}})

    return Response.json(
        {message: "get the cusomer" , customer: getFromit},
        {status: 200}
    )
}
