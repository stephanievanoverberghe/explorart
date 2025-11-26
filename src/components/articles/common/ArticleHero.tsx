// src/components/articles/common/ArticleHero.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getPillarTheme } from './pillarTheme';
import type { PillarKey } from '@/types/article';

interface ArticleHeroProps {
    title: string;
    excerpt: string;
    pillar: PillarKey;
    levelLabel?: string;
    formatLabel: string;
    hero?: { src: string; alt: string };
    meta?: string[];
    primaryCta?: { href: string; label: string };
    secondaryCta?: { href: string; label: string };
    breadcrumb?: { label: string; href?: string }[]; // <── AJOUT
}

export function ArticleHero({ title, excerpt, pillar, levelLabel, formatLabel, hero, meta, primaryCta, secondaryCta, breadcrumb = [] }: ArticleHeroProps) {
    const theme = getPillarTheme(pillar);

    return (
        <header className="mb-10 animate-fade-in">
            <div
                className={`
                    rounded-2xl md:rounded-3xl
                    border ${theme.borderClass}
                    ${theme.bgClass}
                    px-4 py-4 md:px-6 md:py-5
                    space-y-4 shadow-sm
                `}
            >
                {/* FIL D’ARIANE */}
                {breadcrumb.length > 0 && (
                    <nav className="text-[0.7rem] md:text-xs text-main/60 pb-2" aria-label="Fil d’Ariane">
                        <ol className="flex flex-wrap items-center gap-1.5">
                            {breadcrumb.map((item, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                    {i > 0 && <span>·</span>}
                                    {item.href ? (
                                        <Link href={item.href} className="hover:text-main">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="text-main">{item.label}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {/* Pré-header (label pilier) */}
                <div className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-main/70">
                    <span className={theme.sectionLabelClass}>Explor&apos;Art</span>
                    <span className="mx-1 h-px w-6 bg-main/60" />
                    <span className={theme.sectionLabelClass}>{theme.label}</span>
                </div>

                {/* Hero content */}
                <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
                    <div className="space-y-4">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span className={`section-label ${theme.sectionLabelClass}`}>{formatLabel}</span>
                            {levelLabel && <span className="badge badge-level">{levelLabel}</span>}
                            <span className={`badge ${theme.badgeClass}`}>{theme.label}</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-serif-title font-semibold">{title}</h1>

                        <p className="text-sm md:text-base text-main/70 max-w-xl">{excerpt}</p>

                        {meta && (
                            <div className="flex flex-wrap gap-3 text-xs text-main/70 pt-1">
                                {meta.map((m, i) => (
                                    <span key={i}>{m}</span>
                                ))}
                            </div>
                        )}

                        {/* CTA */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {primaryCta && (
                                <Link href={primaryCta.href} className={`${theme.ctaPrimaryClass} rounded-full cursor-pointer px-4 py-2 text-xs md:text-sm transition-colors`}>
                                    {primaryCta.label}
                                </Link>
                            )}
                            {secondaryCta && (
                                <Link
                                    href={secondaryCta.href}
                                    className={`${theme.ctaSecondaryClass} rounded-full cursor-pointer border px-4 py-2 text-xs md:text-sm transition-colors`}
                                >
                                    {secondaryCta.label}
                                </Link>
                            )}
                        </div>
                    </div>

                    {hero && (
                        <div className="relative rounded-xl overflow-hidden border border-perl/40 bg-ivory shadow-sm">
                            <div className="aspect-4/3">
                                <Image src={hero.src} alt={hero.alt} width={800} height={600} className="w-full h-full object-cover" priority />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
