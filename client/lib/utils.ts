import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function logOut() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        console.log(data);
        return data.message;
    } catch (error) {
        console.error(error);
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
            const user = await res.json();
            return user;
        }

        return null;
    } catch (error) {
        return null;
    }
}
