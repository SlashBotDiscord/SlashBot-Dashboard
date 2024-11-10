"use server";

import { auth } from "@/auth";
import { APIChannel } from "discord-api-types/v10";
import { cache } from "react";

async function getChannels(guildId: string): Promise<{data: APIChannel[]}> {
    const session = await auth()
    const userId = (session as any)?.userId
    console.log(session, userId)
    const result = await fetch(`http://localhost:4200/api/${guildId}/GET_CHANNELS?userId=${userId}`, {
        method: "POST"
    })

    return result.json()
}

export default cache(getChannels);