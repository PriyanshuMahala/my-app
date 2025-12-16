import { getMuseums } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        museums: getMuseums()
    };
};
