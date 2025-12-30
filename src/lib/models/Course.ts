// src/lib/models/Course.ts
import { Schema, model, models, type Document, type Model } from 'mongoose';

export type CourseLevel = 'beginner' | 'intermediate';
export type CourseStatus = 'draft' | 'published' | 'archived';
export type DurationLabel = 'short' | 'medium' | 'long';

export interface CourseVideo {
    title: string;
    url: string;
    durationMinutes?: number;
    isPreview?: boolean;
}

export interface CourseResource {
    title: string;
    url: string;
    type?: string;
    description?: string;
}

export interface CourseModule {
    title: string;
    description?: string;
    order: number;
    durationMinutes?: number;
    videos?: CourseVideo[];
    resources?: CourseResource[];
}

export interface CourseDocument extends Document {
    slug: string;
    title: string;
    tagline: string;
    level: CourseLevel;
    pillarSlug: string;
    pillarLabel: string;
    coverImage: string;
    durationMinutes: number;
    durationLabel: DurationLabel;
    modulesCount: number;
    hasIntro: boolean;
    hasConclusion: boolean;
    priceEUR: number;
    isMini: boolean;
    status: CourseStatus;
    summary?: string;
    videos?: CourseVideo[];
    resources?: CourseResource[];
    modules?: CourseModule[];
    createdAt: Date;
    updatedAt: Date;
}

const courseVideoSchema = new Schema<CourseVideo>(
    {
        title: { type: String, required: true, trim: true },
        url: { type: String, required: true, trim: true },
        durationMinutes: { type: Number, default: 0 },
        isPreview: { type: Boolean, default: false },
    },
    { _id: false }
);

const courseResourceSchema = new Schema<CourseResource>(
    {
        title: { type: String, required: true, trim: true },
        url: { type: String, required: true, trim: true },
        type: { type: String, default: 'download' },
        description: { type: String, default: '' },
    },
    { _id: false }
);

const courseModuleSchema = new Schema<CourseModule>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        order: { type: Number, default: 0 },
        durationMinutes: { type: Number, default: 0 },
        videos: { type: [courseVideoSchema], default: [] },
        resources: { type: [courseResourceSchema], default: [] },
    },
    { _id: false }
);

const courseSchema = new Schema<CourseDocument>(
    {
        slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
        title: { type: String, required: true, trim: true },
        tagline: { type: String, required: true, trim: true },
        level: { type: String, required: true, enum: ['beginner', 'intermediate'] },
        pillarSlug: { type: String, required: true, trim: true },
        pillarLabel: { type: String, required: true, trim: true },
        coverImage: { type: String, required: true, trim: true },
        durationMinutes: { type: Number, required: true },
        durationLabel: { type: String, required: true, enum: ['short', 'medium', 'long'] },
        modulesCount: { type: Number, default: 3 },
        hasIntro: { type: Boolean, default: true },
        hasConclusion: { type: Boolean, default: true },
        priceEUR: { type: Number, default: 0 },
        isMini: { type: Boolean, default: false },
        status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
        summary: { type: String, default: '' },
        videos: { type: [courseVideoSchema], default: [] },
        resources: { type: [courseResourceSchema], default: [] },
        modules: { type: [courseModuleSchema], default: [] },
    },
    { timestamps: true }
);

export const Course: Model<CourseDocument> = models.Course || model<CourseDocument>('Course', courseSchema);
