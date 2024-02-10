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
import { signIn } from "next-auth/react"
import Link from "next/link"
import { toast } from 'react-hot-toast'
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().min(1).email("This is not a valid email "),
    password: z.string().min(5, "Password should altest be 5 character long").max(20)
})


type formSchemaType = z.infer<typeof formSchema>






export function LoginForm({ callbackUrl, error }: { callbackUrl: string, error: string }) {


    // const [providers, setProviders] = useState([])

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
            callbackUrl: callbackUrl ?? "http://localhost:3000/dashboard"
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

        const response = await signIn("google", {
            redirect: true,
            callbackUrl: "http://localhost:3000"
        })


        // toast.promise(response, {
        //     loading: "Logging ....",
        //     "success": "Successfully Logged In",
        //     "error": "Error Logging In"
        // })

        toast.success("Successfully Logged In")

        // redirect("/dashboard")

        // if (providers && providers.google) {
        //     await signIn(providers?.google?.id)

        // }

    }



    return (

        <div className="w-full h-full flex justify-center ">

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex  flex-col mt-24 items-center   space-y-10 lg:w-2/5 w-9/12">
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

                    <div className="space-x-2 ">
                        <Button type="submit" className="">Submit</Button>
                        <Button variant="outline" type="button" className="">
                            <Link href={"/"}>
                                Cancel
                            </Link>
                        </Button>
                        {/* <Button type="button" variant="secondary" onClick={() => handleGoogleLogin()}>Login By Google</Button> */}
                        {/* <Button type="button" onCli >Google</Button> */}
                    </div>
                    <h3 className="text-sm text-muted-foreground ">New on this application <Link href={"/register"} className="font-semibold text-foreground">Register here </Link> </h3>

                </form>

            </Form>


        </div>

    )
}


