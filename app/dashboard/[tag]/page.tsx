
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import React from 'react'
import { DesignGrid } from '@/components/DesignGrid'
import { prisma } from '@/lib/prismadb'
import { redirect } from "next/navigation"

export async function generateStaticParams() {
    const tags = await prisma.tag.findMany()
    return tags.map((tag) => { tag: tag.name })
}

async function page({ params }: { params: { tag: string } }) {

    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    return (
        <DesignGrid tag={params.tag} />
    )
}

export default page