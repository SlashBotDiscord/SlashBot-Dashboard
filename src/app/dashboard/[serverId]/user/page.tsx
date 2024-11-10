"use client";

import InnerContainerHeader from "@/components/Headers/InnerContainerHeader/InnerContainerHeader";
import { GeneralIcon, MemberIcon, MessagesIcon } from "@/components/Icons/Icons";
import { SectionNavigationItem } from "@/components/Navigation/SectionNavigationItem/SectionNavigationItem";
import getMember from "@/lib/apiCalls/getMember";
import { APIGuildMember } from "discord-api-types/v10";
import { use, useEffect, useState } from "react";

export default function Home({params}: {params: Promise<{serverId: string}>}) {
    const { serverId } = use(params);
    const [userData, setUserData] = useState<APIGuildMember | null>(null);

    useEffect(() => {
        console.log(serverId)
        getMember(serverId)
        .then(fetched => {
            console.log("result")
            console.log(fetched)
            if(fetched.success) setUserData(fetched.data)
        });
    }, [serverId])

    return (
        <div>
            <InnerContainerHeader name={"User Settings"}>
                <MemberIcon/>
            </InnerContainerHeader>
            {
                userData
                    ? <pre>{JSON.stringify(userData, null, 2)}</pre>
                    : null
            }
        </div>
    )
}