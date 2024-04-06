"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { toast } from 'react-hot-toast'
import { redirect, useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().min(1).email("This is not a valid email "),
    password: z.string().min(5, "Password should altest be 5 character long").max(20)
})


type formSchemaType = z.infer<typeof formSchema>






export function LoginForm({ callbackUrl, error }: { callbackUrl: string, error: string }) {


    const { data } = useSession()

    if (data) {
        redirect('/')
    }

    const router = useRouter()



    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: ""
        },
    })

    async function onSubmit(values: formSchemaType) {

        const response = await signIn("credentials", {
            password: values.password,
            email: values.email,
            redirect: true,
            callbackUrl: "http://localhost:3000/dashboard/new"
        })


        if (error) {
            console.log(error)
            toast.error("Wrong credentials")
        }

        else {
            toast.success("Successfully Logged In")
        }

    }


    async function handleGoogleLogin() {

        signIn("google", {
            redirect: true,
            callbackUrl: "http://localhost:3000"
        })


    }



    return (

        <div className="w-full h-full  flex justify-center ">

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex  flex-col mt-20 items-center   space-y-10 lg:w-2/5 w-9/12">
                    <div className="mr-auto" >
                        <h1 className="text-4xl font-medium">Login</h1>
                    </div>
                    <div className="space-y-4 w-full  ">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2" >
                            <Button type="submit" className="">Submit</Button>
                            <Button variant="outline" type="button" className="">
                                <Link href={"/"}>
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                        <Button type="button" onClick={handleGoogleLogin} >Google</Button>
                    </div>
                    <h3 className="text-sm text-muted-foreground ">New on this application <Link href={"/register"} className="font-semibold text-foreground">Register here </Link> </h3>

                </form>
            </Form>


        </div>

    )
}


