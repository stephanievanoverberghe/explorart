// src/app/(public)/articles/histoires-d-artistes/page.tsx
import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { TutorialsExplorer } from '@/components/articles/tutorials/TutorialsExplorer';

export default function ArtistStoriesListPage() {
    const stories = ALL_ARTICLES.filter((post) => post.format === 'artist-story' && post.pillarSlug === 'histoires-d-artistes');

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
                <span className="text-main/80">Histoires d’artistes</span>
            </nav>

            {/* HEADER */}
            <header className="space-y-2">
                <p className="section-label section-label-terre">Histoires d’artistes</p>

                <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">Récits d’ateliers, de vies cabossées et de chemins créatifs</h1>

                <p className="max-w-2xl text-sm md:text-[0.95rem] text-main/70">
                    Des portraits sensibles, des ateliers silencieux, des chemins tardifs… Des histoires humaines pour voir les artistes autrement que sur un piédestal.
                </p>
            </header>

            {/* EXPLORATION + FILTRES + GRID */}
            {/* Pour l’instant on réutilise TutorialsExplorer (il prend un tableau de CategoryPost) */}
            <TutorialsExplorer tutorials={stories} />
        </section>
    );
}
