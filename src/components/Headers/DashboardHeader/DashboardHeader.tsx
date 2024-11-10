import { auth } from "@/auth";
import { getGuildsAction } from "@/lib/actions/guildActions";
import DashboardHeaderClient from "./DashboardHeaderClient";

export default async function DashboardHeader({
    displayGuildsSelector
}: {
    displayGuildsSelector?: boolean
}) {
    const session = await auth();
    const guilds = session ? await getGuildsAction() : [];
    const userData = session?.user ? {
        username: session.user.name || "",
        image: session.user.image || ""
    } : undefined;

    return (
        <DashboardHeaderClient 
            displayGuildsSelector={displayGuildsSelector}
            guilds={guilds}
            userData={userData}
        />
    );
}
