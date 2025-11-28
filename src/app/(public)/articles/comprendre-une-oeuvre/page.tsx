// src/app/(public)/articles/comprendre-une-oeuvre/page.tsx
import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { TutorialsExplorer } from '@/components/articles/tutorials/TutorialsExplorer';

export default function AnalysesListPage() {
    const analyses = ALL_ARTICLES.filter((post) => post.format === 'artwork-analysis' && post.pillarSlug === 'comprendre-une-oeuvre');

    return (
        <section className="container-page py-10 space-y-8">
            {/* fil d’Ariane */}
            <nav className="text-xs text-main/60 flex items-center gap-1">
                <Link href="/" className="hover:underline">
                    Accueil
                </Link>
                <span>›</span>
                <Link href="/articles" className="hover:underline">
                    Articles
                </Link>
                <span>›</span>
                <span className="text-main/80">Comprendre une œuvre</span>
            </nav>

            {/* HEADER */}
            <header className="space-y-2">
                <p className="section-label section-label-bleu">Comprendre une œuvre</p>
                <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">Lire un tableau sans se sentir bête</h1>
                <p className="max-w-2xl text-sm md:text-[0.95rem] text-main/70">
                    Analyses guidées, simples et sensibles, pour apprendre à lire un tableau par étapes plutôt que chercher “la bonne réponse”.
                </p>
            </header>

            <TutorialsExplorer tutorials={analyses} />
        </section>
    );
}
