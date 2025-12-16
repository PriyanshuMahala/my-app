export interface Museum {
    id: number;
    name: string;
    location: string;
    region?: string;
    features: string[];
    description: string;
    image: string;
}

export interface User {
    id: string;
    username: string;
    passwordHash: string; // In a real app. checking simple plain text for this demo might be easier but hash is better practice even for simple.
}

export interface Review {
    id: string;
    museumId: number;
    userId: string;
    username: string;
    rating: number; // 1-5
    comment: string;
    createdAt: string;
}

export interface Wishlist {
    userId: string;
    museumIds: number[];
}
