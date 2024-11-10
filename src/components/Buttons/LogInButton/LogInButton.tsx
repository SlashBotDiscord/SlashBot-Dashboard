"use client";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function LogInButton() {
    // Allow for redirecting to the current page after successful login
    const currentPath = usePathname();
    return (
        <button
            onClick={() => {
                signIn("discord", { redirectTo: currentPath || "/dashboard", redirect: true });
            }}
        >
            Sign In
        </button>
    );
}