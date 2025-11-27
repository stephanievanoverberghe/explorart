// src/components/articles/tutorials/TutorialsExplorer.tsx
'use client';

import { useMemo, useState } from 'react';
import type { CategoryPost, Level, SubcategorySlug } from '@/components/categories/category-data';
import { pillarConfig, subcategoriesByPillar, subcatLabels, levelLabels } from '@/components/categories/category-data';
import { ArticleRelatedGrid } from '@/components/articles/common/ArticleRelatedGrid';

type TutorialsExplorerProps = {
    tutorials: CategoryPost[];
};

export function TutorialsExplorer({ tutorials }: TutorialsExplorerProps) {
    const [query, setQuery] = useState('');
    const [level, setLevel] = useState<'all' | Level>('all');
    const [subcat, setSubcat] = useState<'all' | SubcategorySlug>('all');

    const pillar = pillarConfig['dessin-peinture'];
    const subcats = subcategoriesByPillar['dessin-peinture'];

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return tutorials.filter((tuto) => {
            if (level !== 'all' && tuto.level !== level) return false;
            if (subcat !== 'all' && tuto.subcategory !== subcat) return false;

            if (!q) return true;

            return tuto.title.toLowerCase().includes(q) || tuto.excerpt.toLowerCase().includes(q);
        });
    }, [tutorials, level, subcat, query]);

    return (
        <div className="space-y-6">
            {/* BARRE DE FILTRES */}
            <div
                className="
                    rounded-3xl border border-perl/60 bg-background/80
                    px-4 py-3 md:px-5 md:py-4
                    shadow-sm flex flex-col gap-3
                "
            >
                {/* Ligne 1 : Recherche */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-main/60">Filtrer les tutoriels</p>
                        <p className="text-[0.78rem] text-main/60">
                            {filtered.length} tutoriel{filtered.length > 1 ? 's' : ''} trouvé
                            {query || level !== 'all' || subcat !== 'all' ? ' · filtres actifs' : ''}
                        </p>
                    </div>

                    <div className="w-full md:w-72">
                        <div
                            className="
                                flex items-center gap-2
                                rounded-full border border-perl/70 bg-ivory/80
                                px-3 py-1.5 text-xs shadow-inner
                                focus-within:border-vert/70 focus-within:ring-1 focus-within:ring-vert/40
                            "
                        >
                            <span className="text-[0.8rem] text-main/50">🔍</span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Rechercher un tutoriel…"
                                className="w-full bg-transparent text-xs outline-none placeholder:text-main/40"
                            />
                            {query && (
                                <button type="button" onClick={() => setQuery('')} className="text-[0.75rem] text-main/40 hover:text-main/70">
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Ligne 2 : Niveaux */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[0.7rem] uppercase tracking-[0.16em] text-main/50">Niveau</span>
                    <div className="flex flex-wrap gap-1.5">
                        <button
                            type="button"
                            onClick={() => setLevel('all')}
                            className={`
                                inline-flex items-center rounded-full px-2.5 py-1
                                text-[0.7rem] uppercase tracking-[0.16em]
                                border
                                ${level === 'all' ? 'border-vert bg-vert/10 text-vert' : 'border-perl/60 bg-ivory/80 text-main/60 hover:border-vert/60 hover:text-vert'}
                            `}
                        >
                            Tous
                        </button>
                        {(['beginner', 'intermediate'] as Level[]).map((lvl) => (
                            <button
                                key={lvl}
                                type="button"
                                onClick={() => setLevel(lvl)}
                                className={`
                                    inline-flex items-center rounded-full px-2.5 py-1
                                    text-[0.7rem] uppercase tracking-[0.16em]
                                    border
                                    ${level === lvl ? 'border-vert bg-vert/10 text-vert' : 'border-perl/60 bg-ivory/80 text-main/60 hover:border-vert/60 hover:text-vert'}
                                `}
                            >
                                {levelLabels[lvl]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ligne 3 : Sous-univers */}
                <div className="space-y-1">
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-main/50">Sous-univers</p>
                    <div className="flex flex-wrap gap-1.5">
                        <button
                            type="button"
                            onClick={() => setSubcat('all')}
                            className={`
                                inline-flex items-center rounded-full px-2.5 py-1
                                text-[0.7rem] uppercase tracking-[0.16em]
                                border
                                ${subcat === 'all' ? 'border-main/70 bg-main/5 text-main/80' : 'border-perl/60 bg-ivory/80 text-main/60 hover:border-main/70 hover:text-main'}
                            `}
                        >
                            Tous les sous-univers
                        </button>

                        {subcats.map((sc) => (
                            <button
                                key={sc.slug}
                                type="button"
                                onClick={() => setSubcat(sc.slug)}
                                className={`
                                    inline-flex items-center rounded-full px-2 py-1
                                    text-[0.68rem] uppercase tracking-[0.16em]
                                    border
                                    ${subcat === sc.slug ? 'border-vert bg-vert/10 text-vert' : 'border-perl/60 bg-ivory/80 text-main/60 hover:border-vert/60 hover:text-vert'}
                                `}
                                title={sc.description}
                            >
                                {subcatLabels[sc.slug]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* GRID DE CARTES */}
            <ArticleRelatedGrid
                pillar={pillar}
                posts={filtered}
                title="Tous les tutoriels"
                description="Affinés par tes filtres : niveau, sous-univers et mots-clés."
                hrefBase="/articles/tutoriels"
            />
        </div>
    );
}
