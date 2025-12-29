// src/lib/models/Article.ts
import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface ArticleDocument extends Document {
    title: string;
    slug: string;
    excerpt?: string;
    format: string;
    status: 'draft' | 'published';
    coverImageUrl?: string;
    categorySlug?: string;
    createdAt: Date;
    updatedAt: Date;
}

const articleSchema = new Schema<ArticleDocument>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
        excerpt: { type: String, default: '' },
        format: { type: String, required: true, trim: true },
        status: { type: String, enum: ['draft', 'published'], default: 'draft' },
        coverImageUrl: { type: String, default: '' },
        categorySlug: { type: String, default: '' },
    },
    { timestamps: true }
);

export const Article: Model<ArticleDocument> = models.Article || model<ArticleDocument>('Article', articleSchema);
