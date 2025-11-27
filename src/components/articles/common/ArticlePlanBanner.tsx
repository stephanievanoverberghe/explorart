// src/components/articles/tutorials/TutorialPlanBanner.tsx
'use client';

import { ListTree } from 'lucide-react';

type Props = {
    totalSections: number;
    onOpen: () => void;
};

export function ArticlePlanBanner({ totalSections, onOpen }: Props) {
    return (
        <section className="rounded-2xl border border-sage bg-background px-4 py-3.5 md:px-5 md:py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1 min-w-0">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/70">Plan du tutoriel</p>
                <p className="text-xs md:text-sm text-main/80">{totalSections} sections principales · tu peux passer directement à la partie qui t’appelle aujourd’hui.</p>
            </div>

            <div className="flex justify-start md:justify-end">
                <button
                    type="button"
                    onClick={onOpen}
                    className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full cursor-pointer border border-sage bg-sage px-3 py-1.5 text-[0.75rem] font-medium text-ivory hover:bg-ivory hover:text-sage transition-colors md:mt-0"
                >
                    <ListTree className="h-4 w-4" />
                    <span>Ouvrir le plan détaillé</span>
                </button>
            </div>
        </section>
    );
}
