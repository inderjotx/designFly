'use client'

import axios from 'axios'
import { HeartIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

export function HeartIconLink({ designId }: { designId: string }) {

    const session = useSession()

    async function handleLike() {
        try {
            const response = await axios.get('/api/like', {
                params: {
                    userId: session.data?.user.id,
                    designId: designId
                }
            })
        }
        catch (error) {

        }
    }


    return (
        <HeartIcon className='h-6 w-6' onClick={handleLike} />
    )
}
