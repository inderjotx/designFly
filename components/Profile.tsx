import { Button } from "@/components/ui/button"
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
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link'

export function Profile() {

    const session = useSession()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <Userimage name={session.data?.user.name ?? "U"} url={session.data?.user.image ?? ""} />
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={"/profile"}  >Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={"/my-designs/" + session.data?.user.id}  >My Designs </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <div onClick={() => signOut()}>Log out</div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
