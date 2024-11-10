import styles from "./page.module.css"
import { getGuildsAction } from "@/lib/actions/guildActions";
import { auth } from "@/auth";
import GuildCard from "@/components/GuildCard/GuildCard";

export default async function Home() {
    const session = await auth();
    const guilds = session ? await getGuildsAction() : [];
    
    return (
        <div>
            <h1>Select a Server</h1>
            <div className={styles.guildsList}>
                {guilds.map((guild) => (
                    <GuildCard
                        key={guild.id} 
                        id={guild.id} 
                        name={guild.name} 
                        icon={guild.icon} 
                        canManage={guild.canEdit}
                    />
                ))}
            </div>
        </div>
    );
}
