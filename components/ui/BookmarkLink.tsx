'use client'

import { cn } from '@/lib/utils'
import axios from 'axios'
import { Bookmark } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

import React from 'react'
import toast from 'react-hot-toast'

export function BookmarkIcon({ designId, color, hasBookmarked }: { designId: string, color: string, hasBookmarked: boolean }) {

    const session = useSession()
    const router = useRouter()
    const message = hasBookmarked ? "Remov" : "Add"


    async function handleLike() {

        if (!session.data) {
            router.push('/signIn')
        }

        try {
            const response = axios.get('/api/bookmark', {
                params: {
                    userId: session.data?.user.id,
                    designId: designId
                }
            })

            toast.promise(response, {
                loading: `${message}ing Bookmark`,
                success: `${message}ed Bookmark`,
                error: `Error ${message}ing Bookmark`
            })
            router.refresh()
        }
        catch (error) {

        }
    }


    return (
        <Bookmark fill={color} color="black" className='h-6 w-6 cursor-pointer transition-all  ' onClick={handleLike} />

    )
}
