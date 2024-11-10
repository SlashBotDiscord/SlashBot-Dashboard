"use server";

import { auth } from "@/auth";
import { APIChannel, APIGuildMember } from "discord-api-types/v10";
import { cache } from "react";

async function getMember(guildId: string): Promise<{success: boolean, data: APIGuildMember & {permissions: string}}> {
    const session = await auth()
    const userId = (session as any)?.userId
    const result = await fetch(`http://localhost:4200/api/${guildId}/GET_MEMBER?userId=${userId}`, {
        method: "POST"
    })

    return result.json()
}

export default cache(getMember);