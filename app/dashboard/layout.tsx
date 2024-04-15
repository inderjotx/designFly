import { Button } from '@/components/ui/button'
import Link from "next/link"

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/prismadb'
import { MyBadge } from '@/components/ui/MyBadge'

// <div className='w-11/12 :w-10/12 mt-10 h-10 flex justify-between items-center  '></div>
export default async function Layout({ children }: { children: React.ReactNode }) {


    const tags = await prisma.tag.findMany()

    return (
        <div className='flex mx-3 flex-col items-center gap-4'>

            <div className=' flex w-11/12 justify-between items-center gap-4 '>
                {/* { two new / our designs } */}
                <div className='space-x-3 relative  flex overflow-x-scroll hidescrollBar   items-center'>
                    <Link href={'/dashboard/new'}>
                        <MyBadge name={'new'} />
                    </Link>

                    {
                        tags.map((tag) => (
                            <Link key={tag.name} href={`/dashboard/${tag.name}`} >
                                <MyBadge name={tag.name} />
                            </Link>
                        ))
                    }

                </div>



                {/* { Add Design } */}
                <div className='mb-1'>
                    <Button variant="default" className='rounded-full px-8' asChild >
                        <Link href={"/designs/create"}>
                            Add Design</Link>
                    </Button>
                </div>

            </div>
            <Separator className='w-11/12 lg:w-10/12' />
            <div className='w-11/12 lg:w-10/12 flex justify-center'>
                {children}
            </div>

        </div>
    )
}
