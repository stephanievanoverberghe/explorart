import { Schema, model, models } from 'mongoose';

const CourseVideoSchema = new Schema(
    {
        title: { type: String },
        description: { type: String },
        note: { type: String },
        youtubeId: { type: String },
        cover: { type: String },
    },
    { _id: false }
);

const CourseSectionListSchema = new Schema(
    {
        title: { type: String },
        items: { type: [String], default: [] },
    },
    { _id: false }
);

const CourseMaterialSchema = new Schema(
    {
        title: { type: String },
        items: { type: [String], default: [] },
        note: { type: String },
        highlighted: { type: Boolean, default: true },
    },
    { _id: false }
);

const CourseIntroSchema = new Schema(
    {
        video: { type: CourseVideoSchema },
        whatYouWillExperience: { type: CourseSectionListSchema },
        whoItsFor: { type: CourseSectionListSchema },
        downloads: {
            type: [
                {
                    label: { type: String },
                    description: { type: String },
                    href: { type: String },
                },
            ],
            default: [],
        },
        howToFollow: { type: CourseSectionListSchema },
        material: { type: CourseMaterialSchema },
        notes: { type: String },
    },
    { _id: false }
);

const CourseModuleSchema = new Schema(
    {
        badgeLabel: { type: String },
        title: { type: String },
        description: { type: String },
        video: { type: CourseVideoSchema },
        material: { type: CourseMaterialSchema },
        intention: { type: CourseSectionListSchema },
        exercise: {
            title: { type: String },
            description: { type: String },
            steps: { type: [String], default: [] },
        },
        extraSections: {
            type: [
                {
                    title: { type: String },
                    description: { type: String },
                    items: { type: [String], default: [] },
                },
            ],
            default: [],
        },
    },
    { _id: false }
);

const CourseConclusionSchema = new Schema(
    {
        badgeLabel: { type: String },
        title: { type: String, required: true },
        description: { type: String },
        video: { type: CourseVideoSchema },
        quickReview: { type: CourseSectionListSchema },
        personalPrompt: {
            title: { type: String },
            description: { type: String },
        },
        softReminder: {
            title: { type: String },
            description: { type: String },
        },
        continueAfter: { type: CourseSectionListSchema },
        links: {
            type: [
                {
                    label: { type: String },
                    description: { type: String },
                    href: { type: String },
                },
            ],
            default: [],
        },
    },
    { _id: false }
);

const CourseContentSchema = new Schema(
    {
        courseId: { type: String, required: true, unique: true, index: true },
        intro: { type: CourseIntroSchema },
        modules: { type: Map, of: CourseModuleSchema, default: {} },
        conclusion: { type: CourseConclusionSchema },
        contentStatus: { type: String, enum: ['draft', 'published'], default: 'draft' },
        contentPublishedAt: { type: Date },
    },
    { timestamps: true }
);

export const CourseContent = models.CourseContent || model('CourseContent', CourseContentSchema);
