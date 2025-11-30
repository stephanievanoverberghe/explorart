// src/lib/models/User.ts
import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export const User: Model<UserDocument> = models.User || model<UserDocument>('User', userSchema);
