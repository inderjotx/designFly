'use client'

import axios from 'axios'
import { Bookmark } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

export function BookmarkIcon({ designId }: { designId: string }) {

    const session = useSession()

    async function handleLike() {
        try {
            const response = await axios.get('/api/bookmark', {
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
        <Bookmark className='h-6 w-6 cursor-pointer ' onClick={handleLike} />

    )
}
