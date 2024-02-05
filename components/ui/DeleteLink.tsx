'use client'

import axios from 'axios'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export function DeleteIcon({ designId, color }: { designId: string, color: string }) {

    const session = useSession()
    const router = useRouter()

    async function handleDelete() {
        try {
            const response = await axios.get('/api/delete-design', {
                params: {
                    userId: session.data?.user.id,
                    designId: designId
                }
            })

            router.push('/dashboard')
            router.refresh()
        }
        catch (error) {

        }
    }


    return (
        <X fill={color} className='h-6 w-6 cursor-pointer transition-all ' onClick={handleDelete} />

    )
}
