import { notFound } from 'next/navigation';
import slugify from 'slugify';
import { FORMATIONS } from '@/lib/content/formations';
import { levelLabels } from '@/components/categories/category-data';
import { FormationDetail } from '@/components/formations/FormationDetail';

interface FormationPageProps {
    params: { slug: string | string[] };
}

function normalizeSlug(raw: string | string[]) {
    const slug = Array.isArray(raw) ? raw[0] : raw;
    const decoded = decodeURIComponent(slug).trim();
    return slugify(decoded, { lower: true, strict: true });
}

export default async function FormationPage({ params }: FormationPageProps) {
    const resolvedParams = await params;
    const normalizedSlug = normalizeSlug(resolvedParams.slug);

    const formation = FORMATIONS.find((f) => normalizeSlug(f.slug) === normalizedSlug);
    if (!formation) {
        notFound();
    }

    const levelLabel = levelLabels[formation.level];
    const priceLabel = `${formation.priceEUR.toString().replace('.', ',')} €`;

    return <FormationDetail formation={formation} levelLabel={levelLabel} priceLabel={priceLabel} />;
}
