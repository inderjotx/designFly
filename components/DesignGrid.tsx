import { prisma } from '@/lib/prismadb'
import React from 'react'
import { DesignCard } from './DesignCard'
import { BookMark, Design, Heart, User } from '@prisma/client';

interface MyDesigns extends Design {
    BookMark: BookMark[],
    user: User,
    Heart: Heart[],
}

export async function DesignGrid({ tag }: { tag?: string }) {




    if (!tag || tag == "new") {
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
            <div className='mt-8 mb-20 grid grid-cols-1   md:grid-cols-2 lg:grid-cols-4 gap-12 center'>

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
    else {
        const data = await prisma.postTag.findMany({
            where: {
                tagName: tag
            }
            ,
            include: {
                Post: {
                    include: {
                        user: true,
                        Heart: true,
                        BookMark: true
                    }
                }
            }
        })

        return (
            <div className='mt-8  mb-20  grid grid-cols-1   md:grid-cols-2 lg:grid-cols-4 gap-12 center'>

                {
                    data.map(({ Post }, index) => (
                        <div className='' key={index}>
                            <DesignCard bookmarks={Post.BookMark} design={Post} creator={Post.user} hearts={Post.Heart} />
                        </div>
                    ))
                }
            </div>
        )
    }



}
