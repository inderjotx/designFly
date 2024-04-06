"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import axios from "axios"

import { signIn, useSession } from "next-auth/react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'

const formSchema = z.object({
    username: z.string().min(2, "Name Should atleast have 5 characters").max(50),
    email: z.string().min(1).email("This is not a valid email "),
    password: z.string().min(5, "Password should altest be 5 character long").max(20)
})


type formSchemaType = z.infer<typeof formSchema>

export function RegisterForm() {

    const router = useRouter()
    const { data } = useSession()

    if (data) {
        redirect('/')
    }

    async function handleGoogleLogin() {

        signIn("google", {
            redirect: true,
            callbackUrl: "http://localhost:3000"
        })


    }


    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: ""
        },
    })

    async function onSubmit(values: formSchemaType) {
        console.log(values)

        const { data } = await axios.post("/api/register", {
            user: {
                name: values.username,
                email: values.email,
                password: values.password,
                provider: "credentials"

            }
        })

        console.log("data")
        console.log(data)




        if (data && data.message && data.code == 0) {

            toast.success(data.message)
            router.push('/signIn')
        }


        else {
            toast.error(data.message)
        }





    }




    return (


        <div className="h-full w-full flex justify-center ">

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col mt-20  items-center space-y-10  lg:w-2/5 w-9/12">
                    <div className="mr-auto" >
                        <h1 className="text-4xl font-medium">Register</h1>
                    </div>
                    <div className="space-y-4 w-full  ">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                    <h3 className="text-sm text-muted-foreground">Already registered ?  <span onClick={() => signIn()} className="font-semibold cursor-pointer text-foreground">Login here </span> </h3>
                </form>
            </Form>
        </div>
    )
}


