"use client";
import InnerContainerHeader from "@/components/Headers/InnerContainerHeader/InnerContainerHeader";
import { GeneralIcon, MessagesIcon } from "@/components/Icons/Icons";
import { SectionNavigationItem } from "@/components/Navigation/SectionNavigationItem/SectionNavigationItem";
import getChannels from "@/lib/apiCalls/getChannels";
import messageCreate from "@/lib/apiCalls/messageCreate";
import { APIChannel } from "discord-api-types/v10";
import { use, useCallback, useEffect, useState } from "react";

export default function Home({params}: {params: Promise<{serverId: string}>}) {
    const serverId = use(params).serverId;
    const [result, setResult] = useState<null | string>(null);
    const [content, setContent] = useState<string>("");
    const [channels, setChannels] = useState<APIChannel[]>([]);
    const [channelId, setChannelId] = useState<string>("881253551341457509");

    useEffect(() => {
        getChannels(serverId)
        .then(fetched => setChannels(fetched.data));
    }, [serverId])

    const handleClick = useCallback(async () => {
        const result = await messageCreate(serverId, channelId, {content});

        setResult(JSON.stringify(result, null, 2));
    }, [content, channelId])

    return (
        <div>
            <InnerContainerHeader name={"Messages"} subPaths={[{path: "embed", display: "Embed"}]}>
                <MessagesIcon/>
            </InnerContainerHeader>
            <input onChange={v => setContent(v.target.value)}></input>
            {
                result
                    ? <pre>{result}</pre>
                    : null
            }
            <button onClick={handleClick}>Send Message</button>
            <select onChange={e => setChannelId(e.target.value)}>
                <option value="0">Select a channel</option>
                {
                    channels.map(channel => (
                        <option key={channel.id} value={channel.id}>{channel.name}</option>
                    ))
                }
            </select>
            <span>Sending to: {channelId}</span>
        </div>
    )
}