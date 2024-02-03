'use client'

import axios from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function FollowButton({ followerId, followingId, intension }:
    { followerId: string, followingId: string, intension: string }) {

    const router = useRouter()

    async function handleFollow() {
        await axios.get('http://localhost:3000/api/follow', {
            params: {
                followerId,
                followingId,
                intension
            }
        })

        router.refresh()
    }


    return (

        <Plus onClick={handleFollow} className=" flex justify-center items-center text-muted-foreground h-6 w-6 border rounded-full hover:bg-foreground/5 " />
    )
}
