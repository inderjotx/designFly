'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

export default function FollowButton({ followerId, followingId, intension }:
    { followerId: string, followingId: string, intension: string }) {

    const router = useRouter()
    const session = useSession()

    async function handleFollow() {


        if (!session.data?.user) {
            router.push('/signIn')
        }

        try {


            const response = axios.get('http://localhost:3000/api/follow', {
                params: {
                    followerId,
                    followingId,
                    intension
                }
            })

            toast.promise(response, {
                loading: `${intension}ing ...`,
                success: `${intension}ed`,
                error: `Error ${intension}`
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
