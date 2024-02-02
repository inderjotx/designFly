
import React from 'react'
import Image from 'next/image'
import { prisma } from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import Userimage from '@/components/ui/Userimage'
import { BookMarked, Heart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { HeartIconLink } from '@/components/ui/HeartIconLink'

async function page({ params }: { params: { designId: string } }) {

    const design = await prisma.design.findUnique({
        where: {
            id: params.designId
        }
        ,
        include: {
            Heart: true,
            user: true
        }

    })


    if (!design) {
        redirect('/')
    }


    return (
        <div className='flex  items-center mx-4 mt-8 px-8 py-4  flex-col gap-4 '>
            <div className='w-full lg:w-3/4 flex justify-between'>
                <div className='flex items-center justify-start gap-4'>
                    <Userimage name={design.user.name} url={design.user.image as string} className='h-12 w-12' />
                    <h2 className='text-sm'>{design.user.name}</h2>
                </div>
                <div className='flex gap-6'>
                    <div className='rounded-full border border-foreground/10 hover:bg-foreground/5 w-12 h-12 flex justify-center items-center'>
                        <BookMarked />
                    </div>
                    <div className='rounded-full border border-foreground/10 hover:bg-foreground/5 w-12 h-12 flex justify-center items-center'>
                        <HeartIconLink designId={params.designId} />
                    </div>
                </div>

            </div>
            <Separator />
            <div className='w-full lg:w-3/4'>
                <h3 className='text-lg text-center '>
                    {design.title}
                </h3>
            </div>
            <div className='rounded-lg md:w-full lg:w-3/4'>
                <Image src={design?.imageKey} unoptimized width={100} height={100} alt='dashboard image'
                    className='w-full h-full object-contain rounded-md' />
            </div>
            <div className='w-full lg:w-3/4 mt-10 text-center'>
                <h4 >
                    {design.description}
                </h4>
            </div>
        </div>
    )
}

export default page