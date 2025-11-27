// src/app/(public)/categories/[slug]/page.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { pillarConfig, subcategoriesByPillar, type Level, type PillarSlug, type SubcategorySlug } from '@/components/categories/category-data';
import { ALL_ARTICLES } from '@/lib/content/allArticles';
import { CategoryHero } from '@/components/categories/CategoryHero';
import { CategorySubunivers } from '@/components/categories/CategorySubunivers';
import { CategoryFilters } from '@/components/categories/CategoryFilters';
import { CategoryPostGrid } from '@/components/categories/CategoryPostGrid';
import { CategoryBreadcrumb } from '@/components/categories/CategoryBreadcrumb';

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = React.use(params);
    const pillarSlug = slug as PillarSlug;

    const pillar = pillarConfig[pillarSlug];
    if (!pillar) {
        notFound();
    }

    const pillarSubcategories = subcategoriesByPillar[pillarSlug];

    // 🟢 ICI : vrais articles (TUTORIALS + ARTICLES) déjà normalisés dans ALL_ARTICLES
    const posts = ALL_ARTICLES.filter((post) => post.pillarSlug === pillarSlug);

    const [levelFilter, setLevelFilter] = React.useState<'all' | Level>('all');
    const [subcategoryFilter, setSubcategoryFilter] = React.useState<'all' | SubcategorySlug>('all');

    const postsByLevel = levelFilter === 'all' ? posts : posts.filter((post) => post.level === levelFilter);
    const filteredPosts = subcategoryFilter === 'all' ? postsByLevel : postsByLevel.filter((post) => post.subcategory === subcategoryFilter);

    const currentSubcategory = subcategoryFilter === 'all' ? undefined : pillarSubcategories.find((s) => s.slug === subcategoryFilter);

    const resetFilters = () => {
        setSubcategoryFilter('all');
        setLevelFilter('all');
    };

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10 animate-fade-up">
                <CategoryBreadcrumb pillar={pillar} />
                <CategoryHero pillar={pillar} />
                <CategorySubunivers pillar={pillar} subcategories={pillarSubcategories} subcategoryFilter={subcategoryFilter} setSubcategoryFilter={setSubcategoryFilter} />
                <CategoryFilters levelFilter={levelFilter} setLevelFilter={setLevelFilter} articlesCount={filteredPosts.length} />
                <CategoryPostGrid pillar={pillar} posts={filteredPosts} currentSubcategory={currentSubcategory} resetFilters={resetFilters} />

                <section className="card bg-background/80 space-y-3 max-w-3xl">
                    <h3 className="font-serif-title text-lg">Continuer ton voyage dans {pillar.title.toLowerCase()} ?</h3>
                    <p className="text-sm text-main/75">
                        Tu peux rester ici un moment… ou{' '}
                        <Link href="/categories" className="underline decoration-1 underline-offset-4 hover:decoration-2">
                            retourner voir les 7 piliers
                        </Link>{' '}
                        pour suivre ce qui t’appelle aujourd’hui.
                    </p>
                </section>
            </div>
        </section>
    );
}
