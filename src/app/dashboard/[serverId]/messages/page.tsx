import InnerContainerHeader from "@/components/Headers/InnerContainerHeader/InnerContainerHeader";
import { GeneralIcon, MessagesIcon } from "@/components/Icons/Icons";
import { SectionNavigationItem } from "@/components/Navigation/SectionNavigationItem/SectionNavigationItem";

export default async function Home({params}: {params: Promise<{serverId: string}>}) {
    const { serverId } = await params;

    return (
        <div>
            <InnerContainerHeader name={"Messages"}>
                <MessagesIcon/>
            </InnerContainerHeader>
            <SectionNavigationItem title={"Embed"} description={"Create an Embed in Discord using the advanced Embed generator"} href={"embed"} icon={<GeneralIcon/>}/>
        </div>
    )
}