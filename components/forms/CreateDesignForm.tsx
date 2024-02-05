"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { toast } from '../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import Link from 'next/link';
import Image from 'next/image';

import ColorCanvas from "@/public/assets/ImageLogo.png"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Design } from '@prisma/client';
import { Tag, X } from 'lucide-react';
import { Tags } from '../ui/Tags';
import { Badge } from '../ui/badge';





const FormSchema = z.object({
    title: z.string().min(2, "Title should have atleast 2 characters").max(20),
    description: z.string().min(5, "Description should have atleast 2 characters"),
})




type FormType = z.infer<typeof FormSchema>


interface CreateDesignProps {
    initialData: Design | null
}




export function CreateDesign({ initialData }: CreateDesignProps) {

    const title = initialData?.title || ""
    const description = initialData?.description || ""
    const imageUrl = initialData?.imageKey || null



    const isNew = initialData?.id ? false : true
    console.log('innital data')
    console.log(initialData)
    console.log(isNew)


    const session = useSession()
    const imageRef = useRef<HTMLInputElement | null>(null)
    const [hasImage, setHasImage] = useState<boolean>(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [image, setImage] = useState<string | null>(imageUrl)
    const router = useRouter()



    console.log(selectedTags)
    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: { title, description }
    })


    function removeTag(index: number) {
        const array = selectedTags
        const newArray = [...selectedTags.slice(0, index), ...selectedTags.slice(index + 1)]
        setSelectedTags(newArray)
    }


    async function uploadNew(values: FormType) {
        const selectedImage = imageRef.current?.files?.[0]

        if (!selectedImage) {
            alert("select image first ")
        }

        try {

            // generating presigned url for the image 
            const { data } = await axios.post('/api/get-image-url', {
                userId: session.data?.user.id,
                imageName: selectedImage?.name
            })



            console.log("response from create image ")
            console.log(data.url)
            console.log(data.imageKey)


            const imageKey = data.imageKey
            const presignedUrl = data.url



            // store the image 
            const headers = { 'Content-Type': selectedImage?.type }


            const response = await axios.put(presignedUrl, imageRef.current?.files?.[0], { headers })


            console.log("response after sending the image to s3")
            console.log(response)

            if (response.status == 200) {

                const response = await axios.post('/api/add-design', {
                    title: values.title,
                    description: values.description,
                    imageKey: "https://designfly.s3.amazonaws.com/" + imageKey,
                    userId: session.data?.user.id,
                    tags: selectedTags

                })

                console.log("response from user creation ")
                console.log(response)

                // give a toast and then move 
                router.push('/dashboard')
            }

            else {
                console.log("error occured ")
            }

        }




        catch (err) {
            console.log(err)
        }
    }


    async function editOld(values: FormType) {

        const selectedImage = imageRef.current?.files?.[0]

        try {

            if (hasImage) {

                const { data } = await axios.post('/api/get-image-url', {
                    userId: session.data?.user.id,
                    imageName: selectedImage?.name
                })



                console.log("response from create image ")
                console.log(data.url)
                console.log(data.imageKey)


                const imageKey = data.imageKey
                const presignedUrl = data.url



                // store the image 
                const headers = { 'Content-Type': selectedImage?.type }


                const response = await axios.put(presignedUrl, imageRef.current?.files?.[0], { headers })


                console.log("response after sending the image to s3")
                console.log(response)

                if (response.status == 200) {

                    const response = await axios.patch('/api/add-design', {
                        title: values.title,
                        description: values.description,
                        imageKey: "https://designfly.s3.amazonaws.com/" + imageKey,
                        userId: session.data?.user.id,
                        id: initialData?.id
                    })

                    console.log("response from user creation ")
                    console.log(response)

                    // give a toast and then move 
                    router.push('/dashboard')
                }

                else {
                    console.log("error occured ")
                }
            }

            // normal patch 
            else {

                console.log("Image has not been updated")

                const response = await axios.patch('/api/add-design', {
                    title: values.title,
                    description: values.description,
                    imageKey: initialData?.imageKey,
                    userId: session.data?.user.id,
                    id: initialData?.id
                })

                console.log("response from user creation ")
                console.log(response)

                // give a toast and then move 
                router.push('/dashboard')

            }



        }




        catch (err) {
            console.log(err)
        }
    }




    async function onSubmit(values: FormType) {


        // post 
        if (isNew) {
            await uploadNew(values)
        }

        // patch 
        else {
            await editOld(values)
        }

    }



    function imageInputOnChange() {

        if (imageRef.current?.files?.[0]) {
            setHasImage(true)
            setImage(window.URL.createObjectURL(imageRef.current?.files?.[0]))
        }
        else {
            setHasImage(false)
        }
    }




    return (
        <div className='w-full flex justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8 mt-8">
                    <div className='w-full flex justify-between'>
                        <Button type="button" className='rounded-full px-6' variant="outline" asChild><Link href={"/"}>Cancel</Link></Button>
                        <Button type="submit" className='rounded-full px-6'>Create</Button>
                    </div>
                    <div className='flex items-center gap-4 '>
                        <div>
                            <Tags selected={selectedTags} setSelectedTags={setSelectedTags} />
                        </div>
                        <div className='flex gap-3'>
                            {
                                selectedTags.map((tag, index) => (
                                    <Badge key={tag} className='p-2 rounded-lg font-normal' variant={"outline"} >{tag} <X className='ml-2 cursor-pointer' size={"15"} onClick={() => removeTag(index)} ></X></Badge>
                                ))
                            }
                        </div>
                    </div>
                    <div className='relative h-80 border-2 bg-background flex justify-center items-center border-black/60 dark:border-white/60  border-dashed rounded-md'>
                        <Input
                            type='file'
                            accept=".jpg, .jpeg, .webp, .png"
                            className='absolute w-full h-full opacity-0'
                            placeholder="Upload Image"
                            id="image"
                            ref={imageRef}
                            name="image"
                            onChange={imageInputOnChange}
                        />

                        {
                            isNew ?
                                //@ts-ignore
                                hasImage ? <Image src={URL.createObjectURL(imageRef.current.files?.[0])} alt='canvas' width={100} height={100} className='object-cover w-full h-full ' quality={100} />
                                    :
                                    <Image src={ColorCanvas} className='w-40 h-40 object-contain' alt='colorcanvas' />
                                :
                                <Image src={image || ""} alt='canvas images' width={1} height={1} unoptimized className='object-cover w-full h-full ' quality={100} />
                        }
                    </div>


                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="" {...field}
                                        className=''
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )

}