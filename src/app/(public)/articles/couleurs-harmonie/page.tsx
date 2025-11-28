// src/app/(public)/articles/couleurs-harmonie/page.tsx
import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { TutorialsExplorer } from '@/components/articles/tutorials/TutorialsExplorer'; // générique sur CategoryPost[]

export default function ColorGuidesListPage() {
    const colorGuides = ALL_ARTICLES.filter((post) => post.format === 'color-guide' && post.pillarSlug === 'couleurs-harmonie');

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
                <span className="text-main/80">Couleurs & harmonie</span>
            </nav>

            {/* HEADER */}
            <header className="space-y-2">
                <p className="section-label section-label-sage">Couleurs & harmonie</p>

                <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">Jouer avec les couleurs sans se perdre</h1>

                <p className="max-w-2xl text-sm md:text-[0.95rem] text-main/70">
                    Des guides couleurs simples et sensibles pour apprivoiser les palettes, les contrastes et les atmosphères, sans jargon technique.
                </p>
            </header>

            {/* GRID / EXPLORATION */}
            <TutorialsExplorer tutorials={colorGuides} />
        </section>
    );
}
