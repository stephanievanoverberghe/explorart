// src/app/(public)/articles/histoires-d-artistes/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { ARTIST_STORIES, getArtistStoryBySlug } from '@/lib/content/histoires-d-artistes';
import { ArtistStoryLayout } from '@/components/articles/histoires/ArtistStoryLayout';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return ARTIST_STORIES.map((story) => ({ slug: story.slug }));
}

export default async function ArtistStoryPage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArtistStoryBySlug(slug);

    if (!article || article.format !== 'artist-story' || article.pillar !== 'histoires-d-artistes') {
        return notFound();
    }

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                <ArtistStoryLayout article={article} />
            </div>
        </section>
    );
}
