import {cache} from "react"

async function getUserGuilds(accessToken: string) {
    if(!accessToken) return []
    const result: PartialGuild[] = await fetch(`${process.env["DISCORD_BASE_URL"]}/users/@me/guilds`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res => res.json())
    if(!Array.isArray(result)) return []
    result.forEach(g => g.canEdit = (BigInt(g.permissions) & (BigInt(1) << BigInt(5))) !== BigInt(0))
    return result.sort((a, b) => a.canEdit && !b.canEdit ? -1 : !a.canEdit && b.canEdit ? 1 : a.name.localeCompare(b.name))
}

export default cache(getUserGuilds)

export interface PartialGuild {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
    permissions: string;
    features: string[];
    canEdit: boolean;
}