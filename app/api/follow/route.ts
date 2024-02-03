import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {


    const url = new URL(req.url)


    // A -> B , follwoers B ++
    const followerId = url.searchParams.get("followerId")
    const followingId = url.searchParams.get("followingId")
    const intension = url.searchParams.get("intension")


    if (!followerId || !followingId || !intension) {
        return NextResponse.json({ message: "some has to be done  " }, { status: 400 })
    }

    if (followerId == followingId) {
        return NextResponse.json({ message: "You can't follow yourself" }, { status: 400 })
    }

    if (intension == "follow") {

        try {

            const follow = await prisma.followers.create({
                data: {
                    followerId,
                    followingId
                }
            })
        }

        catch (error) {
            console.log('[FOLLOW ERROR] : 39', error)
            return NextResponse.json({ message: "something happened" }, { status: 400 })
        }
        return NextResponse.json({ message: "Followed Succesffully" }, { status: 200 })
    }


    else {
        const follow = await prisma.followers.deleteMany({
            where: {
                followerId,
                followingId
            }
        })

        return NextResponse.json({ message: "something happened" }, { status: 400 })

    }


}