// src/components/categories/CategoryBreadcrumb.tsx
import Link from 'next/link';
import type { PillarConfig } from './category-data';

interface CategoryBreadcrumbProps {
    pillar: PillarConfig;
}

export function CategoryBreadcrumb({ pillar }: CategoryBreadcrumbProps) {
    return (
        <nav className="text-xs md:text-sm text-main/60" aria-label="Fil d’Ariane">
            <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                    <Link href="/" className="hover:text-main">
                        Accueil
                    </Link>
                </li>
                <li>·</li>
                <li>
                    <Link href="/categories" className="hover:text-main">
                        Catégories
                    </Link>
                </li>
                <li>·</li>
                <li className="inline-flex items-center gap-1 text-main">
                    <span className={`h-1.5 w-1.5 rounded-full ${pillar.dotClass}`} />
                    <span>{pillar.title}</span>
                </li>
            </ol>
        </nav>
    );
}
