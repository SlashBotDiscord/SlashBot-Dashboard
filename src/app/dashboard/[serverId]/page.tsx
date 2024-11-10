import { GeneralIcon, RightArrowIcon } from "@/components/Icons/Icons";
import styles from "./page.module.css";
import Navigation from "@/components/Navigation/GuildNavigation/GuildNavigation";
import InnerContainerHeader from "@/components/Headers/InnerContainerHeader/InnerContainerHeader";

export default async function Home({params}: {params: Promise<{serverId: string}>}) {
    const { serverId } = await params;

    return (
        <div>
            <InnerContainerHeader name={"General"}>
                <GeneralIcon/>
            </InnerContainerHeader>
            <h1>Server ID: {serverId}</h1>
        </div>
    )
}