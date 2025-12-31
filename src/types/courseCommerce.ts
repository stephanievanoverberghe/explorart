export type CurrencyCode = 'EUR' | 'USD';

export type PromotionType = 'percentage' | 'fixed';

export interface CoursePricingData {
    currency: CurrencyCode;
    basePrice: number;
    isFree: boolean;
    compareAtPrice?: number;
}

export interface CoursePromotionData {
    type: PromotionType;
    value: number;
    startsAt?: string;
    endsAt?: string;
    isActive: boolean;
}

export interface CourseCouponData {
    code: string;
    type: PromotionType;
    value: number;
    startsAt?: string;
    endsAt?: string;
    maxRedemptions?: number;
    perUserLimit?: number;
}

export interface CourseStockData {
    isUnlimited: boolean;
    quantity?: number;
}

export interface CourseCommerceComputed {
    effectivePrice: number;
    promoLabel?: string;
}

export interface CourseCommerceData {
    courseId: string;
    pricing: CoursePricingData;
    promotions: CoursePromotionData[];
    coupons: CourseCouponData[];
    stock: CourseStockData;
    computed: CourseCommerceComputed;
    updatedAt?: string;
}
