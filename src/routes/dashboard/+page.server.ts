import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getWishlist, getMuseumById } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const wishlistIds = getWishlist(locals.user.id);
    const wishlistMuseums = wishlistIds
        .map(id => getMuseumById(id))
        .filter(m => m !== undefined);

    return {
        user: locals.user,
        wishlist: wishlistMuseums
    };
};
