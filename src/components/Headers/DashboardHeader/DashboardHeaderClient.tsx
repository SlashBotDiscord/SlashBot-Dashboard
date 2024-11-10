"use client";

import styles from "./DashboardHeader.module.css";
import Image from "next/image";
import { HeaderUser } from "@/components/Headers/HeaderUser/HeaderUser";
import GuildSelector from "@/components/Headers/GuildSelect/GuildSelector";
import type { PartialGuild } from "@/lib/actions/guildActions";

interface DashboardHeaderClientProps {
    displayGuildsSelector?: boolean;
    guilds: PartialGuild[];
    userData?: {
        username: string;
        image: string;
    };
}

export default function DashboardHeaderClient({
    displayGuildsSelector,
    guilds,
    userData
}: DashboardHeaderClientProps) {
    return (
        <header className={styles.header}>
            <div className={styles.innerWrapper}>
                <div className={styles.brand}>
                    <Image src="/logo.png" alt="SlashBot" width={32} height={32}/>
                    <a href="/dashboard">
                        Dashboard
                    </a>
                </div>
                {displayGuildsSelector && <GuildSelector guilds={guilds.filter(g => g.canEdit)}/>}
                <div style={{marginLeft: "auto"}}></div>
                {userData && <HeaderUser username={userData.username} image={userData.image}/>}
            </div>
        </header>
    );
}
