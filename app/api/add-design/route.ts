import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { User } from "@prisma/client";


interface designProps {
    userId: string,
    title: string,
    description: string,
    imageKey: string,
    id: string
}



export async function POST(req: Request) {


    const design: designProps = await req.json()



    console.log("desgin data received from the user ")
    console.log(design)

    if (!design || !design.description || !design.imageKey || !design.title || !design.userId) {
        return Response.json("Design is required ", { status: 400 })
    }


    try {

        const responseFromPrism = await prisma.design.create({
            data: {
                ...design
            }
        })

        console.log("responseFromPrism")
        console.log(responseFromPrism)

        return Response.json("Desing create succesfully", { status: 200 })

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


export async function PATCH(req: NextRequest) {


    const design: designProps = await req.json()



    if (!design || !design.id || !design.description || !design.imageKey || !design.title || !design.userId) {
        return Response.json("Design is required ", { status: 400 })
    }


    try {

        const responseFromPrism = await prisma.design.update({
            where: {
                id: design.id
            },

            data: {
                ...design
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
