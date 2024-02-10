
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
import { Badge } from '@/components/ui/badge'






export async function generateStaticParams() {
    const design = await prisma.design.findMany()
    return design.map((design) => { designId: design.id })
}






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
            BookMark: true,
            PostTag: true
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
        <div className='flex h-[200vh] items-center mx-4 mt-8 px-8 py-4  flex-col gap-4 '>
            <div className='flex flex-col items-center w-full lg:w-3/4 gap-6 '>

                <div className='w-full flex justify-between'>
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
                            <BookmarkIcon color={colorBookmark} hasBookmarked={hasBookmarked} designId={design.id} />
                        </div>
                        <div className='rounded-full border border-foreground/10 hover:bg-foreground/5 w-12 h-12 flex justify-center items-center'>
                            <HeartIconLink color={colorHeart} hasLiked={hasLiked} designId={design.id} />
                        </div>
                    </div>

                </div>
                <Separator />
                <div className='w-full'>
                    <h3 className='text-lg text-center '>
                        {design.title}
                    </h3>
                </div>
                <div className='rounded-lg w-full'>
                    <Image src={design?.imageKey} unoptimized width={100} height={100} alt='dashboard image'
                        className='w-full h-full object-contain rounded-md' />
                </div>
                <div className='w-full' >
                    <div className='flex justify-start gap-2' >
                        {
                            design.PostTag.map((tag, index) => (
                                <Badge key={tag.tagName} className='p-2 rounded-lg font-normal' variant={"outline"} >{tag.tagName}</Badge>
                            ))
                        }
                    </div>
                </div>
                <div className='w-full mt-10 text-center'>
                    <h4 >
                        {design.description}
                    </h4>
                </div>
            </div>

        </div>
    )
}

export default page