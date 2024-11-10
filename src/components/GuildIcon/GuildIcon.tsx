"use client";
import Image from "next/image";
import styles from "./GuildIcon.module.css";

export default function GuildIcon({icon, id, name, width, height}: {icon: string | null, id: string, name: string, width: number, height: number}) {
    "use client";
    if(icon) {
        return (
            <Image
                className={styles.guildIcon}
                src={`https://cdn.discordapp.com/icons/${id}/${icon}.${icon?.startsWith("a_") ? "gif" : "png"}`}
                alt={name}
                width={width}
                height={height}
                style={{width, height}}
            />
        )
    } else {
        return (
            <div
                className={styles.guildIconSubstitute}
                style={{width, height, fontSize: `${width / 3}px`}}
            >
                <span>{name[0]}</span>
            </div>
        )

    }
}