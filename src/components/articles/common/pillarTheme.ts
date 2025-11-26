import type { PillarKey } from '@/types/article';

export function getPillarTheme(pillar: PillarKey) {
    switch (pillar) {
        case 'dessin-peinture':
            return {
                label: 'Dessiner & Peindre',
                borderClass: 'border-vert/60',
                bgClass: 'bg-vert/5',
                badgeClass: 'badge-vert',
                sectionLabelClass: 'section-label-vert',
                ctaPrimaryClass: 'border-vert bg-vert text-ivory hover:bg-vert/80',
                ctaSecondaryClass: 'bg-vert/5 border-vert/60 text-vert hover:bg-vert/10',
            };

        case 'couleurs-harmonie':
            return {
                label: 'Couleurs & harmonie',
                borderClass: 'border-sage/60',
                bgClass: 'bg-sage/5',
                badgeClass: 'badge-sage',
                sectionLabelClass: 'section-label-sage',
                ctaPrimaryClass: 'border-sage bg-sage text-ivory hover:bg-sage/80',
                ctaSecondaryClass: 'bg-sage/5 border-sage/60 text-sage hover:bg-sage/10',
            };

        case 'histoire-art':
            return {
                label: 'Histoire de l’art',
                borderClass: 'border-ocre/60',
                bgClass: 'bg-ocre/5',
                badgeClass: 'badge-ocre',
                sectionLabelClass: 'section-label-ocre',
                ctaPrimaryClass: 'border-ocre bg-ocre text-ivory hover:bg-ocre/80',
                ctaSecondaryClass: 'bg-ocre/5 border-ocre/60 text-ocre hover:bg-ocre/10',
            };

        case 'histoires-artistes':
            return {
                label: "Histoires d'artistes",
                borderClass: 'border-terre/60',
                bgClass: 'bg-terre/5',
                badgeClass: 'badge-terre',
                sectionLabelClass: 'section-label-terre',
                ctaPrimaryClass: 'border-terre bg-terre text-ivory hover:bg-terre/80',
                ctaSecondaryClass: 'bg-terre/5 border-terre/60 text-terre hover:bg-terre/10',
            };

        case 'inspirations':
            return {
                label: 'Inspirations',
                borderClass: 'border-rose/60',
                bgClass: 'bg-rose/5',
                badgeClass: 'badge-rose',
                sectionLabelClass: 'section-label-rose',
                ctaPrimaryClass: 'border-rose bg-rose text-ivory hover:bg-rose/80',
                ctaSecondaryClass: 'bg-rose/5 border-rose/60 text-rose hover:bg-rose/10',
            };

        case 'comprendre-une-oeuvre':
            return {
                label: 'Comprendre une œuvre',
                borderClass: 'border-bleu/60',
                bgClass: 'bg-bleu/5',
                badgeClass: 'badge-bleu',
                sectionLabelClass: 'section-label-bleu',
                ctaPrimaryClass: 'border-bleu bg-bleu text-ivory hover:bg-bleu/80',
                ctaSecondaryClass: 'bg-bleu/5 border-bleu/60 text-bleu hover:bg-bleu/10',
            };

        case 'psychologie-art':
            return {
                label: 'Psychologie de l’art',
                borderClass: 'border-prune/60',
                bgClass: 'bg-prune/5',
                badgeClass: 'badge-prune',
                sectionLabelClass: 'section-label-prune',
                ctaPrimaryClass: 'border-prune bg-prune text-ivory hover:bg-prune/80',
                ctaSecondaryClass: 'bg-prune/5 border-prune/60 text-prune hover:bg-prune/10',
            };

        default:
            return {
                label: 'Explor’Art',
                borderClass: 'border-sage/60',
                bgClass: 'bg-sage/5',
                badgeClass: 'badge-sage',
                sectionLabelClass: 'section-label-sage',
                ctaPrimaryClass: 'border-sage bg-sage text-ivory hover:bg-sage/80',
                ctaSecondaryClass: 'bg-sage/5 border-sage/60 text-sage hover:bg-sage/10',
            };
    }
}
