
import { LoginForm } from '@/components/LoginForm'
import { getProviders } from 'next-auth/react'


interface loginProps {
    searchParams: {
        callbackUrl: string
        error: string
    }
}

export default async function page({ searchParams }: loginProps) {





    console.log(searchParams.callbackUrl)
    return (

        <div className='flex justify-center items-center w-full h-full'>
            <LoginForm callbackUrl={searchParams.callbackUrl} error={searchParams.error} />

        </div>
    )
}
