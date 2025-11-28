// src/app/(public)/articles/comprendre-une-oeuvre/page.tsx
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { ArticlesExplorer } from '@/components/articles/common/ArticlesExplorer';
import { ArticlesListHero } from '@/components/articles/common/ArticlesListHero';

export default function AnalysesListPage() {
    const analyses = ALL_ARTICLES.filter((post) => post.format === 'artwork-analysis' && post.pillarSlug === 'comprendre-une-oeuvre');

    return (
        <section className="container-page py-10 space-y-8">
            <ArticlesListHero
                pillarSlug="comprendre-une-oeuvre"
                formatLabel="Parcours d’analyse"
                title="Lire un tableau sans se sentir bête"
                description="Analyses guidées, simples et sensibles, pour apprendre à lire un tableau par étapes plutôt que chercher “la bonne réponse”."
            />

            <ArticlesExplorer posts={analyses} pillarSlug="comprendre-une-oeuvre" />
        </section>
    );
}
