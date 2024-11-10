import { auth } from "@/auth";
import GuildNavigation from "@/components/Navigation/GuildNavigation/GuildNavigation";
import getMember from "@/lib/apiCalls/getMember";
import {redirect} from "next/navigation";

export default async function Layout({
   children,
   params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ serverId: string }>
}>) {
    const {serverId} = await params;
    const member = await getMember(serverId);

    if(!member || !member.success) {
        return (
            <div>
                <h1>
                    You are missing permissions to view this page.
                </h1>
                <a href={"/dashboard"}>Go back</a>
            </div>
        )
    }

    const bitfield = BigInt(member.data.permissions);
    if((bitfield & BigInt(1) << BigInt(5)) === BigInt(0)) {
        return (
            <div>
                <h1>
                    You are missing permissions to view this page.
                </h1>
                <a href={"/dashboard"}>Go back</a>
            </div>
        )
    }

    return (
        <>
            <GuildNavigation memberPermissions={member.data.permissions}/>
            {children}
        </>
    );
}
