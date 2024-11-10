"use client";
import { RightArrowIcon } from "@/components/Icons/Icons";
import styles from "./SectionNavigationItem.module.css";
import { usePathname } from "next/navigation";

export function SectionNavigationItem({title, description, href, icon}: {title: string, description: string, href: string, icon?: React.ReactNode}) {
    let path = usePathname();
    if(!path.endsWith("/")) path += "/";
    return (
        <a className={styles.main} href={path + href}>
            <div className={styles.iconWrapper}>
                {icon}
            </div>
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                <span className={styles.description}>{description}</span>
            </div>
            <RightArrowIcon className={styles.arrowIcon}/>
        </a>
    )
}