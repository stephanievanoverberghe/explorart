'use client';

import { Check, Lock, PlayCircle } from 'lucide-react';
import { Section } from './sections';

type Props = {
    sections: Section[];
    currentIndex: number;
    completed: boolean[];
    isLocked: (i: number) => boolean;
    onSelectSection: (i: number) => void;
    progressPercent: number;
};

export default function StartHereSidebar({ sections, currentIndex, completed, isLocked, onSelectSection, progressPercent }: Props) {
    const completedCount = completed.filter(Boolean).length;
    const total = sections.length;

    return (
        <nav className="space-y-3">
            {/* HEADER PROGRESSION */}
            <div className="rounded-2xl border border-perl/60 bg-ivory/95 px-3.5 py-3 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-sage">Mini-parcours</p>
                        <p className="text-[0.75rem] text-main/75">
                            {completedCount}/{total} modules complétés
                        </p>
                    </div>

                    <span className="inline-flex items-center justify-center rounded-full border border-sage/40 bg-sage/5 px-2.5 py-1 text-[0.7rem] font-medium text-ssage/90">
                        {Math.round(progressPercent)}%
                    </span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-perl/30 overflow-hidden">
                    <div className="h-full rounded-full bg-sage transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
            </div>

            {/* LISTE DES MODULES */}
            <div className="rounded-2xl border border-perl/60 bg-ivory/90 p-3 space-y-1.5">
                {sections.map((section, index) => {
                    const locked = isLocked(index);
                    const done = completed[index];
                    const active = index === currentIndex;

                    // 🔹 états texte
                    const statusLabel = locked ? 'À débloquer' : done ? 'Terminé' : active ? 'En cours' : 'Disponible';

                    const statusClass = locked ? 'text-main/45' : done ? 'text-sage/90' : active ? 'text-sage/90' : 'text-main/60';

                    // 🔹 état visuel général
                    const wrapperClass = [
                        'w-full text-left rounded-2xl px-3.5 py-2.5 flex items-center gap-3 border transition-all',
                        locked && 'border-transparent bg-ivory/60 text-main/35 cursor-not-allowed opacity-60',
                        active && 'border-sage/70 bg-sage/10 text-main shadow-sm ring-1 ring-sage/20',
                        done && !active && 'border-sage/70 bg-sage/20 text-main hover:bg-sage/30 cursor-pointer',
                        !locked && !active && !done && 'border-transparent bg-ivory/80 hover:border-sage/40 hover:bg-ivory cursor-pointer',
                    ]
                        .filter(Boolean)
                        .join(' ');

                    // 🔹 icône état
                    const iconClass = [
                        'flex h-8 w-8 items-center justify-center rounded-full border text-[0.7rem]',
                        locked && 'border-perl/70 text-main/40 bg-ivory',
                        active && 'border-sage bg-sage text-ivory shadow-sm',
                        done && !active && 'border-sage bg-sage/90 text-ivory',
                        !locked && !active && !done && 'border-perl/60 bg-ivory text-main/65',
                    ]
                        .filter(Boolean)
                        .join(' ');

                    return (
                        <button key={section.id} disabled={locked} onClick={() => onSelectSection(index)} className={wrapperClass}>
                            <div className={iconClass}>
                                {locked ? <Lock className="h-3.5 w-3.5" /> : done ? <Check className="h-3.5 w-3.5" /> : <PlayCircle className="h-3.5 w-3.5" />}
                            </div>

                            <div className="flex-1 min-w-0 space-y-0.5">
                                <div className="flex items-center justify-between">
                                    <p className="text-[0.8rem] md:text-[0.9rem] font-medium truncate">{section.label}</p>
                                    <span className={`text-[0.65rem] font-medium ${statusClass}`}>{statusLabel}</span>
                                </div>

                                <p className="text-[0.7rem] text-main/60 truncate">{section.title}</p>

                                <div className="flex items-center gap-2 text-[0.65rem] text-main/55">
                                    <span>{section.duration}</span>
                                    <span className="inline-flex items-center gap-1">
                                        <span className={`h-1.5 w-1.5 rounded-full ${section.colorDotClass}`} />
                                        <span className="uppercase tracking-[0.16em]">{section.type}</span>
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
