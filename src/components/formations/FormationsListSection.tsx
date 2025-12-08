'use client';

import type { Formation } from '@/lib/content/formations';

import { FormationCard } from './FormationCard';

interface ListProps {
    formations: Formation[];
}

export function FormationsListSection({ formations }: ListProps) {
    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">Catalogue</p>
                    <h2 className="font-serif-title text-2xl">Formations premium</h2>
                    <p className="text-[0.9rem] text-main/65">De grands parcours structurés en modules et sous-modules, pensés pour une vraie transformation créative.</p>
                </div>
                <div className="rounded-full border border-perl/70 bg-white px-3 py-1.5 text-[0.82rem] text-main/70">
                    {formations.length} formation{formations.length > 1 ? 's' : ''} affichée
                    {formations.length > 1 ? 's' : ''}
                </div>
            </div>

            {formations.length === 0 ? (
                <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-perl/70 bg-white/80 px-4 py-6 text-sm text-main/75">
                    <p className="font-medium">Aucune formation ne correspond à ces filtres.</p>
                    <p>Essaie un autre univers ou réinitialise pour retrouver toutes les formations.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {formations.map((formation) => (
                        <FormationCard key={formation.slug} formation={formation} />
                    ))}
                </div>
            )}
        </section>
    );
}
