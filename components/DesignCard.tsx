import { Design, Heart, User } from '@prisma/client'
import Userimage from './ui/Userimage'
import { Heart as HeartIcon } from 'lucide-react'
import Image from 'next/image'


export function DesignCard({ design, creator, hearts }: { design: Design, creator: User, hearts?: Heart[] }) {



    return (
        <div className='flex h-72 w-72 flex-col gap-4 rounded-md  '>
            <div className='h-64 overflow-hidden rounded-md relative'>
                <Image width={1} height={1} unoptimized src={design.imageKey} className='h-full w-full rounded-md object-cover' alt="design image" />
                <div className='z-10 top-0 left-0 w-full h-full transition-all group absolute hover:bg-gradient-to-t rounded-md from-black/50  '>
                    <HeartIcon color='white' className='h-6 w-6 absolute bottom-0 right-0 hidden group-hover:block ' />
                </div>
            </div>
            <div className='flex items-center justify-between px-2'>
                <div className='flex items-center space-x-3'>
                    <Userimage name={creator.name} className='h-8 w-8' url={creator.image || ""} />
                    <h3 className='text-foreground capitalize text-[14px]'>{creator.name}</h3>
                </div>

                <div className='flex  items-center gap-2 justify-between '>
                    <HeartIcon className='h-6 w-6' />
                    <span className='text-[12px]'>{hearts?.length || 3}</span>
                </div>
            </div>
        </div>

    )
}