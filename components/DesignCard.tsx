import { ImageCard } from './Card'
import { Design, Heart, User } from '@prisma/client'
import Userimage from './ui/Userimage'
import { prisma } from '@/lib/prismadb'
import { Heart as HeartIcon } from 'lucide-react'
import { cn } from '@/lib/utils'



export function DesignCard({ design, creator, hearts }: { design: Design, creator: User, hearts?: Heart[] }) {



    return (
        <div className='flex transition-colors  flex-col gap-4 rounded-md p-4 bg-foreground/5 hover:bg-foreground/10'>
            <ImageCard image={design.imageKey} />
            <div className='flex items-center justify-between '>
                <div className='flex items-center space-x-3'>
                    <Userimage name={creator.name} url={creator.image || ""} />
                    <h3 className='text-muted-foreground capitalize'>{creator.name}</h3>
                </div>

                <div className='flex  items-center gap-2 justify-between '>
                    <HeartIcon className='h-8 w-8' />
                    <span className='text-sm'>3</span>
                </div>
            </div>
        </div>

    )
}