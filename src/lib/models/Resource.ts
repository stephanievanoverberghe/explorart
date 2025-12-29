// src/lib/models/Resource.ts
import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface ResourceDocument extends Document {
    title: string;
    description?: string;
    fileUrl: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

const resourceSchema = new Schema<ResourceDocument>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        fileUrl: { type: String, required: true, trim: true },
        type: { type: String, default: 'download' },
    },
    { timestamps: true }
);

export const Resource: Model<ResourceDocument> = models.Resource || model<ResourceDocument>('Resource', resourceSchema);
