// src/app/(public)/articles/page.tsx
import { ARTICLES } from '@/lib/content/articles';
import { TUTORIALS } from '@/lib/content/tutorials';
import { getFormatConfigByKey } from '@/lib/content/articleFormats';
import { ArticleCard } from '@/components/articles/ArticleCard';

export default function ArticlesPage() {
    // 1) Tutoriels (source = TUTORIALS)
    const tutorialCards = TUTORIALS.map((tuto) => ({
        href: `/articles/tutoriels/${tuto.slug}`,
        label: 'Tutoriel',
        levelLabel: tuto.level === 'beginner' ? 'Débutant' : 'Intermédiaire',
        title: tuto.title,
        excerpt: tuto.excerpt,
    }));

    // 2) Autres formats (source = ARTICLES)
    const otherCards = ARTICLES.map((article) => {
        const config = getFormatConfigByKey(article.format);

        return {
            href: `/articles/${config.pathSegment}/${article.slug}`,
            label: config.label,
            levelLabel: article.level === 'beginner' ? 'Débutant' : 'Intermédiaire',
            title: article.title,
            excerpt: article.excerpt,
        };
    });

    // 3) Tout mélanger
    const cards = [...tutorialCards, ...otherCards];

    return (
        <section className="container-page py-10">
            <header className="mb-8">
                <p className="section-label section-label-sage">Articles</p>
                <h1 className="mt-3 text-3xl font-serif-title font-semibold">Explorer les articles</h1>
                <p className="mt-2 text-sm text-slate-700 max-w-2xl">Tutoriels, analyses, inspirations et plus encore (pour l’instant, surtout des tutoriels 😊).</p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                {cards.map((card) => (
                    <ArticleCard key={card.href} href={card.href} label={card.label} levelLabel={card.levelLabel} title={card.title} excerpt={card.excerpt} />
                ))}
            </div>
        </section>
    );
}
