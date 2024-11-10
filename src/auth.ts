import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [ Discord({
        authorization: `https://discord.com/api/oauth2/authorize?scope=${encodeURIComponent("identify guilds guilds.members.read")}&prompt=none`
    })],
    callbacks: {
        async jwt({ token, account, profile }) {
            console.log("jwt")
            if (account) {
                token.accessToken = account.access_token
                const result = await fetch(`${process.env["DISCORD_BASE_URL"]}/users/@me`, {headers: {authorization: `Bearer ${account.access_token}`}}).then(res => res.json())
                if(result) {
                    token.userId = result.id
                }
            }
            return token
        },
        async session({session, token}) {
            session.userId = token.userId as string
            session.user.id = token.userId as string
            session.accessToken = token.accessToken as string
            return session
        },
        async signIn({account, profile, user}) {
            // check access permissions
            return true
        }
    }
})