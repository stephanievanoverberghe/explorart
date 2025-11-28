// src/app/(public)/articles/comprendre-une-oeuvre/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { ANALYSES, getAnalysisBySlug } from '@/lib/content/analyse-oeuvres';
import { ArtworkAnalysisLayout } from '@/components/articles/analyses/ArtworkAnalysisLayout';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return ANALYSES.map((article) => ({ slug: article.slug }));
}

export default async function ArtworkAnalysisPage({ params }: PageProps) {
    const { slug } = await params;
    const article = getAnalysisBySlug(slug);

    if (!article || article.format !== 'artwork-analysis') {
        return notFound();
    }

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                <ArtworkAnalysisLayout article={article} />
            </div>
        </section>
    );
}
