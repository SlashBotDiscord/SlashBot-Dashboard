import styles from "./layout.module.css";
import { auth } from "@/auth";
import LogInButton from "@/components/Buttons/LogInButton/LogInButton";
import DashboardHeader from "@/components/Headers/DashboardHeader/DashboardHeader";
import GuildNavigation from "@/components/Navigation/GuildNavigation/GuildNavigation";

export default async function Layout({
   children,
   params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ serverId?: string }>
}>) {
    const {serverId} = await params;
    const session = await auth();

    return (
        <>
            <DashboardHeader displayGuildsSelector={!!session}/>
            <div className={styles.mainContent}>
                <div className={styles.wrapper}>
                    {
                        session
                            ? <div className={styles.innerMainContent}>
                                <GuildNavigation/>
                                {children}
                            </div>
                            : <div>
                                <h1>
                                    Sign in to continue
                                </h1>
                                <LogInButton/>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}
