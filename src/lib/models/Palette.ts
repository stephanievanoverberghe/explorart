// src/lib/models/Palette.ts
import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface PaletteDocument extends Document {
    name: string;
    description?: string;
    colors: string[];
    createdAt: Date;
    updatedAt: Date;
}

const paletteSchema = new Schema<PaletteDocument>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        colors: { type: [String], default: [] },
    },
    { timestamps: true }
);

export const Palette: Model<PaletteDocument> = models.Palette || model<PaletteDocument>('Palette', paletteSchema);
