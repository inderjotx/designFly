
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


    const design = await prisma.design.findUnique({
        where: {
            userId: userId,
            id: designId
        }
    })


    if (!design) {
        return NextResponse.json({ message: " No such design exist" }, { status: 400 })
    }

    else {

        const remove = await prisma.design.delete({
            where: {
                id: designId,
                userId: userId


            }
        })

        return NextResponse.json({ message: "Removed posts" }, { status: 200 })
    }

} 