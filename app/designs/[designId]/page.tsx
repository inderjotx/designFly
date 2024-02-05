
import React from 'react'
import Image from 'next/image'
import { prisma } from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import Userimage from '@/components/ui/Userimage'
import { Separator } from '@/components/ui/separator'
import { HeartIconLink } from '@/components/ui/HeartIconLink'
import { FakeLink } from '@/components/ui/FakeLink'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { BookmarkIcon } from '@/components/ui/BookmarkLink'
import { Pencil, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { DeleteIcon } from '@/components/ui/DeleteLink'

async function page({ params }: { params: { designId: string } }) {


    const session = await getServerSession(authOptions)




    const design = await prisma.design.findUnique({
        where: {
            id: params.designId
        }
        ,
        include: {
            Heart: true,
            user: true,
            BookMark: true

        }

    })


    if (!design) {
        redirect('/')
    }

    const URL = process.env.NEXT_PUBLIC_SITE_URL

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

    const hasLiked = design.Heart?.find(({ userId }) => userId == session?.user.id) ? true : false
    const hasBookmarked = design.BookMark?.find(({ userId }) => userId == session?.user.id) ? true : false
    const colorHeart = hasLiked ? "#FF8080" : "white"
    const colorBookmark = hasBookmarked ? "#F8E559" : "white"



    return (
        <div className='flex  items-center mx-4 mt-8 px-8 py-4  flex-col gap-4 '>
            <div className='w-full lg:w-3/4 flex justify-between'>
                <FakeLink className='flex items-center justify-start gap-4' url={`${URL}/profile/${design.user.id}`} >
                    <Userimage name={design.user.name} url={design.user.image as string} className='h-12 w-12' />
                    <h2 className='text-sm cursor-pointer'>{design.user.name}</h2>
                </FakeLink>
                <div className={cn('flex gap-6',)}>
                    <div className={cn("rounded-full border border-foreground/10 hover:bg-foreground/5 w-12 h-12 flex justify-center items-center ", design.user.id === session?.user.id ? "flex" : "hidden")}>
                        <DeleteIcon color={colorBookmark} designId={design.id} />
                    </div>
                    <div className={cn("rounded-full border border-foreground/10 hover:bg-foreground/5 w-12 h-12 flex justify-center items-center ", design.user.id === session?.user.id ? "flex" : "hidden")}>
                        <Link href={`/designs/${design.id}/edit`}>
                            <Pencil></Pencil>
                        </Link>
                    </div>
                    <div className='rounded-full border border-foreground/10 hover:bg-foreground/5 w-12 h-12 flex justify-center items-center'>
                        <BookmarkIcon color={colorBookmark} designId={design.id} />
                    </div>
                    <div className='rounded-full border border-foreground/10 hover:bg-foreground/5 w-12 h-12 flex justify-center items-center'>
                        <HeartIconLink color={colorHeart} designId={design.id} />
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