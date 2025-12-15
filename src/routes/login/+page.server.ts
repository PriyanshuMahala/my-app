import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createUser, getUserByUsername } from '$lib/server/db';
import { setSession, clearSession } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/dashboard');
    }
};

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username') as string;
        const password = data.get('password') as string;

        if (!username || !password) {
            return fail(400, { missing: true });
        }

        const user = getUserByUsername(username);
        // Simple password check (in real app use bcrypt)
        if (!user || user.passwordHash !== password) {
            return fail(400, { incorrect: true });
        }

        setSession(cookies, user.id);
        throw redirect(303, '/dashboard');
    },

    register: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username') as string;
        const password = data.get('password') as string;

        if (!username || !password) {
            return fail(400, { missing: true });
        }

        const user = createUser(username, password);
        if (!user) {
            return fail(400, { taken: true });
        }

        setSession(cookies, user.id);
        throw redirect(303, '/dashboard');
    },

    logout: async ({ cookies }) => {
        clearSession(cookies);
        throw redirect(303, '/');
    }
};
