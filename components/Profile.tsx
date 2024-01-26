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
import { useSession } from "next-auth/react"

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
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
