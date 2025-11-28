// src/app/(public)/articles/histoire-de-l-art/page.tsx
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { ArticlesExplorer } from '@/components/articles/common/ArticlesExplorer';
import { ArticlesListHero } from '@/components/articles/common/ArticlesListHero';

export default function ArtHistoryListPage() {
    const artHistoryPosts = ALL_ARTICLES.filter((post) => post.format === 'art-history' && post.pillarSlug === 'histoire-de-l-art');

    return (
        <section className="container-page py-10 space-y-8">
            <ArticlesListHero
                pillarSlug="histoire-de-l-art"
                formatLabel="Repères d’histoire de l’art"
                title="Traverser les grandes périodes sans se perdre"
                description="Des articles courts, clairs et sensibles pour comprendre les grandes périodes, styles et mouvements sans tableau noir ni frise indigeste."
            />

            <ArticlesExplorer posts={artHistoryPosts} pillarSlug="histoire-de-l-art" />
        </section>
    );
}
