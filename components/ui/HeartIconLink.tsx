'use client'

import axios from 'axios'
import { HeartIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export function HeartIconLink({ designId, color, hasLiked }: { designId: string, color: string, hasLiked: boolean }) {

    const session = useSession()
    const router = useRouter()
    const message = hasLiked ? "Remov" : "Add"

    async function handleLike() {

        if (!session.data) {
            router.push('/signIn')
        }
        try {
            const response = axios.get('/api/like', {
                params: {
                    userId: session.data?.user.id,
                    designId: designId
                }
            })
            toast.promise(response, {
                loading: `${message}ing Like`,
                success: `${message}ed Like`,
                error: `Error ${message}ing Bookmark`
            })
            router.refresh()
        }
        catch (error) {

        }
    }


    return (
        <HeartIcon color="black" fill={color} className='h-6 w-6 cursor-pointer transition-all' onClick={handleLike} />
    )
}
