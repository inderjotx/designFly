
import { Button } from '@/components/ui/button'
import React from 'react'
import { DesignGrid } from '@/components/DesignGrid'
import { prisma } from '@/lib/prismadb'

export async function generateStaticParams() {
    const tags = await prisma.tag.findMany()
    return tags.map((tag) => { tag: tag.name })
}

async function page({ params }: { params: { tag: string } }) {

    return (
        <DesignGrid tag={params.tag} />
    )
}

export default page