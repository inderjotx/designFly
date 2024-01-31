import { User } from '@prisma/client'
import { prisma } from './prismadb'
import { hash, compare } from 'bcrypt'

const SALT_ROUNDS = 4




export async function getUser(password: string, email: string) {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!user) {
        return null
    }

    console.log("inside the getUser ")
    console.log(user)


    if (user.password) {

        console.log("inside the compare ")
        const result = await compare(password, user.password)
        console.log("result")

        if (result) {
            user.password = ""
            return user
        }

        else {
            return null
        }


    }



    if (user.password == password) {
        // not showing password 
        user.password = ""
        return user
    }
}


export async function createUser(name: string, password: string, provider: string, image: string, email: string) {

    const isUser = await getUser(password, email)

    if (isUser) return isUser

    const user = await prisma.user.create({
        data: {
            name,
            password,
            email,
            provider,
            image
        }
    })

    return user
}



export async function getId(name: string, email: string, provider: string) {

    const user = await prisma.user.findFirst({
        where: {
            email,
            provider
        }
    })

    return user?.id

}




export async function registerUser(name: string, email: string, password: string, provider: string) {

    // if email exists and provider = credentail  => redirect login 
    const isUser = await prisma.user.findFirst({
        where: {
            provider,
            email
        }
    })


    console.log("Inside the register checking for user existence ")
    console.log(isUser)

    if (isUser && isUser.provider != "google") {
        return { code: 1, message: "This email alreay exist, use new Email or Login Instead" }
    }




    const hashedPassword = await hash(password, SALT_ROUNDS)


    try {

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                provider
            }
        })

        if (newUser) {
            return { code: 0, message: "New User Created" }
        }


    }
    catch (err: unknown) {

        if (err instanceof Error) {
            console.log(err.message)
            return { code: -1, message: err.message }
        }

        else {
            console.log(err)
            return { code: -1, message: err }
        }
    }



    return { code: -1, message: "Unknown Error Occured in Registration" }



}





