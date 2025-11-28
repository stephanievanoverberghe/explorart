// src/app/(public)/articles/inspirations/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { INSPIRATION_ARTICLES, getInspirationBySlug } from '@/lib/content/inspirations';
import { InspirationsLayout } from '@/components/articles/inspirations/InspirationsLayout';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return INSPIRATION_ARTICLES.map((article) => ({ slug: article.slug }));
}

export default async function InspirationArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getInspirationBySlug(slug);

    if (!article || article.format !== 'inspiration' || article.pillar !== 'inspirations') {
        return notFound();
    }

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                <InspirationsLayout article={article} />
            </div>
        </section>
    );
}
