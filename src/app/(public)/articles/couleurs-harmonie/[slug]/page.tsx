// src/app/(public)/articles/couleurs-harmonie/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { COLOR_GUIDES, getColorGuideBySlug } from '@/lib/content/couleurs-harmonie';
import { ColorGuideLayout } from '@/components/articles/couleurs-harmonie/ColorGuideLayout';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return COLOR_GUIDES.map((article) => ({ slug: article.slug }));
}

export default async function ColorGuideArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getColorGuideBySlug(slug);

    if (!article || article.format !== 'color-guide' || article.pillar !== 'couleurs-harmonie') {
        return notFound();
    }

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                <ColorGuideLayout article={article} />
            </div>
        </section>
    );
}
