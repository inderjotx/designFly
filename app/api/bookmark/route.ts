import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    const url = new URL(req.url)

    const userId = url.searchParams.get("userId")
    const designId = url.searchParams.get("designId")

    if (!userId || !designId) {
        return NextResponse.json({ message: "No userId and desingId " }, { status: 400 })

    }

    const isAleady = await prisma.bookMark.findMany({
        where: {
            userId: userId,
            designId: designId,

        }
    })



    if (isAleady.length == 0) {

        const data = await prisma.bookMark.create({

            data: {
                userId: userId,
                designId: designId,

            }
        })

        if (!data) {
            console.log("[INVALID USERID or DESINGID ]")
            return NextResponse.json({ message: "No userId and desingId " }, { status: 400 })
        }


        return NextResponse.json(data, { status: 200 })
    }

    else {

        const remove = await prisma.bookMark.deleteMany({
            where: {
                userId: userId,
                designId: designId
            }
        })

        return NextResponse.json({ message: "Remove Like" }, { status: 200 })
    }

} 