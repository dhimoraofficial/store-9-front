
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export async function sleep(seconds = 1) {
    return new Promise(resolve => setTimeout(resolve, (seconds * 1000)));
}

export function getCookie(__name: string, parse: boolean = false) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + encodeURIComponent(__name) + '=([^;]*)'));
    return match ? (parse ? JSON.parse(decodeURIComponent(match?.[1])) : decodeURIComponent(match?.[1])) : null;
}

export function setCookie(__name: string, value: string, expireInDay = 30, domain: string) {
    const expires = new Date(Date.now() + expireInDay * 864e5).toUTCString();
    const encodedName = encodeURIComponent(__name);
    const encodedValue = encodeURIComponent(value);

    let cookie = `${encodedName}=${encodedValue}; path=/;`

    if (domain) {
        cookie += `domain=.${domain};`
    }

    if (expires) {
        cookie += `expires=.${expires};`
    }

    document.cookie = cookie
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
