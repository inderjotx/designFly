"use client"

import { signIn, useSession } from 'next-auth/react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Link from 'next/link';
import React, { useState } from 'react'

import { ThemeToggle } from './ThemeToggle';
import { Profile } from './Profile';


function Navbar() {

    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState<boolean>(false)

    const session = useSession()
    useMotionValueEvent(scrollY, "change", (curentVal) => {
        const prevValue = scrollY.getPrevious() as number
        if (curentVal > prevValue && curentVal > 150) {
            console.log("show")
            setHidden(true)
        }
        else {
            setHidden(false)
        }
    })
    return (
        <motion.div animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            variants={{
                hidden: {
                    y: "-100%"
                },
                visible: {
                    y: 0
                }
            }}
            className='z-10 w-full flex items-center p-4  backdrop-blur-md h-20 sticky top-0'>
            <div><Link href={"/"} className='text-xl font-medium' >DesignFly</Link></div>

            <div className='ml-auto flex space-x-4' >
                {session && session.data && session.data.user ?
                    <div className='flex items-center space-x-4'>
                        {/* <div className='cursor-pointer font-medium' onClick={() => signOut()} >Sign Out</div> */}
                        <Profile />
                    </div>
                    :
                    <div className='flex items-center space-x-4'>
                        <div className='cursor-pointer' onClick={() => signIn()}>Sign In</div>
                        <Link className='bg-secondary-foreground text-primary-foreground p-2 rounded-full px-4' href={"/register"}> Register</Link>
                    </div>

                }
                <div ><ThemeToggle /></div>
            </div>
        </motion.div >
    )
}

export default Navbar