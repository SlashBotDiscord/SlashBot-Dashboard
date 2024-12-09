"use server";

import { auth } from "@/auth";

export default async function messageCreate(guildId: string, channelId: string, messageData: any) {
    const session = await auth()
    const userId = (session as any)?.userId
    console.log(session, userId)
    const result = await fetch(`http://localhost:4200/api/guilds/current/channels/${channelId}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": process.env.AUTH_DISCORD_SECRET!,
            "guild-id": guildId,
            "user-id": userId
        },
        body: JSON.stringify(messageData)
    })

    return result.json()
}