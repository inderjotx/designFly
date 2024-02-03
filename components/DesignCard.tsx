import { Design, Heart, User } from '@prisma/client'
import Userimage from './ui/Userimage'
import Image from 'next/image'
import { HeartIconLink } from './ui/HeartIconLink'
import { FakeLink } from './ui/FakeLink'
import { BookmarkIcon } from './ui/BookmarkLink'

export function DesignCard({ design, creator, hearts }: { design: Design, creator: User, hearts?: Heart[] }) {

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

    return (
        <div className='flex h-72 w-72 flex-col gap-4 rounded-md  '>

            <FakeLink className='cursor-pointer' url={`${baseUrl}/designs/${design.id}`} >
                <div className='h-64 overflow-hidden rounded-md relative'>
                    <Image width={1} height={1} unoptimized src={design.imageKey} className='h-full w-full rounded-md object-cover' alt="design image" />
                </div>
            </FakeLink>
            <div className='flex items-center justify-between px-2'>
                {/* <div className='flex items-center space-x-3'> */}
                <FakeLink className='flex items-center space-x-3 cursor-pointer' url={`${baseUrl}/profile/${creator.id}`} >
                    <Userimage name={creator.name} className='h-8 w-8' url={creator.image || ""} />
                    <h3 className='text-foreground capitalize text-[14px]'>{creator.name}</h3>
                </FakeLink>

                <div className='flex  items-center gap-2 justify-between '>
                    <BookmarkIcon designId={design.id} />
                    <HeartIconLink designId={design.id} />
                    <span className='text-[12px]'>{hearts?.length || 3}</span>
                </div>
            </div>
        </div>

    )
}


