import Link from 'next/link';

export default function Hero() {
    return (
        <section className="mb-10 lg:mb-14">
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 px-6 py-7 shadow-sm sm:px-8 sm:py-9 lg:px-10 lg:py-11">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 mb-2">Explor&apos;Art — blog d&apos;art</p>
                <h1 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl tracking-tight text-slate-900 mb-3">
                    Voir l’art autrement.
                    <br />
                    Comprendre les œuvres, sentir les couleurs, créer en douceur.
                </h1>
                <p className="text-sm sm:text-base text-slate-700 max-w-2xl mb-6">
                    Un espace lumineux pour apprendre à dessiner, lire les tableaux et traverser l’histoire de l’art sans jargon, à hauteur d’humain.
                </p>

                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/commencer-ici"
                        className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
                    >
                        Commencer ici
                    </Link>
                    <Link
                        href="/articles"
                        className="inline-flex items-center rounded-full border border-slate-300/80 bg-white px-4 py-2 text-xs font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                        Explorer les articles
                    </Link>
                </div>
            </div>
        </section>
    );
}
