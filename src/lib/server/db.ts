import fs from 'node:fs';
import path from 'node:path';
import type { Museum, Review, User, Wishlist } from '../types';
import museumsData from '../data/museums.json';

const DB_PATH = path.resolve('db.json');

interface Schema {
    users: User[];
    reviews: Review[];
    wishlists: Wishlist[];
}

// Initial data if file doesn't exist
const initialData: Schema = {
    users: [],
    reviews: [],
    wishlists: []
};

// Helper to load DB
function loadDB(): Schema {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading DB, resetting", e);
        return initialData;
    }
}

// Helper to save DB
function saveDB(data: Schema) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// --- Museums (Read-only from static JSON for now) ---
export const getMuseums = (): Museum[] => {
    return museumsData as Museum[];
};

export const getMuseumById = (id: number): Museum | undefined => {
    return (museumsData as Museum[]).find((m) => m.id === id);
};

// --- Users ---
export const createUser = (username: string, passwordHash: string): User | null => {
    const db = loadDB();
    if (db.users.find(u => u.username === username)) {
        return null; // Username taken
    }
    const newUser: User = {
        id: crypto.randomUUID(),
        username,
        passwordHash
    };
    db.users.push(newUser);
    saveDB(db);
    return newUser;
};

export const getUserByUsername = (username: string): User | undefined => {
    const db = loadDB();
    return db.users.find(u => u.username === username);
};

export const getUserById = (id: string): User | undefined => {
    const db = loadDB();
    return db.users.find(u => u.id === id);
};

// --- Reviews ---
export const addReview = (review: Omit<Review, 'id' | 'createdAt'>): Review => {
    const db = loadDB();
    const newReview: Review = {
        ...review,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
    };
    db.reviews.push(newReview);
    saveDB(db);
    return newReview;
};

export const getReviewsByMuseumId = (museumId: number): Review[] => {
    const db = loadDB();
    return db.reviews.filter(r => r.museumId === museumId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// --- Wishlist ---
export const addToWishlist = (userId: string, museumId: number) => {
    const db = loadDB();
    let wishlist = db.wishlists.find(w => w.userId === userId);
    if (!wishlist) {
        wishlist = { userId, museumIds: [] };
        db.wishlists.push(wishlist);
    }
    if (!wishlist.museumIds.includes(museumId)) {
        wishlist.museumIds.push(museumId);
        saveDB(db);
    }
};

export const removeFromWishlist = (userId: string, museumId: number) => {
    const db = loadDB();
    const wishlist = db.wishlists.find(w => w.userId === userId);
    if (wishlist) {
        wishlist.museumIds = wishlist.museumIds.filter(id => id !== museumId);
        saveDB(db);
    }
};

export const getWishlist = (userId: string): number[] => {
    const db = loadDB();
    const wishlist = db.wishlists.find(w => w.userId === userId);
    return wishlist ? wishlist.museumIds : [];
};
