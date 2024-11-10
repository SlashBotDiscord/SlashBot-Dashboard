import styles from "./layout.module.css";
import { auth } from "@/auth";
import LogInButton from "@/components/Buttons/LogInButton/LogInButton";
import DashboardHeader from "@/components/Headers/DashboardHeader/DashboardHeader";
import GuildNavigation from "@/components/Navigation/GuildNavigation/GuildNavigation";
import getMember from "@/lib/apiCalls/getMember";

export default async function Layout({
   children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if(!session) {
        return (
            <>
                <DashboardHeader displayGuildsSelector={!!session}/>
                <div>
                    <h1>
                        You are missing permissions to view this page.
                    </h1>
                    <LogInButton/>
                </div>
            </>
        )
    }

    return (
        <>
            <DashboardHeader displayGuildsSelector={!!session}/>
            <div className={styles.mainContent}>
                <div className={styles.wrapper}>
                    <div className={styles.innerMainContent}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
