import React from 'react'

import Image from 'next/image'

import human1 from "@/public/assets/humans/human1.jpg"
import human2 from "@/public/assets/humans/human2.jpg"
import human3 from "@/public/assets/humans/human3.jpg"
import human4 from "@/public/assets/humans/human4.jpg"
import human5 from "@/public/assets/humans/human5.jpg"
import human6 from "@/public/assets/humans/human6.jpg"
import human7 from "@/public/assets/humans/human7.jpg"
import human8 from "@/public/assets/humans/human8.jpg"
import human9 from "@/public/assets/humans/human9.jpg"
import human10 from "@/public/assets/humans/human10.jpg"

const images = [
    { image: human1, name: 'John', role: 'Developer', tags: ['JavaScript', 'React'] },
    { image: human2, name: 'Emily', role: 'Designer', tags: ['UI/UX', 'Graphic Design'] },
    { image: human3, name: 'Michael', role: 'Product Manager', tags: ['Product Strategy', 'Agile'] },
    { image: human4, name: 'Sophia', role: 'Data Scientist', tags: ['Machine Learning', 'Python'] },
    { image: human5, name: 'David', role: 'Marketing Specialist', tags: ['Digital Marketing', 'SEO'] },
    { image: human6, name: 'Shawn', role: 'Developer', tags: ['Frontend', 'JavaScript'] },
    { image: human7, name: 'Isabella', role: 'UI/UX Designer', tags: ['UI/UX', 'Prototyping'] },
    { image: human8, name: 'Daniel', role: 'DevOps Engineer', tags: ['CI/CD', 'Infrastructure'] },
    { image: human9, name: 'Olivia', role: 'Content Writer', tags: ['Copywriting', 'Blogging'] },
    { image: human10, name: 'Ethan', role: 'QA Engineer', tags: ['Testing', 'Automation'] }
];



export function Carousel() {
    return (
        <div className='inline-flex  flex-nowrap'>
            <div className="flex items-center justify-center   animate-infinite-scroll ">

                {
                    images.map(({ image, name, role, tags }) => (
                        <div key={name} className='w-60 h-80 mx-5 z-10   rounded-[25px] relative overflow-hidden'>
                            <Image src={image} fill alt="bondu"
                                className='h-full w-full object-cover absolute  ' placeholder='blur' quality={100} loading='lazy' />
                            <div className='z-20 absolute left-5 bottom-8  text-white'>
                                <h3 className='text-md font-semibold '>{name}</h3>
                                <h3 className='text-sm '>{role}</h3>
                            </div>
                            <div className='w-full h-full absolute z-10 top-0 left-0 bg-gradient-to-t from-black/30 '></div>
                        </div>
                    ))

                }
            </div>
            <div className="flex items-center justify-center   animate-infinite-scroll">

                {
                    images.map(({ image, name, role, tags }) => (
                        <div key={name} className='w-60 h-80 mx-5 z-10   rounded-[25px] relative overflow-hidden'>
                            <Image src={image} fill alt="bondu"
                                className='h-full w-full object-cover absolute  ' placeholder='blur' quality={100} loading='lazy' />
                            <div className='z-20 absolute left-5 bottom-8  text-white'>
                                <h3 className='text-md font-semibold '>{name}</h3>
                                <h3 className='text-sm '>{role}</h3>
                            </div>
                            <div className='w-full h-full absolute z-10 top-0 left-0 bg-gradient-to-t from-black/30 '></div>
                        </div>
                    ))

                }
            </div>
        </div>
    )
}