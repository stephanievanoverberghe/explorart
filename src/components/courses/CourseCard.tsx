// src/components/courses/CourseCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/lib/content/courses';

interface Props {
    course: Course;
}

function formatDuration(minutes: number) {
    if (minutes < 50) return `≈ ${minutes} min`;
    if (minutes < 75) return '≈ 1 h';
    return '≈ 1 h 15 – 1 h 30';
}

export function CourseCard({ course }: Props) {
    const isFree = course.priceEUR === 0 || course.isMini;
    const priceLabel = isFree ? 'Offert' : `${course.priceEUR.toString().replace('.', ',')} €`;
    const durationLabel = formatDuration(course.durationMinutes);

    return (
        <article
            className="
                group flex flex-col overflow-hidden
                rounded-2xl border border-perl/60 bg-ivory/95
                shadow-xs hover:shadow-md hover:-translate-y-0.5
                transition-all
            "
        >
            {/* IMAGE COVER SIMPLE */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-perl/15">
                <Image src={course.coverImage} alt={course.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                {/* léger voile pour la lisibilité globale */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/5 to-transparent" />
            </div>

            {/* CONTENU TEXTE */}
            <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                {/* Titre + baseline */}
                <div className="space-y-1">
                    <h3 className="font-serif-title text-base md:text-lg leading-snug text-main">{course.title}</h3>
                    <p className="text-[0.85rem] text-main/75 line-clamp-2">{course.tagline}</p>
                </div>

                {/* META LIGNE SIMPLE */}
                <div className="flex flex-wrap gap-2 text-[0.75rem] text-main/70">
                    <span className="inline-flex items-center rounded-full bg-main/5 px-2 py-0.5">{course.level === 'beginner' ? 'Débutant' : 'Intermédiaire'}</span>

                    <span className="inline-flex items-center rounded-full bg-ivory border border-perl/50 px-2 py-0.5">{course.pillarLabel}</span>

                    {course.isMini && <span className="inline-flex items-center rounded-full bg-sage/8 border border-sage/40 px-2 py-0.5 text-sage">Mini-parcours offert</span>}
                </div>

                {/* STRUCTURE & DURÉE */}
                <div className="space-y-0.5 text-[0.8rem] text-main/65">
                    <p>Structure : introduction · {course.modulesCount} modules · conclusion</p>
                    <p>⏱ {durationLabel} · cours guidé</p>
                </div>

                {/* BAS DE CARD : PRIX + CTA */}
                <div className="mt-1 flex items-center justify-between gap-3 pt-2">
                    <div className="space-y-0.5">
                        <p className="text-[0.75rem] text-main/55">Accès {isFree ? 'immédiat' : 'complet au cours'}</p>
                        <p className={`text-[0.95rem] font-semibold ${isFree ? 'text-sage' : 'text-main'}`}>{priceLabel}</p>
                    </div>

                    <Link
                        href={course.isMini ? '/commencer-ici' : `/cours/${course.slug}`}
                        className={`
                            inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.75
                            text-[0.8rem] font-medium transition-colors
                            ${isFree ? 'bg-sage text-ivory hover:bg-sage/90' : 'bg-main text-ivory hover:bg-main/90'}
                        `}
                    >
                        {isFree ? 'Accéder au parcours' : 'Voir le cours'}
                        <span>↗</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
