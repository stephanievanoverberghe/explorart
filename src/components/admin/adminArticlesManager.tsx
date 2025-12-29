'use client';

import { useEffect, useState } from 'react';

const articleFormats = [
    { value: 'tutorial', label: 'Tutoriel' },
    { value: 'artwork-analysis', label: 'Analyse d’œuvre' },
    { value: 'artist-story', label: 'Histoire d’artiste' },
    { value: 'art-history', label: 'Histoire de l’art' },
    { value: 'color-guide', label: 'Guide couleur' },
    { value: 'art-psychology', label: 'Psychologie de l’art' },
    { value: 'inspiration', label: 'Inspiration' },
];

const slugRegex = /^[a-z0-9-]+$/;

type ArticleRecord = {
    _id: string;
    title: string;
    slug: string;
    format: string;
    status: 'draft' | 'published';
    createdAt: string;
};

export function AdminArticlesManager() {
    const [articles, setArticles] = useState<ArticleRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: '',
        slug: '',
        format: articleFormats[0].value,
        excerpt: '',
        status: 'draft',
        coverImageUrl: '',
        categorySlug: '',
    });

    const loadArticles = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/articles');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Erreur de chargement.');
            }
            setArticles(data.data ?? []);
        } catch (fetchError) {
            setError(fetchError instanceof Error ? fetchError.message : 'Erreur inconnue.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadArticles();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const title = form.title.trim();
        const slug = form.slug.trim().toLowerCase();

        if (!title || !slug || !form.format) {
            setError('Merci de renseigner le titre, le slug et le format.');
            return;
        }

        if (!slugRegex.test(slug)) {
            setError('Le slug doit contenir uniquement des minuscules, chiffres ou tirets.');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/admin/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    title,
                    slug,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de créer cet article.');
            }

            setSuccess('Article enregistré avec succès.');
            setForm({
                title: '',
                slug: '',
                format: articleFormats[0].value,
                excerpt: '',
                status: 'draft',
                coverImageUrl: '',
                categorySlug: '',
            });
            await loadArticles();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Erreur inconnue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h2 className="font-serif-title text-xl text-main">Articles</h2>
                <p className="text-sm text-main/60">Créez et suivez les articles publiés sur Explor&apos;Art.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-perl/60 bg-white p-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-main/70">
                        Titre
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm"
                            placeholder="Nouvel article"
                        />
                    </label>
                    <label className="text-sm text-main/70">
                        Slug
                        <input
                            name="slug"
                            value={form.slug}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm"
                            placeholder="nouvel-article"
                        />
                    </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-main/70">
                        Format
                        <select name="format" value={form.format} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm">
                            {articleFormats.map((format) => (
                                <option key={format.value} value={format.value}>
                                    {format.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="text-sm text-main/70">
                        Statut
                        <select name="status" value={form.status} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm">
                            <option value="draft">Brouillon</option>
                            <option value="published">Publié</option>
                        </select>
                    </label>
                </div>
                <label className="text-sm text-main/70">
                    Extrait
                    <textarea name="excerpt" value={form.excerpt} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-perl/60 px-4 py-3 text-sm" rows={3} />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-main/70">
                        Image de couverture (URL)
                        <input
                            name="coverImageUrl"
                            value={form.coverImageUrl}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm"
                            placeholder="/uploads/cover.jpg"
                        />
                    </label>
                    <label className="text-sm text-main/70">
                        Catégorie (slug)
                        <input
                            name="categorySlug"
                            value={form.categorySlug}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm"
                            placeholder="apprendre-couleur"
                        />
                    </label>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <button
                    type="submit"
                    className="w-full rounded-full bg-main px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer l’article'}
                </button>
            </form>

            <section className="space-y-3">
                <h3 className="text-sm font-semibold text-main/70">Articles récents</h3>
                {isLoading ? (
                    <p className="text-sm text-main/50">Chargement...</p>
                ) : articles.length === 0 ? (
                    <p className="text-sm text-main/50">Aucun article pour le moment.</p>
                ) : (
                    <ul className="space-y-2 text-sm text-main/70">
                        {articles.map((article) => (
                            <li key={article._id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-perl/50 bg-white/70 px-4 py-2">
                                <span className="font-medium text-main">{article.title}</span>
                                <span>{article.slug}</span>
                                <span className="text-xs uppercase tracking-[0.2em] text-main/50">{article.status}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
