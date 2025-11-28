// src/app/(public)/articles/histoire-de-l-art/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { ART_HISTORY_ARTICLES, getArtHistoryBySlug } from '@/lib/content/histoire-art';
import { ArtHistoryLayout } from '@/components/articles/histoire-art/ArtHistoryLayout';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return ART_HISTORY_ARTICLES.map((article) => ({ slug: article.slug }));
}

export default async function ArtHistoryArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArtHistoryBySlug(slug);

    if (!article || article.format !== 'art-history' || article.pillar !== 'histoire-de-l-art') {
        return notFound();
    }

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                <ArtHistoryLayout article={article} />
            </div>
        </section>
    );
}
