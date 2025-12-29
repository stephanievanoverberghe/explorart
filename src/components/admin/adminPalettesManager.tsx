'use client';

import { useEffect, useState } from 'react';

const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

type PaletteRecord = {
    _id: string;
    name: string;
    colors: string[];
};

export function AdminPalettesManager() {
    const [palettes, setPalettes] = useState<PaletteRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: '',
        description: '',
        colors: '',
    });

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
            const response = await fetch('/api/admin/palettes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    description: form.description.trim(),
                    colors,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de créer cette palette.');
            }
            setSuccess('Palette enregistrée avec succès.');
            setForm({ name: '', description: '', colors: '' });
            await loadPalettes();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Erreur inconnue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h2 className="font-serif-title text-xl text-main">Palettes</h2>
                <p className="text-sm text-main/60">Centralisez les palettes proposées dans les contenus.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-perl/60 bg-white p-6">
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

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <button
                    type="submit"
                    className="w-full rounded-full bg-main px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer la palette'}
                </button>
            </form>

            <section className="space-y-3">
                <h3 className="text-sm font-semibold text-main/70">Palettes récentes</h3>
                {isLoading ? (
                    <p className="text-sm text-main/50">Chargement...</p>
                ) : palettes.length === 0 ? (
                    <p className="text-sm text-main/50">Aucune palette pour le moment.</p>
                ) : (
                    <ul className="space-y-2 text-sm text-main/70">
                        {palettes.map((palette) => (
                            <li key={palette._id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-perl/50 bg-white/70 px-4 py-2">
                                <span className="font-medium text-main">{palette.name}</span>
                                <div className="flex items-center gap-2">
                                    {palette.colors?.slice(0, 5).map((color) => (
                                        <span key={color} className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
