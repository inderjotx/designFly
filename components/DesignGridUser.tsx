import { prisma } from '@/lib/prismadb'
import React from 'react'
import { DesignCard } from './DesignCard'
import Link from 'next/link'
export async function DesignGridUser({ userId }: { userId: string }) {

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            Design: {
                include: {
                    Heart: true
                }
            }
        }
    })

    const designs = user?.Design

    if (!designs) {
        return <div>No Designs</div>
    }

    else {
        return (
            <div className='mt-8  grid  grid-cols-2 lg:grid-cols-4 gap-12 center'>

                {
                    designs.map((design, index) => (
                        <div className='' key={index}>
                            <Link href={new URL(`designs/${design.id}`, baseUrl)}>
                                <DesignCard design={design} creator={user} hearts={design.Heart} />
                            </Link>
                        </div>
                    ))
                }
            </div>
        )
    }

}
