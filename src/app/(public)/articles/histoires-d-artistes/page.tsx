// src/app/(public)/articles/histoires-d-artistes/page.tsx
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { ArticlesExplorer } from '@/components/articles/common/ArticlesExplorer';
import { ArticlesListHero } from '@/components/articles/common/ArticlesListHero';

export default function ArtistStoriesListPage() {
    const stories = ALL_ARTICLES.filter((post) => post.format === 'artist-story' && post.pillarSlug === 'histoires-d-artistes');

    return (
        <section className="container-page py-10 space-y-8">
            <ArticlesListHero
                pillarSlug="histoires-d-artistes"
                formatLabel="Récits & portraits d’artistes"
                title="Récits d’ateliers, de vies cabossées et de chemins créatifs"
                description="Des portraits sensibles, des ateliers silencieux, des chemins tardifs… Des histoires humaines pour voir les artistes autrement que sur un piédestal."
            />

            <ArticlesExplorer posts={stories} pillarSlug="histoires-d-artistes" />
        </section>
    );
}
