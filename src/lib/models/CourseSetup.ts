import { Schema, model, models, type Document, type Model } from 'mongoose';

import type {
    CourseAccessData,
    CourseIdentityData,
    CourseIntentData,
    CourseModuleData,
    CoursePricingData,
    CoursePublishData,
    CourseResourcesData,
    CourseStructureData,
} from '@/types/courseSetup';

export interface CourseSetupDocument extends Document {
    courseId: string;
    identity: CourseIdentityData;
    intent: CourseIntentData;
    structure: CourseStructureData;
    access: CourseAccessData;
    pricing: CoursePricingData;
    resources: CourseResourcesData;
    publish: CoursePublishData;
    createdAt: Date;
    updatedAt: Date;
}

const courseModuleSchema = new Schema<CourseModuleData>(
    {
        id: { type: String, required: true },
        title: { type: String, required: true, trim: true },
        goal: { type: String, required: true, trim: true },
        minutes: { type: Number, required: true },
    },
    { _id: false }
);

const courseResourceSchema = new Schema(
    {
        id: { type: String, required: true },
        title: { type: String, required: true, trim: true },
        format: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const courseSetupSchema = new Schema<CourseSetupDocument>(
    {
        courseId: { type: String, required: true, index: true, unique: true },
        identity: {
            title: { type: String, default: '' },
            pillar: { type: String, default: 'dessin-peinture' },
            level: { type: String, default: 'Débutant' },
            access: { type: String, default: 'free' },
            pinned: { type: Boolean, default: false },
        },
        intent: {
            promise: { type: String, default: '' },
            outcomes: { type: [String], default: [] },
            audience: { type: String, default: '' },
            notFor: { type: String, default: '' },
            prerequisites: { type: String, default: '' },
            teachingStyle: { type: String, default: 'guided' },
            tone: { type: String, default: 'soft' },
        },
        structure: {
            introMinutes: { type: Number, default: 5 },
            conclusionMinutes: { type: Number, default: 5 },
            modules: { type: [courseModuleSchema], default: [] },
        },
        access: {
            access: { type: String, default: 'free' },
            hasFreePreview: { type: Boolean, default: true },
            requiresAccount: { type: Boolean, default: false },
        },
        pricing: {
            pricingModel: { type: String, default: 'one_off' },
            price: { type: Number, default: 29 },
            promoPrice: { type: String, default: '' },
            taxIncluded: { type: Boolean, default: true },
        },
        resources: {
            videoIntro: { type: Boolean, default: true },
            videoModules: { type: Boolean, default: true },
            videoConclusion: { type: Boolean, default: true },
            resources: { type: [courseResourceSchema], default: [] },
        },
        publish: {
            status: { type: String, default: 'draft' },
            listed: { type: Boolean, default: true },
        },
    },
    { timestamps: true }
);

export const CourseSetup: Model<CourseSetupDocument> = models.CourseSetup || model<CourseSetupDocument>('CourseSetup', courseSetupSchema);
