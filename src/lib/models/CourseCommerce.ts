import { Schema, model, models, type Document, type Model } from 'mongoose';

import type { CourseCommerceData, CourseCouponData, CoursePromotionData, CoursePricingData, CourseStockData } from '@/types/courseCommerce';

export interface CourseCommerceDocument extends Document {
    courseId: string;
    pricing: CoursePricingData;
    promotions: CoursePromotionData[];
    coupons: CourseCouponData[];
    stock: CourseStockData;
    computed: CourseCommerceData['computed'];
    createdAt: Date;
    updatedAt: Date;
}

const pricingSchema = new Schema<CoursePricingData>(
    {
        currency: { type: String, default: 'EUR' },
        basePrice: { type: Number, default: 0 },
        isFree: { type: Boolean, default: true },
        compareAtPrice: { type: Number },
    },
    { _id: false }
);

const promotionSchema = new Schema<CoursePromotionData>(
    {
        type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
        value: { type: Number, default: 0 },
        startsAt: { type: Date },
        endsAt: { type: Date },
        isActive: { type: Boolean, default: false },
    },
    { _id: false }
);

const couponSchema = new Schema<CourseCouponData>(
    {
        code: { type: String, required: true, trim: true },
        type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
        value: { type: Number, default: 0 },
        startsAt: { type: Date },
        endsAt: { type: Date },
        maxRedemptions: { type: Number },
        perUserLimit: { type: Number },
    },
    { _id: false }
);

const stockSchema = new Schema<CourseStockData>(
    {
        isUnlimited: { type: Boolean, default: true },
        quantity: { type: Number },
    },
    { _id: false }
);

const courseCommerceSchema = new Schema<CourseCommerceDocument>(
    {
        courseId: { type: String, required: true, unique: true, index: true },
        pricing: { type: pricingSchema, default: () => ({}) },
        promotions: { type: [promotionSchema], default: [] },
        coupons: { type: [couponSchema], default: [] },
        stock: { type: stockSchema, default: () => ({}) },
        computed: {
            effectivePrice: { type: Number, default: 0 },
            promoLabel: { type: String, default: '' },
        },
    },
    { timestamps: true }
);

export const CourseCommerce: Model<CourseCommerceDocument> = models.CourseCommerce || model<CourseCommerceDocument>('CourseCommerce', courseCommerceSchema);
