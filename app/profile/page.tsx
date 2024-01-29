'use client'

import Userimage from "@/components/ui/Userimage"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"

export default function Page() {

    const session = useSession()
    const [canEdit, setCanEdit] = useState<boolean>(false)

    const [userData, setUserData] = useState({ name: session.data?.user.name, email: session.data?.user.email, image: session.data?.user.image })
    const imageRef = useRef<HTMLInputElement | null>(null)

    function handleImage() {
        if (imageRef.current?.files?.[0]) {
            setUserData((prev) => ({ ...prev, image: imageRef.current?.files?.[0].name }))
            console.log("udpate image ")
        }
    }



    async function updateUserData() {

        // if image change 
        if (session.data?.user.image != userData.image) {

            try {


                const { data: { url, imageKey } } = await axios.post("/api/get-image-url", {
                    userId: session.data?.user.id,
                    imageName: session.data?.user.name
                })

                if (!url || !imageKey) {
                    console.log(url)
                    console.log(imageKey)
                }


                // send the image first to the s3 
                const file = imageRef.current?.files?.[0]
                console.log(file)
                const s3Response = await axios.put(url, file, { headers: { 'Content-Type': file?.type } })

                console.log("respnse form s3 ")
                console.log(s3Response)


                if (s3Response.status == 200) {
                    setUserData((prev) => ({ ...prev, image: imageKey }))
                }

            }



            catch (error) {
                console.log("error inside put image if statemetn ")
                console.log(error)
            }

            // update the name of the image to the key 

        }

        try {

            const response = await axios.post("/api/update-profile", {
                ...userData,
                userId: session.data?.user.id
            })
            console.log("response from update update data")
            console.log(response)

            // sign out the out after updation to update the token

        }

        catch (error) {
            console.log(error)
        }



    }









    return (
        <div className="flex justify-center items-center flex-col">
            <div className="p-8">
                <Userimage className="h-28 w-28 text-2xl" name={session.data?.user.name || ""} url={!canEdit ? session.data?.user.image || "" : (imageRef.current?.files?.[0]) && URL.createObjectURL(imageRef.current?.files[0])} />
            </div>
            <div>
                <h2 onClick={() => setCanEdit(true)} className={cn("text-muted-foreground transition-colors hover:text-foreground cursor-pointer", canEdit && "hidden")}>Update Profile</h2>
                <div onClick={() => setCanEdit(true)} className={cn("text-muted-foreground relative transition-colors hover:text-foreground cursor-pointer", !canEdit && "hidden")}>Update Image
                    <input type="file" onChange={handleImage} ref={imageRef} className="opacity-0 left-0  absolute" accept="image/*" />
                </div>

            </div>
            <div className="w-3/5 mt-20 space-y-10">
                <div>
                    <Label className="ml-1">Name</Label>
                    <Input disabled={!canEdit} value={!canEdit ? session.data?.user.name : userData.name} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} className="" type="text" />
                </div>

                <div>
                    <Label className="ml-1">Email</Label>
                    <Input disabled={!canEdit} value={!canEdit ? session.data?.user.email : userData.email} onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))} className="" type="text" />
                </div>


                <div className={cn("w-full flex", !canEdit && "hidden")}>
                    <Button variant='destructive' type="button" onClick={() => setCanEdit(false)} className=" rounded-full px-10" >Cancel</Button>
                </div>
            </div>
            <Button variant="default" type="button" onClick={updateUserData} className="ml-auto rounded-full px-10" >Update</Button>
        </div>
    )
} 