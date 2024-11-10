"use server";

import { auth } from "@/auth";

export interface PartialGuild {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
    permissions: string;
    features: string[];
    canEdit: boolean;
}

export async function getGuildsAction() {
    const session = await auth();
    if (!session?.accessToken) return [];

    try {
        const result = await fetch(`${process.env.DISCORD_BASE_URL}/users/@me/guilds`, {
            headers: {
                authorization: `Bearer ${session.accessToken}`
            }
        });
        
        const guilds: PartialGuild[] = await result.json();
        
        if (!Array.isArray(guilds)) return [];

        return guilds.map(g => ({
            ...g,
            canEdit: (BigInt(g.permissions) & (BigInt(1) << BigInt(5))) !== BigInt(0)
        })).sort((a, b) => 
            a.canEdit && !b.canEdit ? -1 : 
            !a.canEdit && b.canEdit ? 1 : 
            a.name.localeCompare(b.name)
        );
    } catch (error) {
        console.error('Error fetching guilds:', error);
        return [];
    }
}
