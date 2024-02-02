'use client'

import { useRouter } from "next/navigation"

export function FakeLink({ url, className, children }: { url: string, className?: string, children: React.ReactNode }) {

    const router = useRouter()

    return (
        <div className={className} onClick={() => router.push(url)}>
            {children}
        </div>
    )
}
