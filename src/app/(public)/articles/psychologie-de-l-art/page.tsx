// src/app/(public)/articles/psychologie-de-l-art/page.tsx
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { ArticlesExplorer } from '@/components/articles/common/ArticlesExplorer';
import { ArticlesListHero } from '@/components/articles/common/ArticlesListHero';

export default function ArtPsychologyListPage() {
    const artPsychologyPosts = ALL_ARTICLES.filter((post) => post.format === 'art-psychology' && post.pillarSlug === 'psychologie-de-l-art');

    return (
        <section className="container-page py-10 space-y-8">
            <ArticlesListHero
                pillarSlug="psychologie-de-l-art"
                formatLabel="Regards sur la psychologie de l’art"
                title="Comprendre ce qui se joue dedans"
                description="Peur de se lancer, perfectionnisme, blocages créatifs… des articles pour mettre des mots doux sur ce que tu vis, et trouver des pistes concrètes pour créer plus sereinement."
            />

            <ArticlesExplorer posts={artPsychologyPosts} pillarSlug="psychologie-de-l-art" />
        </section>
    );
}
