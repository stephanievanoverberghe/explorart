// src/lib/models/Purchase.ts
import { Schema, model, models, type Document, type Model, Types } from 'mongoose';

export interface PurchaseDocument extends Document {
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

const purchaseSchema = new Schema<PurchaseDocument>(
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

purchaseSchema.index({ userId: 1, courseSlug: 1 }, { unique: true });

export const Purchase: Model<PurchaseDocument> = models.Purchase || model<PurchaseDocument>('Purchase', purchaseSchema);
