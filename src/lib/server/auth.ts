import type { RequestEvent } from '@sveltejs/kit';

export const COOKIE_NAME = 'session_id';

export function setSession(cookies: RequestEvent['cookies'], userId: string) {
    cookies.set(COOKIE_NAME, userId, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    });
}

export function getSession(cookies: RequestEvent['cookies']): string | undefined {
    return cookies.get(COOKIE_NAME);
}

export function clearSession(cookies: RequestEvent['cookies']) {
    cookies.delete(COOKIE_NAME, { path: '/' });
}
