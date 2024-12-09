"use server";

import { auth } from "@/auth";
import { APIChannel, APIGuild, APIGuildMember } from "discord-api-types/v10";
import { cache } from "react";

async function getMember(guildId: string): Promise<{success: boolean, data: APIGuild}> {
    const session = await auth()
    const userId = (session as any)?.userId
    console.log(session, userId)
    const result = await fetch(`http://localhost:4200/api/guilds/current`, {
        method: "GET",
        headers: {
            "authorization": process.env.AUTH_DISCORD_SECRET!,
            "guild-id": guildId,
            "user-id": userId
        }
    })

    return result.json()
}

export default cache(getMember);