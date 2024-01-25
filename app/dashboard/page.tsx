import { Button } from '@/components/ui/button'
import Link from "next/link"
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import React from 'react'

async function page() {

    const session = await getServerSession({})

    if (!session) {
        redirect('/register')
    }

    return (
        <div className='w-full h-full flex justify-center'>

            <div className='w-11/12 lg:w-10/12 mt-10 h-10 flex justify-between items-center  '>
                {/* { two new / our designs } */}
                <div className='space-x-3'>
                    <Link href={'/'} className='text-sm' >New Design</Link>
                    <Link href={'/'} className='text-sm' >My Design</Link>
                </div>

                {/* { Add Design } */}
                <div className=''>
                    <Button variant="default" className='rounded-full px-8' >
                        Add Design</Button>
                </div>
            </div>

        </div>
    )
}

export default page