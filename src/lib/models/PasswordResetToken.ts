// src/lib/models/PasswordResetToken.ts
import { Schema, model, models, type Document, type Model, type Types } from 'mongoose';

export interface PasswordResetTokenDocument extends Document {
    userId: Types.ObjectId;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const passwordResetTokenSchema = new Schema<PasswordResetTokenDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        tokenHash: { type: String, required: true, unique: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PasswordResetToken: Model<PasswordResetTokenDocument> = models.PasswordResetToken || model<PasswordResetTokenDocument>('PasswordResetToken', passwordResetTokenSchema);
