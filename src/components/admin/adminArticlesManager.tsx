// src/components/admin/adminArticlesManager.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

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
    excerpt?: string;
    coverImageUrl?: string;
    categorySlug?: string;
    createdAt: string;
};

type ArticleFormState = {
    title: string;
    slug: string;
    format: string;
    excerpt: string;
    status: 'draft' | 'published';
    coverImageUrl: string;
    categorySlug: string;
};

const defaultForm: ArticleFormState = {
    title: '',
    slug: '',
    format: articleFormats[0].value,
    excerpt: '',
    status: 'draft',
    coverImageUrl: '',
    categorySlug: '',
};

export function AdminArticlesManager() {
    const [articles, setArticles] = useState<ArticleRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState<ArticleFormState>(defaultForm);
    const [activeMode, setActiveMode] = useState<'create' | 'edit' | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ArticleRecord | null>(null);

    const latestArticles = useMemo(() => articles.slice(0, 6), [articles]);

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

    const openCreate = () => {
        setForm(defaultForm);
        setEditingId(null);
        setActiveMode('create');
        setError(null);
        setSuccess(null);
    };

    const openEdit = (article: ArticleRecord) => {
        setForm({
            title: article.title ?? '',
            slug: article.slug ?? '',
            format: article.format ?? articleFormats[0].value,
            excerpt: article.excerpt ?? '',
            status: article.status ?? 'draft',
            coverImageUrl: article.coverImageUrl ?? '',
            categorySlug: article.categorySlug ?? '',
        });
        setEditingId(article._id);
        setActiveMode('edit');
        setError(null);
        setSuccess(null);
    };

    const closeModal = () => {
        setActiveMode(null);
        setEditingId(null);
        setError(null);
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
            const method = activeMode === 'edit' ? 'PATCH' : 'POST';
            const response = await fetch('/api/admin/articles', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingId,
                    ...form,
                    title,
                    slug,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de sauvegarder cet article.');
            }

            setSuccess(activeMode === 'edit' ? 'Article mis à jour.' : 'Article enregistré avec succès.');
            setForm(defaultForm);
            setActiveMode(null);
            setEditingId(null);
            await loadArticles();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Erreur inconnue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) {
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/admin/articles', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: deleteTarget._id }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de supprimer cet article.');
            }
            setSuccess('Article supprimé.');
            setDeleteTarget(null);
            await loadArticles();
        } catch (deleteError) {
            setError(deleteError instanceof Error ? deleteError.message : 'Erreur inconnue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-main/40">Contenus éditoriaux</p>
                    <h2 className="font-serif-title text-2xl text-main">Articles</h2>
                    <p className="text-sm text-main/60">Pilotez vos publications avec une vue claire, des actions rapides et des contenus bien rangés.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={openCreate}
                        className="rounded-full bg-main px-4 py-2 text-xs font-semibold cursor-pointer uppercase tracking-wide text-white transition hover:bg-main/90"
                    >
                        Nouvel article
                    </button>
                </div>
            </header>

            {success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <div className="rounded-3xl border border-perl/60 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-main">Derniers articles</h3>
                        <span className="text-xs text-main/50">{articles.length} contenus</span>
                    </div>
                    {isLoading ? (
                        <p className="mt-4 text-sm text-main/50">Chargement...</p>
                    ) : articles.length === 0 ? (
                        <div className="mt-4 rounded-2xl border border-dashed border-perl/70 bg-page px-4 py-6 text-sm text-main/60">
                            Aucun article pour le moment. Lancez votre première publication.
                        </div>
                    ) : (
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {articles.map((article) => (
                                <article key={article._id} className="flex h-full flex-col justify-between rounded-2xl border border-perl/50 bg-page p-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs uppercase tracking-[0.2em] text-main/40">{article.format}</span>
                                            <span className="rounded-full border border-perl/70 bg-white px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-main/60">
                                                {article.status === 'published' ? 'Publié' : 'Brouillon'}
                                            </span>
                                        </div>
                                        <h4 className="text-base font-semibold text-main">{article.title}</h4>
                                        <p className="text-xs text-main/60">/{article.slug}</p>
                                        {article.excerpt && <p className="text-xs text-main/50 line-clamp-2">{article.excerpt}</p>}
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openEdit(article)}
                                            className="rounded-full border border-main px-3 py-1 text-xs font-semibold text-main transition hover:bg-main hover:text-white"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeleteTarget(article)}
                                            className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="rounded-3xl border border-perl/60 bg-white p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-main">Focus rédactionnel</h3>
                        <p className="mt-2 text-xs text-main/60">Gardez une ligne éditoriale claire en priorisant les formats les plus consultés.</p>
                        <div className="mt-4 space-y-3">
                            {latestArticles.length === 0 ? (
                                <p className="text-xs text-main/50">Ajoutez un article pour démarrer un suivi de performance.</p>
                            ) : (
                                latestArticles.map((article) => (
                                    <div key={article._id} className="rounded-2xl border border-perl/60 bg-page px-3 py-3">
                                        <p className="text-xs font-semibold text-main">{article.title}</p>
                                        <p className="mt-1 text-[11px] text-main/50">
                                            {article.format} • {article.status === 'published' ? 'Publié' : 'Brouillon'}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {activeMode && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-8">
                    <div className="w-full max-w-3xl rounded-4xl bg-white p-6 shadow-xl">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-main/40">{activeMode === 'edit' ? 'Modifier' : 'Créer'}</p>
                                <h3 className="font-serif-title text-2xl text-main">{activeMode === 'edit' ? 'Mettre à jour l’article' : 'Nouvel article'}</h3>
                                <p className="text-xs text-main/60">Renseignez les informations essentielles, puis sauvegardez.</p>
                            </div>
                            <button type="button" onClick={closeModal} className="text-xs font-semibold uppercase tracking-wide text-main/60">
                                Fermer
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
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
                                <textarea
                                    name="excerpt"
                                    value={form.excerpt}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-2xl border border-perl/60 px-4 py-3 text-sm"
                                    rows={3}
                                />
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

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <p className="text-xs text-main/50">Les champs marqués sont obligatoires pour publier.</p>
                                <button
                                    type="submit"
                                    className="rounded-full bg-main px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enregistrement...' : activeMode === 'edit' ? 'Mettre à jour' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-8">
                    <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-xl">
                        <h3 className="font-serif-title text-xl text-main">Supprimer cet article ?</h3>
                        <p className="mt-2 text-sm text-main/60">Vous êtes sur le point de supprimer “{deleteTarget.title}”. Cette action est définitive.</p>
                        <div className="mt-6 flex flex-wrap justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="rounded-full border border-perl/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-main"
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Suppression...' : 'Supprimer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
