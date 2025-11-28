// src/app/(public)/articles/inspirations/page.tsx
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { ArticlesExplorer } from '@/components/articles/common/ArticlesExplorer';
import { ArticlesListHero } from '@/components/articles/common/ArticlesListHero';

export default function InspirationsListPage() {
    const inspirationPosts = ALL_ARTICLES.filter((post) => post.format === 'inspiration' && post.pillarSlug === 'inspirations');

    return (
        <section className="container-page py-10 space-y-8">
            <ArticlesListHero
                pillarSlug="inspirations"
                formatLabel="Carnets d’inspiration"
                title="Nourrir ton regard sans pression"
                description="Des rituels, des ambiances et des petites bibliothèques d’images pour garder ton regard vivant, même les jours où tu ne dessines pas."
            />

            <ArticlesExplorer posts={inspirationPosts} pillarSlug="inspirations" />
        </section>
    );
}
