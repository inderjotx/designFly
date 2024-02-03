import Image from 'next/image'

import { Button } from '../ui/button'
import HeroImage from "@/public/assets/HeroImage.png"
import { Github, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { Carousel } from '../ui/Carousel'

const message = "Over 1k people have become part of our community 🎉"

const message2 = "Discover, Share, Collaborate, and Elevate Your Creative Journey"

async function Hero() {

    const session = await getServerSession()
    const user = session?.user

    return (

        <div className='w-full min-h-full flex items-center mt-8  flex-col space-y-12'>

            <span className='text-muted-foreground bg-foreground/10 p-2 rounded-full px-10' >{message}</span>

            <div className='w-full flex items-center justify-center'>
                <h1 className='text-4xl font-bold lg:text-5xl text-center leading-normal lg:leading-relaxed  '>
                    Your Destination <br /> for Inspiring Visual Creavitity
                </h1>
            </div>

            <div className='text-muted-foreground'>
                {message2}
            </div>

            <div>
                <Button className='rounded-full px-20 py-6 text-lg'>
                    <Link href={user ? "/dashboard" : "/register"} >
                        Get Started
                    </Link>

                </Button>
            </div>

            <div>

            </div>
            <div className='w-full overflow-hidden'>
                <Carousel />
            </div>

            <div className='w-full h-40 mt-5 flex justify-center items-center flex-col space-y-8'>
                <div className='text-center space-y-2'>
                    <h1 className='text-muted-foreground '>Designed and Created by <span className='text-secondary-foreground' >Inderjot Singh</span>  </h1>
                    <h3 className='text-muted-foreground text-sm'>Using Next13 , ShadCN and AWS S3 as Object Storage </h3>
                </div>

                <div className='space-x-5 flex '>
                    <Link href='https://www.instagram.com/inderjot1112'><Instagram className='transition-all hover:scale-110 ' /></Link>
                    <Link href="https://github.com/inderjotx"><Github className='transition-all hover:scale-110 ' /></Link>
                    <Link href="https://www.linkedin.com/in/inderjot-singh-4a5404226/" ><Linkedin className='transition-all hover:scale-110 ' /></Link>
                </div>

            </div>
        </div>
    )
}

export default Hero