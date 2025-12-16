import type { Museum, Review, User, Wishlist } from '../types';
import museumsData from '../data/museums.json';

// NOTE: In a real production app, use a real database (Postgres, MongoDB, etc.).
// Vercel Serverless Functions have a read-only filesystem, so 'fs.writeFileSync' causes 500 errors.
// We are switching to IN-MEMORY storage for this demo, meaning data resets on redeploy.

interface Schema {
    users: User[];
    reviews: Review[];
    wishlists: Wishlist[];
}

// In-memory store
let db: Schema = {
    users: [],
    reviews: [],
    wishlists: []
};

// --- Museums (Read-only from static JSON) ---
export const getMuseums = (): Museum[] => {
    return museumsData as Museum[];
};

export const getMuseumById = (id: number): Museum | undefined => {
    return (museumsData as Museum[]).find((m) => m.id === id);
};

// --- Users ---
export const createUser = (username: string, passwordHash: string): User | null => {
    if (db.users.find(u => u.username === username)) {
        return null; // Username taken
    }
    const newUser: User = {
        id: crypto.randomUUID(),
        username,
        passwordHash
    };
    db.users.push(newUser);
    return newUser;
};

export const getUserByUsername = (username: string): User | undefined => {
    return db.users.find(u => u.username === username);
};

export const getUserById = (id: string): User | undefined => {
    return db.users.find(u => u.id === id);
};

// --- Reviews ---
export const addReview = (review: Omit<Review, 'id' | 'createdAt'>): Review => {
    const newReview: Review = {
        ...review,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
    };
    db.reviews.push(newReview);
    return newReview;
};

export const getReviewsByMuseumId = (museumId: number): Review[] => {
    return db.reviews.filter(r => r.museumId === museumId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// --- Wishlist ---
export const addToWishlist = (userId: string, museumId: number) => {
    let wishlist = db.wishlists.find(w => w.userId === userId);
    if (!wishlist) {
        wishlist = { userId, museumIds: [] };
        db.wishlists.push(wishlist);
    }
    if (!wishlist.museumIds.includes(museumId)) {
        wishlist.museumIds.push(museumId);
    }
};

export const removeFromWishlist = (userId: string, museumId: number) => {
    const wishlist = db.wishlists.find(w => w.userId === userId);
    if (wishlist) {
        wishlist.museumIds = wishlist.museumIds.filter(id => id !== museumId);
    }
};

export const getWishlist = (userId: string): number[] => {
    const wishlist = db.wishlists.find(w => w.userId === userId);
    return wishlist ? wishlist.museumIds : [];
};
