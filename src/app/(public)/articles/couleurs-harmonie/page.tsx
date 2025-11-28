// src/app/(public)/articles/couleurs-harmonie/page.tsx
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { ArticlesExplorer } from '@/components/articles/common/ArticlesExplorer';
import { ArticlesListHero } from '@/components/articles/common/ArticlesListHero';

export default function ColorGuidesListPage() {
    const colorGuides = ALL_ARTICLES.filter((post) => post.format === 'color-guide' && post.pillarSlug === 'couleurs-harmonie');

    return (
        <section className="container-page py-10 space-y-8">
            <ArticlesListHero
                pillarSlug="couleurs-harmonie"
                formatLabel="Guides & palettes couleur"
                title="Jouer avec les couleurs sans se perdre"
                description="Des guides couleurs simples et sensibles pour apprivoiser les palettes, les contrastes et les atmosphères, sans jargon technique."
            />

            <ArticlesExplorer posts={colorGuides} pillarSlug="couleurs-harmonie" />
        </section>
    );
}
