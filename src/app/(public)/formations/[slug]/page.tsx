import { notFound } from 'next/navigation';
import { FORMATIONS } from '@/lib/content/formations';
import { levelLabels } from '@/components/categories/category-data';
import { FormationDetail } from '@/components/formations/FormationDetail';

interface FormationPageProps {
    params: { slug: string | string[] };
}

function normalizeSlug(raw: string | string[]) {
    const slug = Array.isArray(raw) ? raw[0] : raw;
    return decodeURIComponent(slug).trim().toLowerCase();
}

export default function FormationPage({ params }: FormationPageProps) {
    const normalizedSlug = normalizeSlug(params.slug);

    const formation = FORMATIONS.find((f) => f.slug.toLowerCase() === normalizedSlug);
    if (!formation) {
        notFound();
    }

    const levelLabel = levelLabels[formation.level];
    const priceLabel = `${formation.priceEUR.toString().replace('.', ',')} €`;

    return <FormationDetail formation={formation} levelLabel={levelLabel} priceLabel={priceLabel} />;
}
