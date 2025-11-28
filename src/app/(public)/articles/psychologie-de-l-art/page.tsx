// src/app/(public)/articles/psychologie-de-l-art/page.tsx
import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { TutorialsExplorer } from '@/components/articles/tutorials/TutorialsExplorer';

export default function ArtPsychologyListPage() {
    const artPsychologyPosts = ALL_ARTICLES.filter((post) => post.format === 'art-psychology' && post.pillarSlug === 'psychologie-de-l-art');

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
                <span className="text-main/80">Psychologie de l’art</span>
            </nav>

            {/* HEADER */}
            <header className="space-y-2">
                <p className="section-label section-label-prune">Psychologie de l’art</p>

                <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">Comprendre ce qui se joue dedans</h1>

                <p className="max-w-2xl text-sm md:text-[0.95rem] text-main/70">
                    Peur de se lancer, perfectionnisme, blocages créatifs… des articles pour mettre des mots doux sur ce que tu vis, et trouver des pistes concrètes pour créer plus
                    sereinement.
                </p>
            </header>

            {/* GRID / EXPLORATION */}
            <TutorialsExplorer tutorials={artPsychologyPosts} />
        </section>
    );
}
