import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

// motive


// design id 
// userid 



export async function GET(req: NextRequest) {

    const url = new URL(req.url)

    const userId = url.searchParams.get("userId")
    const designId = url.searchParams.get("designId")

    if (!userId || !designId) {
        return NextResponse.json({ message: "No userId and desingId " }, { status: 400 })

    }

    const isAleady = await prisma.heart.findMany({
        where: {
            userId: userId,
            designId: designId,

        }
    })


    if (!isAleady) {

        const data = await prisma.heart.create({

            data: {
                userId: userId,
                designId: designId,

            }
        })

        if (!data) {
            console.log("[INVALID USERID or DESINGID ]")
            return NextResponse.json({ message: "No userId and desingId " }, { status: 400 })
        }


        return NextResponse.json(data, { status: 400 })
    }

    else {

        return NextResponse.json({ message: "Can like only once " }, { status: 400 })
    }

} 