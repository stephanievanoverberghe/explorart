// src/lib/models/Purchase.ts
import { Schema, model, models, type Document, type Model, Types } from 'mongoose';

export interface CoursePurchaseDocument extends Document {
    userId: Types.ObjectId;
    courseSlug: string;
    courseTitle: string;
    amountTotal: number;
    currency: string;
    stripeSessionId: string;
    stripePaymentIntentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const coursePurchaseSchema = new Schema<CoursePurchaseDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        courseSlug: { type: String, required: true },
        courseTitle: { type: String, required: true },
        amountTotal: { type: Number, required: true },
        currency: { type: String, required: true, default: 'eur' },
        stripeSessionId: { type: String, required: true, unique: true },
        stripePaymentIntentId: { type: String },
    },
    { timestamps: true }
);

coursePurchaseSchema.index({ userId: 1, courseSlug: 1 }, { unique: true });

export const CoursePurchase: Model<CoursePurchaseDocument> = models.Purchase || model<CoursePurchaseDocument>('Purchase', coursePurchaseSchema);
