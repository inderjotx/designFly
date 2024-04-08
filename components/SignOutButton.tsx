'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

export function SignOutButton() {
    return (
        <div className='cursor-pointer  w-full h-full rounded-sm' onClick={() => signOut({ redirect: true })}>Log Out</div>
    )
}
