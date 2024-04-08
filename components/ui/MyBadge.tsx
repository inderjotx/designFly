'use client'
import React from 'react'
import { Badge } from './badge'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Compass } from 'lucide-react'

export function MyBadge({ name }: { name: string }) {

    const path = usePathname().split('/')
    const active = path[path.length - 1] === name

    if (name === 'new') {
        return (
            <Badge className={cn('p-2 transition-all rounded-2xl  bg-foreground/5 font-normal pr-2 cursor-pointer inline-flex gap-1 border hover:border-foreground  active:border-foreground   hover:dark:border-white', active && "border-foreground dark:border-white")} variant={"outline"} ><Compass fill={active ? "black" : "white"} color={active ? "white" : "black"} className='w-4 h-4' /><span> NEW DESIGNS</span> </Badge>

        )
    }

    return (
        <Badge className={cn('p-2 rounded-2xl  transition-all border bg-foreground/5 font-normal px-4 hover:border-foreground cursor-pointer active:border-foreground hover:dark:border-white ', active && "border-foreground dark:border-white")} variant={"outline"} >{name.toUpperCase()}</Badge>
    )
}
