'use client'

import axios from 'axios'
import { HeartIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export function HeartIconLink({ designId, color }: { designId: string, color: string }) {

    const session = useSession()
    const router = useRouter()

    async function handleLike() {
        try {
            const response = await axios.get('/api/like', {
                params: {
                    userId: session.data?.user.id,
                    designId: designId
                }
            })
            router.refresh()
        }
        catch (error) {

        }
    }


    return (
        <HeartIcon fill={color} className='h-6 w-6 cursor-pointer transition-all' onClick={handleLike} />
    )
}
