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

    const [selectedImages, setSelectedImage] = useState<any[]>([])

    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: ""
        }
    })



    function onSubmit(values: FormType) {
        toast({ title: values.title, description: values.description })
        console.log(values)
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
                                <div className='w-full flex flex-col space-y-4 justify-center items-center relative h-60 border-2 border-black/60  dark:border-white/60  border-dashed rounded-md  '>
                                    <FormControl>
                                        <Input type='file' className='absolute w-full h-full opacity-0' placeholder="Upload Image"
                                            // {...field}
                                            id="fileInput"
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            onChange={(e) => {
                                                field.onChange(e.target.files);
                                                setSelectedImage(e.target.files?.[0] || null);
                                            }}
                                            ref={field.ref}

                                        />

                                    </FormControl>
                                    {
                                        selectedImages?.length > 0 ?
                                            <Image src={URL.createObjectURL(selectedImages[0])} alt='canvas images' className='object-contain w-1/2 h-1/2 ' quality={100} />
                                            :
                                            <Image src={ColorCanvas} alt='canvas images' className='object-contain w-1/2 h-1/2 ' quality={100} />
                                    }
                                    <div className='text-center text-sm'><h2>Upload Your Design</h2></div>
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
