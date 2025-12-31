import { Schema, model, models } from 'mongoose';

const CourseIntroSchema = new Schema(
    {
        badgeLabel: { type: String },
        title: { type: String, required: true },
        description: { type: String },
        video: {
            title: { type: String },
            description: { type: String },
            note: { type: String },
            youtubeId: { type: String },
            cover: { type: String },
        },
        whatYouWillExperience: {
            title: { type: String },
            items: { type: [String], default: [] },
        },
        whoItsFor: {
            title: { type: String },
            items: { type: [String], default: [] },
        },
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
        howToFollow: {
            title: { type: String },
            items: { type: [String], default: [] },
        },
        material: {
            title: { type: String },
            items: { type: [String], default: [] },
            note: { type: String },
            highlighted: { type: Boolean, default: true },
        },
        notes: { type: String },
    },
    { _id: false }
);

const CourseContentSchema = new Schema(
    {
        courseId: { type: String, required: true, unique: true, index: true },
        intro: { type: CourseIntroSchema },
    },
    { timestamps: true }
);

export const CourseContent = models.CourseContent || model('CourseContent', CourseContentSchema);
