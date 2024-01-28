"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
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
import { MyCarousel } from '../ui/MyCarousel';
import { SelectedImages } from '../SelectedImages';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];




const FormSchema = z.object({
    title: z.string().min(2, "Title should have atleast 2 characters").max(20),
    description: z.string().min(5, "Description should have atleast 2 characters"),
    image: z
        .any()
    // .refine((files) => files?.length == 1, "Image is required.")
    // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    // .refine(
    //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //     ".jpg, .jpeg, .png and .webp files are accepted."
    // ),
})



type FormType = z.infer<typeof FormSchema>



export function CreateDesign() {

    const session = useSession()

    const [selectedImageUrl, setSelectedImageUrl] = useState<any>()

    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: ""
        }
    })



    async function onSubmit(values: FormType) {

        console.log("iamge")
        console.log(selectedImageUrl)
        try {

            const response = await axios.post('/api/add-design', {
                title: values.title,
                description: values.description,
                image: selectedImageUrl,
                userId: session.data?.user.id
            })

            console.log("response from user creation ")
            console.log(response)

        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='w-full h-full flex justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8 mt-8">
                    <div className='w-full flex justify-between'>
                        <Button type="button" className='rounded-full px-6' variant="outline" asChild><Link href={"/"}>Cancel</Link></Button>
                        <Button type="submit" className='rounded-full px-6'>Create</Button>
                    </div>

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <div className='w-full flex flex-col space-y-4 justify-center items-center relative h-96  border-2 border-black/60  dark:border-white/60  border-dashed rounded-md  '>
                                    <FormControl>
                                        <Input type='file' className='absolute w-full h-full opacity-0' placeholder="Upload Image"
                                            // {...field}
                                            id="fileInput"
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            onChange={(e) => {
                                                field.onChange(e.target.files?.[0]);
                                                setSelectedImageUrl(e.target.files?.[0]);
                                            }}
                                            ref={field.ref}
                                            va={MAX_FILE_SIZE}
                                        />

                                    </FormControl>
                                    {
                                        selectedImageUrl ?
                                            <Image src={URL.createObjectURL(selectedImageUrl)} alt='canvas images' width={100} height={100} className='object-contain object-center w-full h-full ' quality={100} />
                                            // <MyCarousel files={Array.from(selectedImageUrl)} />
                                            :
                                            <Image src={ColorCanvas} className='w-40 h-40 object-contain' alt='colorcanvas' />
                                    }
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


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
