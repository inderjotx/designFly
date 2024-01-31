import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Userimage({ name, url, className }: { name: string, url?: string, className?: string }) {


    if (url) {

        return <Image width={1} height={1} src={url} priority unoptimized={true} alt='user-image' className={cn('object-contain border border-muted-foreground cursor-pointer rounded-full h-10 w-10', className)} ></Image>
    }


    else {
        return <div className={cn('flex justify-center items-center h-10 w-10 rounded-full bg-foreground text-background cursor-pointer', className)}>{name.slice(0, 1).toUpperCase()}</div>
    }

}

export default Userimage

