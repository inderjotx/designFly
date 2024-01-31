import NextAuth from "next-auth"
import type { AuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

import { getUser, createUser, getId } from "@/lib/auth"
import Email from "next-auth/providers/email";



declare module "next-auth" {
    interface Session {
        user: {
            id: string
            provider: string
        } & DefaultSession["user"]
    }
}


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (typeof credentials !== "undefined") {

                    console.log("Inside the credentails login verification ")
                    const user = await getUser(credentials.password, credentials.email)

                    console.log("user")
                    console.log(user)

                    if (typeof user !== "undefined") {
                        return user

                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })


    ],
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true

            try {

                if (account?.provider == "google") {
                    // @ts-ignore
                    const newUser = await createUser(user.name, user.password, account?.provider, user.image, user.email)
                }



                if (isAllowedToSignIn) {
                    return true
                } else {
                    return false
                }

            }

            catch {
                return false
            }

        },

        async jwt({ token, account, profile, user }) {

            account && (token.accessToken = account.access_token)

            console.log(user)

            user && (token.user = user)

            return token
        }


        ,

        async session({ session, token, user }) {

            // @ts-ignore
            session.user = token.user

            return session
        }
    }
    ,
    pages: {
        signIn: "/signIn"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
//  https://next-auth.js.org/configuration/pages for custom login page ui 