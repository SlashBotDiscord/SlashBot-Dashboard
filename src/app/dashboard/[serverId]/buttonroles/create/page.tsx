"use client";
import { ButtonRoleIcon, GeneralIcon, RightArrowIcon } from "@/components/Icons/Icons";
import styles from "./page.module.css";
import Navigation from "@/components/Navigation/GuildNavigation/GuildNavigation";
import InnerContainerHeader from "@/components/Headers/InnerContainerHeader/InnerContainerHeader";
import getMember from "@/lib/apiCalls/getMember";
import { use, useEffect, useState } from "react";
import { APIRole } from "discord-api-types/v10";
import getRoles, { CustomAPIRole } from "@/lib/apiCalls/getRoles";
import RoleSelector from "@/components/Selects/RoleSelector/RoleSelector";
import DiscordButton from "@/components/Buttons/DiscordButton/DiscordButton";
import { TextInput } from "@/components/Inputs/TextInput";

export default function Home({params}: {params: Promise<{serverId: string}>}) {
    const { serverId } = use(params);

    const [roles, setRoles] = useState<CustomAPIRole[] | null>(null);
    const [channels, setChannels] = useState<CustomAPIRole[] | null>(null);
    const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
    const [selectedRoles, setSelectedRoles] = useState<CustomAPIRole[]>([]);
    const [label, setLabel] = useState<string>("");

    useEffect(() => {
        getRoles(serverId)
        .then(fetched => {
            if(fetched.success) setRoles(fetched.data)
        });
    }, [serverId])

    return (
        <div>
            <InnerContainerHeader name={"ButtonRole"} subPaths={[{path: "create", display: "Create"}]}>
                <ButtonRoleIcon/>
            </InnerContainerHeader>
            <h2>Step 1: Select the Roles</h2>
            <RoleSelector roles={roles || []} onChange={roles => setSelectedRoles(roles)} maxCount={5}/>
            <h2>Step 2: Enter a label</h2>
            <TextInput value={label} onChange={e => setLabel(e)} placeholder={"Enter a label"} maxLength={80}/>
            <DiscordButton label={label} style={1}/>
        </div>
    )
}