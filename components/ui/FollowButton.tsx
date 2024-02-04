'use client'

import axios from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function FollowButton({ followerId, followingId, intension }:
    { followerId: string, followingId: string, intension: string }) {

    const router = useRouter()

    async function handleFollow() {
        try {


            const response = await axios.get('http://localhost:3000/api/follow', {
                params: {
                    followerId,
                    followingId,
                    intension
                }
            })

            console.log('repsonse from follow')
            console.log(response)

            router.refresh()
        }

        catch (error) {
            console.log('[ERROR]', error)

        }
    }


    return (
        <>
            {/* <Plus onClick={handleFollow} className=" flex justify-center items-center text-muted-foreground h-6 w-6 border rounded-full hover:bg-foreground/5 " /> */}
            <span onClick={handleFollow} className='mt-2 inline  cursor-pointer bg-green-500 hover:bg-green-600 text-white p-1 px-2 text-[10px] rounded-2xl' >{intension}</span>
        </>
    )
}
