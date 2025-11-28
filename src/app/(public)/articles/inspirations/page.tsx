// src/app/(public)/articles/inspirations/page.tsx
import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { TutorialsExplorer } from '@/components/articles/tutorials/TutorialsExplorer'; // générique sur CategoryPost[]

export default function InspirationsListPage() {
    const inspirationPosts = ALL_ARTICLES.filter((post) => post.format === 'inspiration' && post.pillarSlug === 'inspirations');

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
                <span className="text-main/80">Inspirations</span>
            </nav>

            {/* HEADER */}
            <header className="space-y-2">
                <p className="section-label section-label-rose">Inspirations</p>

                <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">Nourrir ton regard sans pression</h1>

                <p className="max-w-2xl text-sm md:text-[0.95rem] text-main/70">
                    Des rituels, des ambiances et des petites bibliothèques d’images pour garder ton regard vivant, même les jours où tu ne dessines pas.
                </p>
            </header>

            {/* GRID / EXPLORATION */}
            <TutorialsExplorer tutorials={inspirationPosts} />
        </section>
    );
}
