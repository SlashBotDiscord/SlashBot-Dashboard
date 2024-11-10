import styles from "./DashboardHeader.module.css"
import {auth, signIn} from "@/auth";
import Image from "next/image";
import {HeaderUser} from "@/components/Headers/HeaderUser/HeaderUser";
import getUserGuilds from "@/lib/discordData/getUserGuilds";
import GuildSelector from "@/components/Headers/GuildSelect/GuildSelector";

export default async function DashboardHeader({displayGuildsSelector}: {displayGuildsSelector?: boolean}) {
    const session = await auth();
    const guilds = []
    if(displayGuildsSelector) {
        const allGuilds = await getUserGuilds((session as any)?.accessToken)
        guilds.push(...allGuilds.filter(g => g.canEdit))
    }

    return (
        <header className={styles.header}>
            <div className={styles.innerWrapper}>
                <div className={styles.brand}>
                    <Image src={"/logo.png"} alt={"SlashBot"} width={32} height={32}/>
                    <a href={"/dashboard"}>
                        Dashboard
                    </a>
                </div>
                {
                    displayGuildsSelector
                        ? <GuildSelector guilds={guilds}/>
                        : null
                }
                <div style={{marginLeft: "auto"}}></div>
                {
                    session?.user
                        ? <HeaderUser username={session.user.name!} image={session.user.image}/>
                        : null
                }
            </div>
        </header>
    )
}