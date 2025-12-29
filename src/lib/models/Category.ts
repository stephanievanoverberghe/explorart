// src/lib/models/Category.ts
import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface CategoryDocument extends Document {
    name: string;
    slug: string;
    description?: string;
    color?: string;
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new Schema<CategoryDocument>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
        description: { type: String, default: '' },
        color: { type: String, default: '' },
    },
    { timestamps: true }
);

export const Category: Model<CategoryDocument> = models.Category || model<CategoryDocument>('Category', categorySchema);
