// src/app/(public)/articles/tutoriels/page.tsx
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { pillarConfig } from '@/components/categories/category-data';
import { ArticleRelatedGrid } from '@/components/articles/common/ArticleRelatedGrid';
import Link from 'next/link';

export default function TutorielsListPage() {
    // Tous les tutoriels du pilier Dessin & Peinture
    const tutorials = ALL_ARTICLES.filter((post) => post.format === 'tutorial' && post.pillarSlug === 'dessin-peinture');

    const pillar = pillarConfig['dessin-peinture'];

    return (
        <section className="container-page py-10 space-y-8">
            {/* 🧭 FIL D’ARIANE */}
            <nav className="text-xs text-main/60 flex items-center gap-1">
                <Link href="/" className="hover:underline">
                    Accueil
                </Link>
                <span>›</span>
                <Link href="/articles" className="hover:underline">
                    Articles
                </Link>
                <span>›</span>
                <span className="text-main/80">Tutoriels</span>
            </nav>

            {/* HEADER ÉPURÉ */}
            <header className="space-y-2">
                <p className="section-label section-label-vert">Tutoriels</p>

                <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">Exercices & gestes fondamentaux</h1>

                <p className="max-w-2xl text-sm md:text-[0.95rem] text-main/70">
                    Une sélection de tutoriels doux et progressifs pour apprivoiser le trait, libérer la main et développer un geste plus fluide.
                </p>
            </header>

            {/* GRID — mêmes cards haute qualité que CategoryPage + RelatedGrid */}
            <ArticleRelatedGrid
                pillar={pillar}
                posts={tutorials}
                title="Tous les tutoriels"
                description="Les exercices les plus utiles pour libérer ta main, étape par étape."
                hrefBase="/articles/tutoriels"
            />
        </section>
    );
}
