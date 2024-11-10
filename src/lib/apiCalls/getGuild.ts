"use server";

import { auth } from "@/auth";
import { APIChannel, APIGuild, APIGuildMember } from "discord-api-types/v10";
import { cache } from "react";

async function getMember(guildId: string): Promise<{success: boolean, data: APIGuild}> {
    const session = await auth()
    const userId = (session as any)?.userId
    console.log(session, userId)
    const result = await fetch(`http://localhost:4200/api/${guildId}/GET_GUILD?userId=${userId}`, {
        method: "POST"
    })

    return result.json()
}

export default cache(getMember);