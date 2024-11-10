import { ButtonRoleIcon, GeneralIcon, RightArrowIcon } from "@/components/Icons/Icons";
import styles from "./page.module.css";
import Navigation from "@/components/Navigation/GuildNavigation/GuildNavigation";
import InnerContainerHeader from "@/components/Headers/InnerContainerHeader/InnerContainerHeader";
import getMember from "@/lib/apiCalls/getMember";
import { SectionNavigationItem } from "@/components/Navigation/SectionNavigationItem/SectionNavigationItem";

export default async function Home({params}: {params: Promise<{serverId: string}>}) {
    const { serverId } = await params;

    return (
        <div>
            <InnerContainerHeader name={"ButtonRole"}>
                <ButtonRoleIcon/>
            </InnerContainerHeader>
            <SectionNavigationItem title={"Create a ButtonRole"} description={"Create a basic ButtonRole"} href={"create"} icon={<ButtonRoleIcon/>}/>
        </div>
    )
}