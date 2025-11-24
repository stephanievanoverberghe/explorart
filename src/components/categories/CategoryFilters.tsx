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
                        levelFilter === 'all' ? 'bg-main text-ivory border-main' : 'bg-ivory border-perl/60 text-main/80 hover:bg-white'
                    }`}
                >
                    Tous les niveaux
                </button>
                <button
                    type="button"
                    onClick={() => setLevelFilter('beginner')}
                    className={`px-3 py-1.5 rounded-full border text-xs md:text-sm transition-all ${
                        levelFilter === 'beginner' ? 'bg-main text-ivory border-main' : 'bg-ivory border-perl/60 text-main/80 hover:bg-white'
                    }`}
                >
                    Débutant
                </button>
                <button
                    type="button"
                    onClick={() => setLevelFilter('intermediate')}
                    className={`px-3 py-1.5 rounded-full border text-xs md:text-sm transition-all ${
                        levelFilter === 'intermediate' ? 'bg-main text-ivory border-main' : 'bg-ivory border-perl/60 text-main/80 hover:bg-white'
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
