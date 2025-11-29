import Link from 'next/link';
import { Star } from 'lucide-react';
import { mockFavorites } from './atelier-data';

export function FavoritesPanel() {
    const hasFavorites = mockFavorites.length > 0;

    if (!hasFavorites) {
        return (
            <section className="rounded-3xl border border-perl/60 bg-white/95 p-6 md:p-8 text-center space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose/10">
                    <Star className="h-6 w-6 text-rose/80" />
                </div>
                <h2 className="font-serif-title text-xl text-main">Pas encore de favoris</h2>
                <p className="text-sm md:text-base text-main/70 max-w-md mx-auto">
                    Dès que tu auras la possibilité d’épingler un article, il viendra se ranger ici. En attendant, tu peux déjà explorer les 7 piliers et repérer ce qui te parle le
                    plus.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-1">
                    <Link
                        href="/articles"
                        className="inline-flex items-center justify-center rounded-full bg-sage px-4 py-2.5 text-sm font-medium text-ivory shadow-sm hover:bg-sage/90 transition"
                    >
                        Explorer les articles
                    </Link>
                    <Link
                        href="/categories"
                        className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-ivory px-4 py-2.5 text-sm font-medium text-main/80 hover:border-sage/70 hover:bg-sage/5 transition"
                    >
                        Voir les 7 piliers
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Favoris</p>
                <h2 className="font-serif-title text-xl md:text-2xl text-main">Tes étoiles Explor&apos;Art</h2>
                <p className="text-sm text-main/70 max-w-2xl">Les articles que tu as envie de garder près de toi, pour y revenir quand tu veux.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {mockFavorites.map((fav) => (
                    <Link
                        key={fav.href}
                        href={fav.href}
                        className="group relative flex flex-col gap-2 rounded-2xl border border-perl/50 bg-white/95 p-4 shadow-xxs transition-all hover:-translate-y-0.5 hover:border-sage/70 hover:shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div className="inline-flex items-center gap-2 text-[0.75rem] text-main/65">
                                <span className={`h-1.5 w-1.5 rounded-full ${fav.pillarColorClass}`} />
                                <span>{fav.tag}</span>
                            </div>

                            <div className="inline-flex items-center gap-1 rounded-full bg-rose/10 px-2 py-0.5 text-[0.7rem] text-rose/80">
                                <Star className="h-3 w-3" />
                                <span>Favori</span>
                            </div>
                        </div>

                        <h3 className="font-serif-title text-base md:text-lg text-main group-hover:underline decoration-1 underline-offset-4">{fav.title}</h3>

                        <p className="text-[0.8rem] text-main/65">Clique pour rouvrir l’article là où tu avais envie de revenir.</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
