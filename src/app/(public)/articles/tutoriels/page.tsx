// src/app/(public)/articles/tutoriels/page.tsx
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { ArticlesExplorer } from '@/components/articles/common/ArticlesExplorer';
import { ArticlesListHero } from '@/components/articles/common/ArticlesListHero';

export default function TutorielsListPage() {
    const tutorials = ALL_ARTICLES.filter((post) => post.format === 'tutorial' && post.pillarSlug === 'dessin-peinture');

    return (
        <section className="container-page py-10 space-y-8">
            <ArticlesListHero
                pillarSlug="dessin-peinture"
                formatLabel="Tutoriels & exercices"
                title="Exercices & gestes fondamentaux"
                description="Une sélection de tutoriels doux et progressifs pour apprivoiser le trait, libérer la main et développer un geste plus fluide."
            />

            <ArticlesExplorer posts={tutorials} pillarSlug="dessin-peinture" />
        </section>
    );
}
