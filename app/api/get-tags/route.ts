import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function GET() {

    const tags = await prisma.tag.findMany()
    console.log(tags)

    return NextResponse.json(tags, { status: 200 })

}