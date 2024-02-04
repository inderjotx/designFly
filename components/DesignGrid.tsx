import { prisma } from '@/lib/prismadb'
import React from 'react'
import { DesignCard } from './DesignCard'

export async function DesignGrid() {

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    const designs = await prisma.design.findMany({
        take: 10,
        orderBy: {
            id: 'asc'
        },
        include: {
            user: true,
            Heart: true,
            BookMark: true
        }
    })



    return (
        <div className='mt-8  grid  grid-cols-2 lg:grid-cols-4 gap-12 center'>

            {
                designs.map((design, index) => (
                    <div className='' key={index}>
                        <DesignCard bookmarks={design.BookMark} design={design} creator={design.user} hearts={design.Heart} />
                    </div>
                ))
            }
        </div>
    )
}
