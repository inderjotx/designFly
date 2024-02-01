import { Button } from '@/components/ui/button'
import Link from "next/link"
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import React from 'react'
// import DesignsComponent from '@/components/sections/DesignsComponent'
import { Separator } from '@/components/ui/separator'
import { DesignGrid } from '@/components/DesignGrid'

async function page() {

    const session = await getServerSession({})

    if (!session) {
        redirect('/register')
    }



    return (
        <div className='flex mx-3 flex-col items-center gap-4'>

            <div className='w-11/12 lg:w-10/12 mt-10 h-10 flex justify-between items-center  '>
                {/* { two new / our designs } */}
                <div className='space-x-3'>
                    <Link href={'/'} className='bg-' >New Design</Link>
                </div>

                {/* { Add Design } */}
                <div className=''>
                    <Button variant="default" className='rounded-full px-8' asChild >
                        <Link href={"/dashboard/create"}>
                            Add Design</Link>
                    </Button>
                </div>

            </div>
            <Separator className='w-11/12 lg:w-10/12' />
            <div className='w-11/12 lg:w-10/12 flex justify-center'>
                <DesignGrid />
            </div>
        </div>
    )
}

export default page