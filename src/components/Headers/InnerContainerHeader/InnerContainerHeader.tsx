"use client";
import styles from "./InnerContainerHeader.module.css";
import { RightArrowIcon } from "../../Icons/Icons";
import { usePathname } from "next/navigation";

export default function InnerContainerHeader({name, subPaths, children}: {name: string, subPaths?: {display: string, path: string}[], children: React.ReactNode}) {
    const path = usePathname();
    const [_, base, serverId, category] = path.split("/");
    let builtPath = `/${base}/${serverId}/${category}`;

    return (
        <div className={styles.innerContentHeader}>
            <div>
                <div className={styles.mainIconWrapper}>
                    {
                        children
                    }
                </div>
                <a className={styles.mainCategory} href={builtPath}>{name}</a>
                {
                    subPaths?.map((path) => (
                        <div className={styles.subSection} key={path.path}>
                            <RightArrowIcon className={styles.arrowIcon}/>
                            <a href={builtPath += `/${path.path}`}>{path.display}</a>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}