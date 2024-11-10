import styles from "./page.module.css";
import {auth, signOut} from "@/auth";
import getUserGuilds from "@/lib/discordData/getUserGuilds";
import GuildCard from "@/components/GuildCard/GuildCard";

export default async function Home() {
    const session = await auth()
    const guilds = await getUserGuilds((session as any)?.accessToken)
    console.log(session)
    return (
        <div>
            <h1>Select a Server</h1>
            <div className={styles.guildsList}>
                {
                    guilds.map((guild: any) => <GuildCard key={guild.id} id={guild.id} name={guild.name} icon={guild.icon} canManage={(BigInt(guild.permissions) & (BigInt(1) << BigInt(5))) !== BigInt(0)}/>)
                }
            </div>
        </div>
    )
}