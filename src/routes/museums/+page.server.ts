import type { PageServerLoad } from "./$types";
import { getMuseums } from "$lib/server/db";

export const load: PageServerLoad = async () => {
  return {
    museums: getMuseums(),
  };
};
