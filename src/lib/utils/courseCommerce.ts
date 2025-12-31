import type { CourseCommerceData, CoursePromotionData, CoursePricingData } from '@/types/courseCommerce';

function isPromoActive(promo: CoursePromotionData, now: Date) {
    if (!promo.isActive) return false;
    const startsAt = promo.startsAt ? new Date(promo.startsAt) : null;
    const endsAt = promo.endsAt ? new Date(promo.endsAt) : null;

    if (startsAt && now < startsAt) return false;
    if (endsAt && now > endsAt) return false;
    return true;
}

export function computeEffectivePrice(pricing: CoursePricingData, promotions: CoursePromotionData[], now = new Date()) {
    if (pricing.isFree || pricing.basePrice <= 0) {
        return { effectivePrice: 0, promoLabel: undefined };
    }

    const activePromotion = promotions.find((promo) => isPromoActive(promo, now));
    if (!activePromotion) {
        return { effectivePrice: pricing.basePrice, promoLabel: undefined };
    }

    const base = pricing.basePrice;
    const reduction = activePromotion.type === 'percentage' ? Math.round((base * activePromotion.value) / 100) : Math.round(activePromotion.value);
    const effectivePrice = Math.max(0, base - reduction);

    const promoLabel = activePromotion.type === 'percentage' ? `-${activePromotion.value}%` : `-${activePromotion.value}€`;

    return { effectivePrice, promoLabel };
}

export function computeCommerce(data: CourseCommerceData, now = new Date()): CourseCommerceData {
    const computed = computeEffectivePrice(data.pricing, data.promotions, now);
    return {
        ...data,
        computed: {
            effectivePrice: computed.effectivePrice,
            promoLabel: computed.promoLabel,
        },
    };
}
