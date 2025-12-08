'use client';

import Link from 'next/link';
import Image from 'next/image';

import { pillarConfig } from '@/components/categories/category-data';
import type { Formation } from '@/lib/content/formations';

interface FormationCardProps {
    formation: Formation;
}

export function FormationCard({ formation }: FormationCardProps) {
    const theme = pillarConfig[formation.pillarSlug];
    const isComingSoon = formation.status === 'coming-soon';

    const priceLabel = `${formation.priceEUR.toString().replace('.', ',')} €`;

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-perl/70 bg-white/85 shadow-sm shadow-main/5 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={formation.coverImage}
                    alt={formation.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/15 to-transparent" />

                <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2 text-[0.78rem] text-ivory">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-ivory" />
                        {formation.highlightLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 backdrop-blur">
                        {formation.modulesCount} modules · ≈ {formation.approximateHours} h
                    </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-[0.8rem] text-ivory">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur">
                        <span className={`h-2 w-2 rounded-full ${theme.dotClass}`} />
                        {formation.pillarLabel}
                    </span>
                    <span className="rounded-full border border-white/30 bg-black/25 px-3 py-1 backdrop-blur">{formation.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                <div className="space-y-1">
                    <h3 className="font-serif-title text-base leading-snug text-main md:text-lg">{formation.title}</h3>
                    <p className="line-clamp-2 text-[0.9rem] text-main/75">{formation.tagline}</p>
                </div>

                <div className="space-y-0.5 text-[0.82rem] text-main/65">
                    <p>Intro · {formation.modulesCount} modules (avec sous-modules) · conclusion · bonus premium</p>
                    <p>≈ {formation.approximateHours} h de contenu guidé · accès long terme</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <div className="space-y-0.5">
                        <p className="text-[0.78rem] text-main/55">{isComingSoon ? 'Ouverture prochaine' : 'Accès complet à la formation'}</p>
                        <p className="text-[1rem] font-semibold text-main">{priceLabel}</p>
                    </div>

                    <Link
                        href={`/formations/${formation.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-main px-3.5 py-1.75 text-[0.85rem] font-medium text-ivory shadow-main/25 transition-all hover:bg-main/90"
                    >
                        Voir la formation
                        <span>↗</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
