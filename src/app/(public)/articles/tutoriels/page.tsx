// src/app/(public)/articles/tutoriels/page.tsx
import Link from 'next/link';
import { TUTORIALS } from '@/lib/content/tutorials';

export default function TutorielsListPage() {
    const tutorials = TUTORIALS; // ✅ plus getArticlesByFormat

    return (
        <section className="container-page py-10">
            <header className="mb-8">
                <p className="section-label section-label-vert">Tutoriels</p>
                <h1 className="mt-3 text-3xl font-serif-title font-semibold">Tous les tutoriels</h1>
                <p className="mt-2 text-sm text-slate-700 max-w-2xl">Des exercices doux pour apprivoiser le trait et la peur de se tromper.</p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                {tutorials.map((tutorial) => (
                    <article key={tutorial.slug} className="card h-full flex flex-col">
                        <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Tutoriel · {tutorial.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}</p>

                        <h2 className="text-lg font-semibold mb-2">
                            <Link href={`/articles/tutoriels/${tutorial.slug}`}>{tutorial.title}</Link>
                        </h2>

                        <p className="text-sm text-slate-700 mb-4 flex-1">{tutorial.excerpt}</p>

                        <Link href={`/articles/tutoriels/${tutorial.slug}`} className="text-sm font-medium underline mt-auto">
                            Lire le tutoriel
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
