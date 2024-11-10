"use client";
import { usePathname } from "next/navigation";
import styles from "./GuildNavigation.module.css";
import { ButtonRoleIcon, CommandsIcon, GeneralIcon, MemberIcon, MessagesIcon } from "../../Icons/Icons";

export default function GuildNavigation({memberPermissions}: {memberPermissions: string}) {
    const currentPath = usePathname();
    const [_, base, guildId, category] = currentPath.split("/");

    if(!guildId) return null;
    
    const bitfield = BigInt(memberPermissions);
    if((bitfield & BigInt(1) << BigInt(5)) === BigInt(0)) {
        return null;
    }

    return (
        <nav className={styles.navigation}>
            <ul>
                <li>
                    <a 
                        href={`/${base}/${guildId}`} 
                        className={`${styles.navLink} ${!category ? styles.active : ""}`}
                    >
                        <GeneralIcon className={styles.icon}/>
                        <span>General</span>
                    </a>
                </li>
                <li>
                    <a 
                        href={`/${base}/${guildId}/buttonroles`} 
                        className={`${styles.navLink} ${category === "buttonroles" ? styles.active : ""}`}
                    >
                        <ButtonRoleIcon className={styles.icon}/>
                        <span>ButtonRoles</span>
                    </a>
                </li>
                <li>
                    <a 
                        href={`/${base}/${guildId}/messages`} 
                        className={`${styles.navLink} ${category === "messages" ? styles.active : ""}`}
                    >
                        <MessagesIcon className={styles.icon}/>
                        <span>Messages</span>
                    </a>
                </li>
                <li>
                    <a 
                        href={`/${base}/${guildId}/commands`} 
                        className={`${styles.navLink} ${category === "commands" ? styles.active : ""}`}
                    >
                        <CommandsIcon className={styles.icon}/>
                        <span>Commands</span>
                    </a>
                </li>
                <li>
                    <a 
                        href={`/${base}/${guildId}/user`} 
                        className={`${styles.navLink} ${category === "user" ? styles.active : ""}`}
                    >
                        <MemberIcon className={styles.icon}/>
                        <span>User Settings</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
