import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import {
  getMuseumById,
  getReviewsByMuseumId,
  addReview,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "$lib/server/db";

export const load: PageServerLoad = async ({ params, locals }) => {
  const museumId = parseInt(params.id);
  const museum = getMuseumById(museumId);

  if (!museum) {
    throw new Error("Museum not found");
  }

  const reviews = getReviewsByMuseumId(museumId);
  let isWishlisted = false;

  if (locals.user) {
    const wishlist = getWishlist(locals.user.id);
    isWishlisted = wishlist.includes(museumId);
  }

  return {
    museum,
    reviews,
    isWishlisted,
    user: locals.user,
  };
};

export const actions: Actions = {
  addReview: async ({ request, locals, params }) => {
    if (!locals.user) return fail(401, { error: "Unauthorized" });

    const data = await request.formData();
    const rating = parseInt(data.get("rating") as string);
    const comment = data.get("comment") as string;
    const museumId = parseInt(params.id);

    if (!rating || !comment) return fail(400, { missing: true });

    addReview({
      museumId,
      userId: locals.user.id,
      username: locals.user.username,
      rating,
      comment,
    });

    return { success: true };
  },

  toggleWishlist: async ({ locals, params }) => {
    if (!locals.user) return fail(401, { error: "Unauthorized" });
    const museumId = parseInt(params.id);

    const wishlist = getWishlist(locals.user.id);
    if (wishlist.includes(museumId)) {
      removeFromWishlist(locals.user.id, museumId);
    } else {
      addToWishlist(locals.user.id, museumId);
    }

    return { success: true };
  },
};
