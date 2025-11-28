// src/app/(public)/articles/histoire-de-l-art/page.tsx
import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { TutorialsExplorer } from '@/components/articles/tutorials/TutorialsExplorer'; // générique sur CategoryPost[]

export default function ArtHistoryListPage() {
    const artHistoryPosts = ALL_ARTICLES.filter((post) => post.format === 'art-history' && post.pillarSlug === 'histoire-de-l-art');

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
                <span className="text-main/80">Histoire de l’art</span>
            </nav>

            {/* HEADER */}
            <header className="space-y-2">
                <p className="section-label section-label-ocre">Histoire de l’art</p>

                <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">Traverser les grandes périodes sans se perdre</h1>

                <p className="max-w-2xl text-sm md:text-[0.95rem] text-main/70">
                    Des articles courts, clairs et sensibles pour comprendre les grandes périodes, styles et mouvements sans tableau noir ni frise indigeste.
                </p>
            </header>

            {/* GRID / EXPLORATION */}
            <TutorialsExplorer tutorials={artHistoryPosts} />
        </section>
    );
}
