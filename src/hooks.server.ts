import { type Handle } from '@sveltejs/kit';
import { getUserById } from '$lib/server/db';
import { getSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = getSession(event.cookies);

    if (sessionId) {
        const user = getUserById(sessionId);
        if (user) {
            event.locals.user = { id: user.id, username: user.username };
        }
    }

    const response = await resolve(event);
    return response;
};
