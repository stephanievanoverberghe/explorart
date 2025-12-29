'use client';

import { useEffect, useState } from 'react';

const resourceTypes = [
    { value: 'download', label: 'Téléchargement' },
    { value: 'external', label: 'Lien externe' },
];

type ResourceRecord = {
    _id: string;
    title: string;
    fileUrl: string;
    type: string;
};

export function AdminResourcesManager() {
    const [resources, setResources] = useState<ResourceRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        fileUrl: '',
        type: resourceTypes[0].value,
    });

    const loadResources = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/resources');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Erreur de chargement.');
            }
            setResources(data.data ?? []);
        } catch (fetchError) {
            setError(fetchError instanceof Error ? fetchError.message : 'Erreur inconnue.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadResources();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        setError(null);
        setSuccess(null);

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/admin/media', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de téléverser ce fichier.');
            }

            setForm((prev) => ({ ...prev, fileUrl: data.url }));
            setSuccess('Fichier téléversé.');
        } catch (uploadError) {
            setError(uploadError instanceof Error ? uploadError.message : 'Erreur inconnue.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const title = form.title.trim();
        const fileUrl = form.fileUrl.trim();

        if (!title || !fileUrl) {
            setError('Merci de renseigner le titre et le lien du fichier.');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/admin/resources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    title,
                    fileUrl,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de créer cette ressource.');
            }
            setSuccess('Ressource enregistrée avec succès.');
            setForm({ title: '', description: '', fileUrl: '', type: resourceTypes[0].value });
            await loadResources();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Erreur inconnue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h2 className="font-serif-title text-xl text-main">Ressources</h2>
                <p className="text-sm text-main/60">Ajoutez des fichiers ou liens utiles pour la communauté.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-perl/60 bg-white p-6">
                <label className="text-sm text-main/70">
                    Titre
                    <input name="title" value={form.title} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm" />
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
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-main/70">
                        Type
                        <select name="type" value={form.type} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm">
                            {resourceTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="text-sm text-main/70">
                        URL du fichier
                        <input
                            name="fileUrl"
                            value={form.fileUrl}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm"
                            placeholder="/uploads/ressource.pdf"
                        />
                    </label>
                </div>
                <label className="text-sm text-main/70">
                    Téléverser un fichier
                    <input type="file" onChange={handleUpload} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm" />
                </label>
                {isUploading && <p className="text-sm text-main/60">Téléversement en cours…</p>}

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <button
                    type="submit"
                    className="w-full rounded-full bg-main px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer la ressource'}
                </button>
            </form>

            <section className="space-y-3">
                <h3 className="text-sm font-semibold text-main/70">Ressources récentes</h3>
                {isLoading ? (
                    <p className="text-sm text-main/50">Chargement...</p>
                ) : resources.length === 0 ? (
                    <p className="text-sm text-main/50">Aucune ressource pour le moment.</p>
                ) : (
                    <ul className="space-y-2 text-sm text-main/70">
                        {resources.map((resource) => (
                            <li key={resource._id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-perl/50 bg-white/70 px-4 py-2">
                                <span className="font-medium text-main">{resource.title}</span>
                                <span className="text-xs text-main/60">{resource.type}</span>
                                <a className="text-xs text-main underline" href={resource.fileUrl}>
                                    {resource.fileUrl}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
