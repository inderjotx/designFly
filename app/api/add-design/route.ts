import { NextRequest, NextResponse } from "next/server";
import { StoreInS3 } from "@/lib/storeInS3"
import { prisma } from "@/lib/prismadb";
import { User } from "@prisma/client";


interface designProps {
    userId: string,
    title: string,
    description: string,
    image: File
}




export async function POST(req: Request) {


    const design: designProps = await req.json()



    console.log(design)

    if (!design || (isValidDesign(design))) {
        return Response.json("Design is required ", { status: 400 })
    }


    try {
        const imageName = `${design.userId}${design.image.name}`
        const response = await StoreInS3(imageName, design.image)


        console.log("respones from s3 after sending ")
        console.log(response)

        if (!response) {
            return Response.json("error occured ", { status: 400 })
        }


        const responseFromPrism = await prisma.design.create({
            data: {
                userId: design.userId,
                description: design.description,
                title: design.title,
                imageKey: imageName

            }
        })

        console.log("responseFromPrism")
        console.log(responseFromPrism)

        return Response.json("user created succesfully", { status: 200 })

    }

    catch (err) {

        if (err instanceof Error) {
            console.log(err.message)
            return Response.json("Unkonw error occured ", { status: 400 })
        }

        else {
            console.log('unexpected error occurend ')
            return Response.json("Unkonw error occured ", { status: 400 })
        }
    }









}



function isValidDesign(obj: any): boolean {
    return (
        typeof obj.userId === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.description === 'string' &&
        obj.image instanceof File
    );
}