import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken: string
        userId: string
        user: {
            id: string
            permissions?: string
            name?: string | null
            email?: string | null
            image?: string | null
        }
    }
}
