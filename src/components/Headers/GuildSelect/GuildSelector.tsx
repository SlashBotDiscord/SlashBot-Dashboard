"use client"
import { useEffect, useRef, useState } from 'react';
import styles from "./GuildSelector.module.css";
import {PartialGuild} from "@/lib/discordData/getUserGuilds";
import {usePathname} from "next/navigation";
import GuildIcon from "@/components/GuildIcon/GuildIcon";

export default function GuildSelector({guilds}: {guilds: PartialGuild[]}) {
    "use client";
    const pathName = usePathname()
    const [expanded, setExpanded] = useState(false)
    const ref = useRef<HTMLDivElement>(null);

    const currentGuildId = pathName.split("/")[2]
    const currentGuild = guilds.find(g => g.id === currentGuildId)

    function changeExpanded() {
        console.log("changing expanded")
        setExpanded(!expanded)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setExpanded(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <div className={styles.selector} ref={ref}>
            {
                currentGuild
                    ? <div className={styles.currentGuild} onClick={changeExpanded}>
                        <GuildIcon icon={currentGuild.icon} id={currentGuild.id} name={currentGuild.name} width={28} height={28}/>
                        <span>{currentGuild.name}</span>
                    </div>
                    : <div className={styles.currentGuild} onClick={changeExpanded}>
                        <span>Select a Server...</span>
                    </div>
            }
            {
                expanded
                    ? <div className={styles.guildList}>
                        {
                            guilds.map(g => {
                                return (
                                    <a
                                        key={g.id}
                                        href={`/dashboard/${g.id}`}
                                        className={g.id === currentGuildId ? styles.selected : ""}
                                    >
                                        <GuildIcon icon={g.icon} id={g.id} name={g.name} width={32} height={32}/>
                                        <span>{g.name}</span>
                                    </a>
                                )
                            })
                        }
                    </div>
                    : null
            }
        </div>
    )
}