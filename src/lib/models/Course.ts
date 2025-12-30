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

export interface CourseReviewSection {
    text: string;
}

export interface CourseReviewModule {
    order: number;
    title: string;
    content: string;
}

export interface CourseReviewContent {
    slug: string;
    intro?: CourseReviewSection;
    modules: CourseReviewModule[];
    conclusion?: CourseReviewSection;
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

export interface CourseContentIntro {
    text: string;
}

export interface CourseContentModule {
    title: string;
    content: string;
    order: number;
}

export interface CourseContentConclusion {
    text: string;
}

export interface CourseContent {
    intro?: CourseContentIntro;
    modules?: CourseContentModule[];
    conclusion?: CourseContentConclusion;
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
    content?: CourseContent;
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

const courseContentModuleSchema = new Schema<CourseContentModule>(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, default: '' },
        order: { type: Number, default: 0 },
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
        content: {
            intro: { text: { type: String, default: '' } },
            modules: { type: [courseContentModuleSchema], default: [] },
            conclusion: { text: { type: String, default: '' } },
        },
    },
    { timestamps: true }
);

export const Course: Model<CourseDocument> = models.Course || model<CourseDocument>('Course', courseSchema);
