import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function logOut() {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        return;
    } catch (error) {
        throw error;
    }
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

        if (res.ok) {
            const userData = await res.json();
            return userData.data;
        }

        return null;
    } catch (error) {
        throw error;
    }
}
