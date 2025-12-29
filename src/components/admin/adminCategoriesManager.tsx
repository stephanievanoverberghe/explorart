'use client';

import { useEffect, useState } from 'react';

const slugRegex = /^[a-z0-9-]+$/;
const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

type CategoryRecord = {
    _id: string;
    name: string;
    slug: string;
    color?: string;
};

export function AdminCategoriesManager() {
    const [categories, setCategories] = useState<CategoryRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: '',
        slug: '',
        description: '',
        color: '',
    });

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
            const response = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    name,
                    slug,
                    color,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de créer cette catégorie.');
            }
            setSuccess('Catégorie enregistrée avec succès.');
            setForm({ name: '', slug: '', description: '', color: '' });
            await loadCategories();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Erreur inconnue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h2 className="font-serif-title text-xl text-main">Catégories</h2>
                <p className="text-sm text-main/60">Organisez les univers et thématiques des contenus.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-perl/60 bg-white p-6">
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

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <button
                    type="submit"
                    className="w-full rounded-full bg-main px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer la catégorie'}
                </button>
            </form>

            <section className="space-y-3">
                <h3 className="text-sm font-semibold text-main/70">Catégories récentes</h3>
                {isLoading ? (
                    <p className="text-sm text-main/50">Chargement...</p>
                ) : categories.length === 0 ? (
                    <p className="text-sm text-main/50">Aucune catégorie pour le moment.</p>
                ) : (
                    <ul className="space-y-2 text-sm text-main/70">
                        {categories.map((category) => (
                            <li key={category._id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-perl/50 bg-white/70 px-4 py-2">
                                <span className="font-medium text-main">{category.name}</span>
                                <span>{category.slug}</span>
                                {category.color && (
                                    <span className="flex items-center gap-2 text-xs text-main/60">
                                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                                        {category.color}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
