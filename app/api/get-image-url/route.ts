import { prisma } from "@/lib/prismadb";
import { getPresignedUrl } from "@/lib/storeInS3";

interface generateURLProps {
    userId: string,
    imageName: string
}


const BUCKET_NAME = ""

export async function POST(req: Request) {
    const data: generateURLProps = await req.json()

    // check if user is valid 

    if (!data || !data.userId || !data.imageName) {
        return Response.json({ message: "You have to send the userid and image name along with the request " }, { status: 400 })
    }



    const isUser = await prisma.user.findFirst({
        where: {
            id: data.userId
        }
    })


    if (!isUser) {
        return Response.json({ message: "Invalid userid " }, { status: 400 })
    }


    // just form making image url unique 
    const currentDate = new Date();
    const secondsSinceEpoch = Math.floor(currentDate.getTime() / 1000);


    const imageKey = `${isUser.id}/${secondsSinceEpoch}/${data.imageName}`

    try {

        const url = await getPresignedUrl(imageKey)

        return Response.json({ imageKey: imageKey, url: url }, { status: 200 })
    }

    catch (error) {
        return Response.json({ message: "error occured while creatting the uslr " }, { status: 500 })
    }

}