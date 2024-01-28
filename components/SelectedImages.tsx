import React from 'react'
import Image from 'next/image'

export function SelectedImages({ files }: { files: File[] }) {
    return (
        <div className='flex flex-wrap w-full space-x-4' >
            {

                files.map((file, index) => (

                    <div className='w-10 h-10 rounded-md' key={index}>
                        <Image src={URL.createObjectURL(file)} alt="image" width={10} height={10} />
                    </div>

                ))
            }

        </div>
    )
}
