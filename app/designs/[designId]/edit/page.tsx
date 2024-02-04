import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CreateDesign } from '@/components/forms/CreateDesignForm'
import { prisma } from '@/lib/prismadb'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Page({ params }: { params: { designId: string } }) {

    const session = await getServerSession(authOptions)

    const design = await prisma.design.findUnique({
        where: {
            id: params.designId,
            userId: session?.user.id
        }
    })

    if (!design) {
        return <>
            Invalid
        </>
    }

    return (
        <div className='w-full h-full'><CreateDesign initialData={design} ></CreateDesign> </div>
    )
}
