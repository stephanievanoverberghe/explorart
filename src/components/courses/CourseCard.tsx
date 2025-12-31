// src/components/courses/CourseCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CourseData } from '@/lib/data/courses';
import { pillarConfig } from '@/components/categories/category-data';

interface Props {
    course: CourseData;
}

function formatDuration(minutes: number) {
    if (minutes < 50) return `≈ ${minutes} min`;
    if (minutes < 75) return '≈ 1 h';
    return '≈ 1 h 15 – 1 h 30';
}

export function CourseCard({ course }: Props) {
    const isFree = course.pricing.isFree || course.pricing.effectivePrice === 0;
    const priceLabel = isFree ? 'Offert' : `${course.pricing.effectivePrice.toString().replace('.', ',')} €`;
    const durationLabel = formatDuration(course.durationMinutes);
    const theme = pillarConfig[course.pillarSlug];
    const showPromo = !isFree && course.pricing.promoLabel && course.pricing.compareAtPrice && course.pricing.compareAtPrice > course.pricing.effectivePrice;
    const compareAtLabel = showPromo ? `${course.pricing.compareAtPrice?.toString().replace('.', ',')} €` : null;
    const levelLabel = course.level === 'beginner' ? 'Débutant' : course.level === 'intermediate' ? 'Intermédiaire' : course.level === 'advanced' ? 'Avancé' : 'Tous niveaux';

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-perl/70 bg-white/80 shadow-sm shadow-main/5 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                    src={course.coverImage}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/10 to-transparent" />

                <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2 text-[0.8rem] text-ivory">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-ivory" />
                        {levelLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 backdrop-blur">⏱ {durationLabel}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-[0.8rem] text-ivory backdrop-blur">
                        {isFree && <span className="h-2 w-2 rounded-full bg-sage" />}
                        {course.pillarLabel}
                    </span>
                    <span className="rounded-full border border-white/30 bg-black/25 px-3 py-1 text-[0.82rem] text-ivory backdrop-blur">{course.modulesCount} modules</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                <div className="space-y-1">
                    <h3 className="font-serif-title text-base leading-snug text-main md:text-lg">{course.title}</h3>
                    <p className="line-clamp-2 text-[0.9rem] text-main/75">{course.tagline}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-main/75">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${theme?.colorClasses.border ?? 'border-main/40'} ${
                            theme?.colorClasses.bg ?? 'bg-main/5'
                        }`}
                    >
                        <span className={`h-2 w-2 rounded-full ${theme?.dotClass ?? 'bg-main'}`} />
                        {theme?.title ?? course.pillarLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-perl/70 bg-white px-2.5 py-1">Structure guidée</span>
                    {isFree && <span className="inline-flex items-center gap-1.5 rounded-full border border-sage/60 bg-sage/10 px-2.5 py-1 text-sage">Mini-parcours offert</span>}
                </div>

                <div className="space-y-0.5 text-[0.82rem] text-main/65">
                    <p>Introduction · {course.modulesCount} modules · conclusion</p>
                    <p>{durationLabel} de contenu guidé · accès à vie</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <div className="space-y-0.5">
                        <p className="text-[0.78rem] text-main/55">{isFree ? 'Accès immédiat' : 'Accès complet au cours'}</p>
                        <div className="flex items-center gap-2">
                            <p className={`text-[1rem] font-semibold ${isFree ? 'text-sage' : 'text-main'}`}>{priceLabel}</p>
                            {compareAtLabel ? <span className="text-[0.8rem] text-main/40 line-through">{compareAtLabel}</span> : null}
                        </div>
                        {showPromo ? <p className="text-[0.7rem] text-sage font-semibold">{course.pricing.promoLabel}</p> : null}
                    </div>

                    <Link
                        href={isFree ? '/commencer-ici' : `/cours/${course.slug}`}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.75 text-[0.85rem] font-medium transition-all ${
                            isFree ? 'bg-sage text-ivory shadow-sage/30 hover:bg-sage/90' : 'bg-main text-ivory shadow-main/25 hover:bg-main/90'
                        }`}
                    >
                        {isFree ? 'Accéder au parcours' : 'Voir le cours'}
                        <span>↗</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
