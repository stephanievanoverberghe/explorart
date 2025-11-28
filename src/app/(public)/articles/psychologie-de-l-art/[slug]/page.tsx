// src/app/(public)/articles/psychologie-de-l-art/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { ART_PSYCHOLOGY_ARTICLES, getArtPsychologyBySlug } from '@/lib/content/psychologie-art';
import { ArtPsychologyLayout } from '@/components/articles/psychologie-art/ArtPsychologyLayout';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return ART_PSYCHOLOGY_ARTICLES.map((article) => ({ slug: article.slug }));
}

export default async function ArtPsychologyArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArtPsychologyBySlug(slug);

    if (!article || article.format !== 'art-psychology' || article.pillar !== 'psychologie-de-l-art') {
        return notFound();
    }

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                <ArtPsychologyLayout article={article} />
            </div>
        </section>
    );
}
