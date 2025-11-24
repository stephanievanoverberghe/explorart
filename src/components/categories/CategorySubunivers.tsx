// src/components/categories/CategorySubunivers.tsx

import type { PillarConfig, PillarSubcategory, SubcategorySlug } from './category-data';

interface CategorySubuniversProps {
    pillar: PillarConfig;
    subcategories: PillarSubcategory[];
    subcategoryFilter: 'all' | SubcategorySlug;
    setSubcategoryFilter: (value: 'all' | SubcategorySlug) => void;
}

export function CategorySubunivers({ pillar, subcategories, subcategoryFilter, setSubcategoryFilter }: CategorySubuniversProps) {
    const { border, bg, hover } = pillar.colorClasses;

    return (
        <section className="space-y-5">
            <div className="flex items-center justify-between gap-2">
                <h2 className="font-serif-title text-lg md:text-xl">Sous-univers de {pillar.title}</h2>
                <button type="button" onClick={() => setSubcategoryFilter('all')} className="text-xs underline decoration-1 underline-offset-4 text-main/70 hover:text-main">
                    Tout afficher
                </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map((subcat) => {
                    const isActive = subcategoryFilter === subcat.slug;

                    return (
                        <button
                            key={subcat.slug}
                            type="button"
                            onClick={() => setSubcategoryFilter(subcat.slug)}
                            className={`rounded-xl shadow-sm p-4 space-y-2 border transition-all duration-200 text-left cursor-pointer
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-main/30
                                ${isActive ? `${border} ${bg} shadow-md -translate-y-0.5` : `${border} ${bg} ${hover}`}`}
                        >
                            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-main/65">Sous-univers</p>
                            <h3 className="font-serif-title text-sm md:text-base text-main">{subcat.label}</h3>
                            <p className="text-xs md:text-sm text-main/70">{subcat.description}</p>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
