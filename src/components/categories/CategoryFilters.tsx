// src/components/categories/CategoryFilters.tsx
import type { Level } from './category-data';

interface CategoryFiltersProps {
    levelFilter: 'all' | Level;
    setLevelFilter: (level: 'all' | Level) => void;
    articlesCount: number;
}

export function CategoryFilters({ levelFilter, setLevelFilter, articlesCount }: CategoryFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                <button
                    type="button"
                    onClick={() => setLevelFilter('all')}
                    className={`px-3 py-1.5 rounded-full border text-xs md:text-sm transition-all ${
                        levelFilter === 'all' ? 'bg-sage text-ivory border-sage' : 'bg-sage/5 border-sage/60 text-sage hover:bg-sage/10 cursor-pointer'
                    }`}
                >
                    Tous les niveaux
                </button>
                <button
                    type="button"
                    onClick={() => setLevelFilter('beginner')}
                    className={`px-3 py-1.5 rounded-full border text-xs md:text-sm transition-all ${
                        levelFilter === 'beginner' ? 'bg-sage text-ivory border-sage' : 'bg-sage/5 border-sage/60 text-sage hover:bg-sage/10 cursor-pointer'
                    }`}
                >
                    Débutant
                </button>
                <button
                    type="button"
                    onClick={() => setLevelFilter('intermediate')}
                    className={`px-3 py-1.5 rounded-full border text-xs md:text-sm transition-all ${
                        levelFilter === 'intermediate' ? 'bg-sage text-ivory border-sage' : 'bg-sage/5 border-sage/60 text-sage hover:bg-sage/10 cursor-pointer'
                    }`}
                >
                    Intermédiaire
                </button>
            </div>

            <p className="text-xs text-main/60">
                {articlesCount} article
                {articlesCount > 1 ? 's' : ''} dans cet univers
            </p>
        </div>
    );
}
