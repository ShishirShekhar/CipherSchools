import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function logOut() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
}

export async function checkAuth() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })

        const userData = await res.json();

        if (res.ok) {
            return userData.data;
        }

        throw userData.error;
    } catch (error) {
        throw error || "An error occurred. Please try again.";
    }
}
