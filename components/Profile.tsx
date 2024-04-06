import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Userimage from "./ui/Userimage"
import { signOut } from "next-auth/react"
import Link from 'next/link'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Button } from "./ui/button"
import { SignOutButton } from "./SignOutButton"

export async function Profile() {


    const session = await getServerSession(authOptions)

    if (!session) {

        <div>No data</div>

    }

    else {


        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button>
                        <Userimage name={session.user.name ?? "U"} url={session.user.image ?? ""} />
                    </button>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href={"/profile/" + session.user.id}  >Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={"/profile/" + session.user.id + "/loved"}  >Liked</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={"/profile/" + session.user.id + "/bookmark"}   >Bookmarks</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="mx-0" >
                            <SignOutButton />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

}
