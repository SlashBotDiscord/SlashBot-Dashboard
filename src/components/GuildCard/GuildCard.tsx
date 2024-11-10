import styles from "./GuildCard.module.css"
import GuildIcon from "@/components/GuildIcon/GuildIcon";

export default function GuildCard({id, name, icon, canManage}: {id: string, name: string, icon: string | null, canManage: boolean}) {
    const inner = (
        <div className={`${styles.card} ${!canManage ? styles.disabled : ""}`}>
            <GuildIcon icon={icon} id={id} name={name} width={64} height={64}/>
            <div className={styles.guildInformation}>
                    <span>
                        {name}
                    </span>
            </div>
        </div>
    )

    if(canManage) {
        return (
            <a className={styles.outer} href={`/dashboard/${id}`}>
                {inner}
            </a>
        )
    } else {
        return inner
    }
}