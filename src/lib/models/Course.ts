// src/lib/models/Course.ts
import { Schema, model, models, type Document, type Model } from 'mongoose';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';
export type CourseStatus = 'draft' | 'published' | 'archived';
export type CourseDurationLabel = 'short' | 'medium' | 'long';

export interface CourseDocument extends Document {
    slug: string;
    title: string;
    tagline: string;
    level: CourseLevel;
    pillarSlug: string;
    pillarLabel: string;
    coverImage: string;
    durationLabel: CourseDurationLabel;
    durationMinutes: number;
    modulesCount: number;
    hasIntro: boolean;
    hasConclusion: boolean;
    pinned?: boolean;
    status: CourseStatus;
    listed: boolean;
    summary?: string;
    publishedAt?: Date;
    isMini?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const courseSchema = new Schema<CourseDocument>(
    {
        slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
        title: { type: String, required: true, trim: true },
        tagline: { type: String, default: '', trim: true },
        level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced', 'all'], default: 'beginner' },
        pillarSlug: { type: String, required: true, trim: true },
        pillarLabel: { type: String, required: true, trim: true },
        coverImage: { type: String, default: '', trim: true },
        durationLabel: { type: String, required: true, enum: ['short', 'medium', 'long'], default: 'short' },
        durationMinutes: { type: Number, default: 0 },
        modulesCount: { type: Number, default: 0 },
        hasIntro: { type: Boolean, default: true },
        hasConclusion: { type: Boolean, default: true },
        pinned: { type: Boolean, default: false },
        status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
        listed: { type: Boolean, default: false },
        summary: { type: String, default: '' },
        publishedAt: { type: Date },
        isMini: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Course: Model<CourseDocument> = models.Course || model<CourseDocument>('Course', courseSchema);
