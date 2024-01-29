import { prisma } from "@/lib/prismadb"

interface updateUserProps {
    userId: string,
    name: string,
    image: string,
    email: string,
}




export async function POST(req: Request) {

    const data: updateUserProps = await req.json()

    console.log("data inside the update user profile ")
    console.log(data)

    if (!data || !data.userId || !data.name || !data.email) {
        console.log("invalid requests ")
        return Response.json({ message: "Invalid request mising required parameters " }, { status: 400 })
    }

    try {

        // currently only credentials provider
        const isUser = await prisma.user.findFirst({
            where: {
                id: data.userId,
                email: data.email,
                provider: "credentials"
            }
        })

        if (!isUser) {
            return Response.json({ message: "Invalid user id " }, { status: 400 })
        }


        const update = await prisma.user.update({
            where: {
                id: isUser.id
            },
            data: {
                email: data.email,
                name: data.name,
                image: data.image,
            }
        })

        return Response.json({ message: "User data updated succesfully " }, { status: 200 })

    }
    catch (error) {
        console.log(error)
        return Response.json({ error: error }, { status: 400 })
    }
}