// src/components/articles/common/ArticlesListHero.tsx
import Link from 'next/link';
import Image from 'next/image';
import { pillarConfig } from '@/components/categories/category-data';
import type { PillarSlug } from '@/components/categories/category-data';
import { getPillarTheme } from './pillarTheme';
import type { PillarKey } from '@/types/article';

interface ArticlesListHeroProps {
    pillarSlug: PillarSlug;
    formatLabel: string;
    title: string;
    description: string;
    articleCount?: number;
}

export function ArticlesListHero({ pillarSlug, formatLabel, title, description, articleCount }: ArticlesListHeroProps) {
    const pillar = pillarConfig[pillarSlug];
    const theme = getPillarTheme(pillarSlug as PillarKey);

    return (
        <header className="space-y-4 rounded-3xl bg-background px-4 py-5 md:px-6 md:py-6 shadow-sm border border-perl/50">
            {/* Fil d’ariane très léger */}
            <nav className="text-[0.7rem] md:text-xs text-main/60" aria-label="Fil d’Ariane">
                <ol className="flex flex-wrap items-center gap-1.5">
                    <li>
                        <Link href="/" className="hover:text-main">
                            Accueil
                        </Link>
                    </li>
                    <li>›</li>
                    <li>
                        <Link href="/articles" className="hover:text-main">
                            Articles
                        </Link>
                    </li>
                    <li>›</li>
                    <li className="text-main/80">{formatLabel}</li>
                </ol>
            </nav>

            {/* Bloc central (card univers & formats) */}
            <div
                className={`
                    relative overflow-hidden
                    rounded-2xl md:rounded-3xl
                    border ${theme.borderClass}
                    bg-ivory
                    px-4 py-4 md:px-6 md:py-5
                    shadow-sm
                `}
            >
                <div className="relative grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] lg:items-start">
                    {/* Texte édiorial */}
                    <div className="space-y-4">
                        {/* Ligne format + pilier */}
                        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/70">
                            <span className={theme.sectionLabelClass}>Explor&apos;Art · {pillar.title}</span>
                            <span className="mx-1 h-px w-6 bg-main/40" />
                            <span className="rounded-full border border-main/25 bg-main/5 px-2 py-0.5">{formatLabel}</span>
                        </div>

                        <div className="space-y-3">
                            <h1 className="font-serif-title text-3xl md:text-4xl leading-tight">{title}</h1>
                            <p className="text-main/80 text-sm md:text-base max-w-xl">{description}</p>
                        </div>

                        {/* Tagline / intro pilier plus discrète que sur une page pilier */}
                        <p className="text-main/75 text-xs md:text-sm max-w-xl">{pillar.tagline}</p>

                        {/* Mini “bloc univers” plus compact que CategoryHero */}
                        <div className="rounded-2xl border border-perl/60 bg-background/85 px-3 py-3 md:px-4 md:py-3 space-y-2">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Ce que tu trouveras ici</p>
                            <ul className="text-xs md:text-[0.85rem] text-main/80 space-y-1.5">
                                {pillar.helperBullets.slice(0, 3).map((item) => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap items-center gap-3 pt-1 text-[0.7rem] text-main/65">
                                <span className="inline-flex items-center gap-1 rounded-full bg-main/5 px-2 py-0.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-main/50" />
                                    Niveaux : Débutant & Intermédiaire
                                </span>
                                {typeof articleCount === 'number' && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-main/5 px-2 py-0.5">
                                        {articleCount} article{articleCount > 1 ? 's' : ''} disponible
                                        {articleCount > 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Colonne visuelle univers (plus petite que sur ArticleHero / CategoryHero) */}
                    <aside className="space-y-3">
                        <div className="relative overflow-hidden rounded-2xl border border-perl/50 bg-black/5">
                            <div className="relative aspect-4/3">
                                <Image src={pillar.heroImage} alt={pillar.title} fill className="object-cover scale-[1.02] transition-transform duration-700" priority />
                                <div className={`pointer-events-none absolute inset-0 ${pillar.dotClass}/25 mix-blend-multiply`} />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                                <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
                                            <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                                            Univers
                                        </span>
                                        <span className="text-[0.65rem] uppercase tracking-[0.16em] text-ivory/80">{pillar.kicker}</span>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[0.8rem] text-ivory/85 max-w-xs italic">{pillar.quote}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {pillar.moodKeywords.slice(0, 4).map((word) => (
                                                <span
                                                    key={word}
                                                    className="rounded-full border border-white/35 bg-black/35 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/90"
                                                >
                                                    {word}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </header>
    );
}
