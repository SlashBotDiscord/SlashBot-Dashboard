"use client";

import styles from "./HeaderUser.module.css";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {useEffect, useState} from "react";

export function HeaderUser({username, image}: {username: string, image?: string | null}) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={styles.user} onClick={() => setExpanded(!expanded)}>
            {image ? <Image src={image!} alt={username!} width={26} height={26}/> : null}
            <span>
                {
                    username
                }
            </span>
            {
                expanded
                    ? <div className={styles.userOptions}>
                        <button className={`secondary ${styles.option}`} onClick={() => signOut()}>Sign Out</button>
                    </div>
                    : null
            }
        </div>
    )
}