import { auth } from "@/auth";
import getMember from "@/lib/apiCalls/getMember";

export default async function Layout({
   children,
   params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ serverId: string }>
}>) {
    const {serverId} = await params;
    const member = await getMember(serverId);
    if(!member) return null;
    console.log(member)

    const bitfield = BigInt(member.data.permissions);
    console.log(bitfield, member)
    if((bitfield & 1n << 5n) !== 0n) {
        return (
            <>
                <span>
                    You are missing permissions to view this page.
                </span>
            </>
        )
    }

    return (
        <>
            {children}
        </>
    );
}
