// src/lib/models/FormationPurchase.ts
import { Schema, model, models, type Document, type Model, Types } from 'mongoose';

export interface FormationPurchaseDocument extends Document {
    userId: Types.ObjectId;
    formationSlug: string;
    formationTitle: string;
    amountTotal: number;
    currency: string;
    stripeSessionId: string;
    stripePaymentIntentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const formationPurchaseSchema = new Schema<FormationPurchaseDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        formationSlug: { type: String, required: true },
        formationTitle: { type: String, required: true },
        amountTotal: { type: Number, required: true },
        currency: { type: String, required: true, default: 'eur' },
        stripeSessionId: { type: String, required: true, unique: true },
        stripePaymentIntentId: { type: String },
    },
    { timestamps: true }
);

formationPurchaseSchema.index({ userId: 1, formationSlug: 1 }, { unique: true });

export const FormationPurchase: Model<FormationPurchaseDocument> = models.FormationPurchase || model<FormationPurchaseDocument>('FormationPurchase', formationPurchaseSchema);
