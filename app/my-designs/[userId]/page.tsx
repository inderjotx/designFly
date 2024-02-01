import { prisma } from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import React from 'react'
import { DesignGridUser } from '@/components/DesignGridUser';

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


    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

    if (!params.userId) {
        redirect('/register')
    }




    return (
        <div className='flex justify-center '>

            <DesignGridUser userId={params.userId} />
        </div>
    )
}

export default page