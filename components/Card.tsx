import React from 'react'
import Image from "next/image"


export function ImageCard({ image }: { image: string }) {
    return (
        <div className='flex aspect-square rounded-md '>
            <Image width={1} height={1} unoptimized src={image} className='h-full w-full rounded-sm object-cover' alt="design image" />
        </div>
    )
}
