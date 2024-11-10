import styles from "./layout.module.css";
import {auth, signIn} from "@/auth";
import DashboardHeader from "@/components/Headers/DashboardHeader/DashboardHeader";
import GuildNavigation from "@/components/Navigation/GuildNavigation/GuildNavigation";

export default async function Layout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()

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
                                <form action={async () => {
                                    "use server"
                                    await signIn("discord", {redirectTo: "/dashboard", redirect: true})
                                }}>
                                    <button type={"submit"}>Sign In</button>
                                </form>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}
