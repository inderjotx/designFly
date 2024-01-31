import { DesignCard } from '@/components/DesignCard';
import { prisma } from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import React from 'react'

async function getDesigns(userId: string) {
    const designs = prisma.user.findUnique({
        where: {
            id: userId
        }
        ,
        include: {
            Design: true
        }
    })

    return designs;


}

async function page({ params }: { params: { userId: string } }) {


    if (!params.userId) {
        redirect('/register')
    }

    const designs = await getDesigns(params.userId)



    return (
        <div className='h-full w-full mt-10 px-6  grid gap-4 grid-cols-4'>

            {
                designs?.Design.map((design, index) => (
                    <div className='md:col-span-2 col-span-1 h-1/2' key={design.id}>
                        <DesignCard creator={designs} design={design} key={index} />
                    </div>
                ))
            }

        </div>
    )
}

export default page