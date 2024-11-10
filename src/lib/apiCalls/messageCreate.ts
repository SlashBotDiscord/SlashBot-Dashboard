"use server";

import { auth } from "@/auth";

export default async function messageCreate(guildId: string, channelId: string, messageData: any) {
    const session = await auth()
    const userId = (session as any)?.userId
    console.log(session, userId)
    const result = await fetch(`http://localhost:4200/api/${guildId}/MESSAGE_CREATE?userId=${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({channelId, messageData})
    })

    return result.json()
}