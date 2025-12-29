'use client';

import { useEffect, useState } from 'react';

const slugRegex = /^[a-z0-9-]+$/;
const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

type CategoryRecord = {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    color?: string;
};

type CategoryFormState = {
    name: string;
    slug: string;
    description: string;
    color: string;
};

const defaultForm: CategoryFormState = {
    name: '',
    slug: '',
    description: '',
    color: '',
};

export function AdminCategoriesManager() {
    const [categories, setCategories] = useState<CategoryRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState<CategoryFormState>(defaultForm);
    const [activeMode, setActiveMode] = useState<'create' | 'edit' | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<CategoryRecord | null>(null);

    const loadCategories = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/categories');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Erreur de chargement.');
            }
            setCategories(data.data ?? []);
        } catch (fetchError) {
            setError(fetchError instanceof Error ? fetchError.message : 'Erreur inconnue.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadCategories();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const openEdit = (category: CategoryRecord) => {
        setForm({
            name: category.name ?? '',
            slug: category.slug ?? '',
            description: category.description ?? '',
            color: category.color ?? '',
        });
        setEditingId(category._id);
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

        const name = form.name.trim();
        const slug = form.slug.trim().toLowerCase();
        const color = form.color.trim();

        if (!name || !slug) {
            setError('Merci de renseigner le nom et le slug.');
            return;
        }

        if (!slugRegex.test(slug)) {
            setError('Le slug doit contenir uniquement des minuscules, chiffres ou tirets.');
            return;
        }

        if (color && !hexRegex.test(color)) {
            setError('La couleur doit être un code hexadécimal valide.');
            return;
        }

        try {
            setIsSubmitting(true);
            const method = activeMode === 'edit' ? 'PATCH' : 'POST';
            const response = await fetch('/api/admin/categories', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingId,
                    ...form,
                    name,
                    slug,
                    color,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de sauvegarder cette catégorie.');
            }
            setSuccess(activeMode === 'edit' ? 'Catégorie mise à jour.' : 'Catégorie enregistrée avec succès.');
            setForm(defaultForm);
            setActiveMode(null);
            setEditingId(null);
            await loadCategories();
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
            const response = await fetch('/api/admin/categories', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: deleteTarget._id }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de supprimer cette catégorie.');
            }
            setSuccess('Catégorie supprimée.');
            setDeleteTarget(null);
            await loadCategories();
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
                    <p className="text-xs uppercase tracking-[0.3em] text-main/40">Structuration</p>
                    <h2 className="font-serif-title text-2xl text-main">Catégories</h2>
                    <p className="text-sm text-main/60">Gardez une taxonomie claire pour retrouver vos contenus en un clic.</p>
                </div>

                <button
                    type="button"
                    onClick={openCreate}
                    className="rounded-full bg-main px-4 py-2 text-xs cursor-pointer font-semibold uppercase tracking-wide text-white transition hover:bg-main/90"
                >
                    Nouvelle catégorie
                </button>
            </header>

            {success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <section className="grid gap-4 md:grid-cols-2">
                {isLoading ? (
                    <p className="text-sm text-main/50">Chargement...</p>
                ) : categories.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-perl/70 bg-page px-4 py-6 text-sm text-main/60">
                        Aucune catégorie pour le moment. Créez une première collection.
                    </div>
                ) : (
                    categories.map((category) => (
                        <article key={category._id} className="rounded-2xl border border-perl/50 bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-main/40">/{category.slug}</p>
                                    <h3 className="text-lg font-semibold text-main">{category.name}</h3>
                                    {category.description && <p className="mt-2 text-xs text-main/60 line-clamp-2">{category.description}</p>}
                                </div>
                                {category.color && (
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-perl/70" style={{ backgroundColor: category.color }} />
                                )}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => openEdit(category)}
                                    className="rounded-full border border-main px-3 py-1 text-xs font-semibold text-main transition hover:bg-main hover:text-white"
                                >
                                    Modifier
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeleteTarget(category)}
                                    className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </section>
            {activeMode && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-8">
                    <div className="w-full max-w-2xl rounded-4xl bg-white p-6 shadow-xl">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-main/40">{activeMode === 'edit' ? 'Modifier' : 'Créer'}</p>
                                <h3 className="font-serif-title text-2xl text-main">{activeMode === 'edit' ? 'Mettre à jour la catégorie' : 'Nouvelle catégorie'}</h3>
                            </div>
                            <button type="button" onClick={closeModal} className="text-xs font-semibold uppercase tracking-wide text-main/60">
                                Fermer
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="text-sm text-main/70">
                                    Nom
                                    <input name="name" value={form.name} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm" />
                                </label>
                                <label className="text-sm text-main/70">
                                    Slug
                                    <input name="slug" value={form.slug} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm" />
                                </label>
                            </div>
                            <label className="text-sm text-main/70">
                                Description
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-2xl border border-perl/60 px-4 py-3 text-sm"
                                    rows={3}
                                />
                            </label>
                            <label className="text-sm text-main/70">
                                Couleur (hex)
                                <input
                                    name="color"
                                    value={form.color}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm"
                                    placeholder="#D8B4A0"
                                />
                            </label>
                            <div className="flex flex-wrap justify-end gap-3">
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
                        <h3 className="font-serif-title text-xl text-main">Supprimer cette catégorie ?</h3>
                        <p className="mt-2 text-sm text-main/60">Vous êtes sur le point de supprimer “{deleteTarget.name}”. Cette action est définitive.</p>
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
