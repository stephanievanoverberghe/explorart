'use client';

import { useEffect, useState } from 'react';

const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

type PaletteRecord = {
    _id: string;
    name: string;
    description?: string;
    colors: string[];
};

type PaletteFormState = {
    name: string;
    description: string;
    colors: string;
};

const defaultForm: PaletteFormState = {
    name: '',
    description: '',
    colors: '',
};

export function AdminPalettesManager() {
    const [palettes, setPalettes] = useState<PaletteRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState<PaletteFormState>(defaultForm);
    const [activeMode, setActiveMode] = useState<'create' | 'edit' | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<PaletteRecord | null>(null);

    const loadPalettes = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/palettes');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Erreur de chargement.');
            }
            setPalettes(data.data ?? []);
        } catch (fetchError) {
            setError(fetchError instanceof Error ? fetchError.message : 'Erreur inconnue.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadPalettes();
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

    const openEdit = (palette: PaletteRecord) => {
        setForm({
            name: palette.name ?? '',
            description: palette.description ?? '',
            colors: palette.colors?.join(', ') ?? '',
        });
        setEditingId(palette._id);
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
        const colors = form.colors
            .split(',')
            .map((color) => color.trim())
            .filter(Boolean);

        if (!name) {
            setError('Merci de renseigner le nom de la palette.');
            return;
        }

        const invalidColor = colors.find((color) => !hexRegex.test(color));
        if (invalidColor) {
            setError(`Couleur invalide : ${invalidColor}`);
            return;
        }

        try {
            setIsSubmitting(true);
            const method = activeMode === 'edit' ? 'PATCH' : 'POST';
            const response = await fetch('/api/admin/palettes', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingId,
                    name,
                    description: form.description.trim(),
                    colors,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de sauvegarder cette palette.');
            }
            setSuccess(activeMode === 'edit' ? 'Palette mise à jour.' : 'Palette enregistrée avec succès.');
            setForm(defaultForm);
            setActiveMode(null);
            setEditingId(null);
            await loadPalettes();
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
            const response = await fetch('/api/admin/palettes', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: deleteTarget._id }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de supprimer cette palette.');
            }
            setSuccess('Palette supprimée.');
            setDeleteTarget(null);
            await loadPalettes();
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
                    <p className="text-xs uppercase tracking-[0.3em] text-main/40">Couleurs</p>
                    <h2 className="font-serif-title text-2xl text-main">Palettes</h2>
                    <p className="text-sm text-main/60">Supervisez vos palettes de couleurs et gardez une cohérence visuelle globale.</p>
                </div>

                <button
                    type="button"
                    onClick={openCreate}
                    className="rounded-full bg-main px-4 py-2 cursor-pointer text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-main/90"
                >
                    Nouvelle palette
                </button>
            </header>

            {success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <section className="grid gap-4 md:grid-cols-2">
                {isLoading ? (
                    <p className="text-sm text-main/50">Chargement...</p>
                ) : palettes.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-perl/70 bg-page px-4 py-6 text-sm text-main/60">
                        Aucune palette pour le moment. Ajoutez un premier set de couleurs.
                    </div>
                ) : (
                    palettes.map((palette) => (
                        <article key={palette._id} className="rounded-2xl border border-perl/50 bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-main">{palette.name}</h3>
                                    {palette.description && <p className="mt-2 text-xs text-main/60 line-clamp-2">{palette.description}</p>}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {palette.colors?.slice(0, 6).map((color) => (
                                        <span key={color} className="h-5 w-5 rounded-full border border-perl/60" style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => openEdit(palette)}
                                    className="rounded-full border border-main px-3 py-1 text-xs font-semibold text-main transition hover:bg-main hover:text-white"
                                >
                                    Modifier
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeleteTarget(palette)}
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
                                <h3 className="font-serif-title text-2xl text-main">{activeMode === 'edit' ? 'Mettre à jour la palette' : 'Nouvelle palette'}</h3>
                            </div>
                            <button type="button" onClick={closeModal} className="text-xs font-semibold uppercase tracking-wide text-main/60">
                                Fermer
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                            <label className="text-sm text-main/70">
                                Nom
                                <input name="name" value={form.name} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm" />
                            </label>
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
                                Couleurs (hex, séparées par des virgules)
                                <input
                                    name="colors"
                                    value={form.colors}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm"
                                    placeholder="#E0B1A1, #F7D6C1"
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
                        <h3 className="font-serif-title text-xl text-main">Supprimer cette palette ?</h3>
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
