import { User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Userimage({ name, url }: { name: string, url?: string }) {


    if (url) {

        return <Image src={url} alt='user-image' className='object-contain  cursor-pointer rounded-full h-10 w-10' ></Image>
    }


    else {
        return <div className='flex justify-center items-center h-10 w-10 rounded-full bg-foreground text-background cursor-pointer'>{name.slice(0, 1).toUpperCase()}</div>
    }


}

export default Userimage

