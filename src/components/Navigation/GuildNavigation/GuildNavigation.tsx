"use client";
import { usePathname } from "next/navigation";
import styles from "./GuildNavigation.module.css";
import { CommandsIcon, GeneralIcon, MessagesIcon } from "../../Icons/Icons";

export default function GuildNavigation() {
    const currentPath = usePathname();
    const [_, base, guildId, category] = currentPath.split("/");

    if(!guildId) return null;

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
            </ul>
        </nav>
    );
}
