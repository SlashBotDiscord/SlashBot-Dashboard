import {signIn} from "@/auth";
import Form from "next/form";

export default function Home() {
    async function submit() {
        "use server";
        await signIn("discord", {redirectTo: "/dashboard", redirect: true})
    }
    return (
        <>
            <h1>Main Page</h1>
            <form action={submit}>
                <button type={"submit"}>Sign In</button>
            </form>
        </>
    );
}