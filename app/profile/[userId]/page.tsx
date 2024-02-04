import { DesignGridUser } from "@/components/DesignGridUser"
import FollowButton from "@/components/ui/FollowButton"
import Userimage from "@/components/ui/Userimage"
import { prisma } from "@/lib/prismadb"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function Page({ params }: { params: { userId: string } }) {

    const sessionUser = await getServerSession(authOptions)
    console.log(sessionUser?.user.id)




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
            ,
            Followers: true
        }

    })

    if (!user) {
        return <div>Invalid Credentials</div>
    }

    const hasFollowed = user.Followers.find(({ followingId }) => followingId === sessionUser?.user.id) ? true : false
    const intension = hasFollowed ? "Unfollow" : "Follow"


    return (
        <div className="flex flex-col items-center gap-8 px-8">

            <div className="flex justify-center items-center ">
                <div className="p-8  relative">
                    <Userimage className="h-28 w-28 text-2xl" name={user.name} url={user.image || ""} />
                </div>
                <div className="flex flex-col">
                    <div>
                        <h3 className="">{user.name}</h3>
                        <h3 className="text-muted-foreground text-sm">{user.email}</h3>
                    </div>
                    <div>
                        <h3 className="text-muted-foreground text-sm">{user.bio}</h3>
                    </div>

                    <div className="text-sm mt-4">
                        <span className="text-muted-foreground">{user.Followers.length}</span>  Followers
                    </div>

                    <div className={cn(user.id === sessionUser?.user.id && "hidden")}>
                        <FollowButton followerId={user.id} followingId={sessionUser?.user.id || ""} intension={intension} />
                    </div>

                    <div className={cn(user.id === sessionUser?.user.id ? "block" : "hidden")}>
                        <Link href={`${params.userId}/settings`} className={cn("text-sm mt-4 transition-colors text-muted-foreground hover:text-foreground")} >Edit</Link>
                    </div>
                </div>
            </div>
            <DesignGridUser userId={user.id} />
        </div>
    )

} 