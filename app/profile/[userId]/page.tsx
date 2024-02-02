import { DesignGrid } from "@/components/DesignGrid"
import { DesignGridUser } from "@/components/DesignGridUser"
import Userimage from "@/components/ui/Userimage"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/lib/prismadb"
import { getServerSession } from "next-auth"
import Link from "next/link"



export default async function Page({ params }: { params: { userId: string } }) {

    const sessionUser = await getServerSession()
    console.log("first")
    console.log(sessionUser?.user.id)
    console.log("second")
    console.log(params.userId)

    if (!params.userId) {
        return <div>This user does not  exist </div>
    }

    const user = await prisma.user.findUnique({
        where: {
            id: params.userId
        }
        ,
        include: {
            Design: {
                include: {
                    Heart: true
                }
            }
        }

    })

    if (!user) {
        return <div>Invalid Credentials</div>
    }


    return (
        <div className="flex flex-col items-center gap-8 px-8">

            <div className="flex justify-center items-center ">
                <div className="p-8">
                    <Userimage className="h-28 w-28 text-2xl" name={user.name} url={user.image || ""} />
                </div>
                <div className="flex flex-col">
                    <h3 className="">{user.name}</h3>
                    <h3 className="text-muted-foreground text-sm">{user.email}</h3>
                    <h3>{user.bio}</h3>

                    <Link href={`${params.userId}/settings`} className="text-sm mt-4 transition-colors text-muted-foreground hover:text-foreground" >Edit</Link>
                </div>
            </div>
            <DesignGridUser userId={user.id} />
        </div>
    )

} 