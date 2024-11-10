"use server";

import { auth } from "@/auth";
import {APIChannel, APIGuild, APIGuildMember, APIRole} from "discord-api-types/v10";
import { cache } from "react";

async function getRoles(guildId: string): Promise<{success: boolean, data: CustomAPIRole[]}> {
    const session = await auth()
    const userId = (session as any)?.userId
    console.log(session, userId)
    const result = await fetch(`http://localhost:4200/api/${guildId}/GET_ROLES?userId=${userId}`, {
        method: "POST"
    })

    return result.json()
}

export default cache(getRoles);

export type CustomAPIRole = Omit<APIRole, "position"> & {selected?: boolean, rawPosition: number}