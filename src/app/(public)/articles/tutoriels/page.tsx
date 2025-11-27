// src/app/(public)/articles/tutoriels/page.tsx
import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { TutorialsExplorer } from '@/components/articles/tutorials/TutorialsExplorer';

export default function TutorielsListPage() {
    const tutorials = ALL_ARTICLES.filter((post) => post.format === 'tutorial' && post.pillarSlug === 'dessin-peinture');

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

            {/* HEADER */}
            <header className="space-y-2">
                <p className="section-label section-label-vert">Tutoriels</p>

                <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">Exercices & gestes fondamentaux</h1>

                <p className="max-w-2xl text-sm md:text-[0.95rem] text-main/70">
                    Une sélection de tutoriels doux et progressifs pour apprivoiser le trait, libérer la main et développer un geste plus fluide.
                </p>
            </header>

            {/* EXPLORATION + FILTRES + GRID */}
            <TutorialsExplorer tutorials={tutorials} />
        </section>
    );
}
