'use client'

import axios from 'axios'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export function DeleteIcon({ designId, color }: { designId: string, color: string }) {

    const session = useSession()
    const router = useRouter()

    async function handleDelete() {
        const response = axios.get('/api/delete-design', {
            params: {
                userId: session.data?.user.id,
                designId: designId
            }
        })

        toast.promise(response, {
            loading: `Deleting Design...`,
            success: `Successfully deleted Design`,
            error: `Error Deleting Design`
        })
            .then(
                () => {
                    router.push('/dashboard')
                    router.refresh()
                }
            )

            .catch((error) => {

                console.log(error)
            })

    }


    return (
        <X className='h-6 w-6 cursor-pointer transition-all ' onClick={handleDelete} />

    )
}
