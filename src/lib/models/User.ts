// src/lib/models/User.ts
import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface UserFavorite {
    title: string;
    href: string;
    tag: string;
    pillarColorClass: string;
    addedAt?: Date;
}

export interface UserDownload {
    title: string;
    description?: string;
    href: string;
    addedAt?: Date;
}

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    avatarUrl?: string;
    favorites: UserFavorite[];
    downloads: UserDownload[];
    createdAt: Date;
    updatedAt: Date;
}

const favoriteSchema = new Schema<UserFavorite>(
    {
        title: { type: String, required: true },
        href: { type: String, required: true },
        tag: { type: String, required: true },
        pillarColorClass: { type: String, required: true },
        addedAt: { type: Date, default: Date.now },
    },
    { _id: false }
);

const downloadSchema = new Schema<UserDownload>(
    {
        title: { type: String, required: true },
        description: { type: String, default: '' },
        href: { type: String, required: true },
        addedAt: { type: Date, default: Date.now },
    },
    { _id: false }
);

const userSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        avatarUrl: { type: String, default: '' },
        favorites: { type: [favoriteSchema], default: [] },
        downloads: { type: [downloadSchema], default: [] },
    },
    { timestamps: true }
);

export const User: Model<UserDocument> = models.User || model<UserDocument>('User', userSchema);
