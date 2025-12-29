'use client';

import { useEffect, useState } from 'react';

const resourceTypes = [
    { value: 'download', label: 'Téléchargement' },
    { value: 'external', label: 'Lien externe' },
];

type ResourceRecord = {
    _id: string;
    title: string;
    description?: string;
    fileUrl: string;
    type: string;
};

type ResourceFormState = {
    title: string;
    description: string;
    fileUrl: string;
    type: string;
};

const defaultForm: ResourceFormState = {
    title: '',
    description: '',
    fileUrl: '',
    type: resourceTypes[0].value,
};

export function AdminResourcesManager() {
    const [resources, setResources] = useState<ResourceRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState<ResourceFormState>(defaultForm);
    const [activeMode, setActiveMode] = useState<'create' | 'edit' | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ResourceRecord | null>(null);

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

    const openCreate = () => {
        setForm(defaultForm);
        setEditingId(null);
        setActiveMode('create');
        setError(null);
        setSuccess(null);
    };

    const openEdit = (resource: ResourceRecord) => {
        setForm({
            title: resource.title ?? '',
            description: resource.description ?? '',
            fileUrl: resource.fileUrl ?? '',
            type: resource.type ?? resourceTypes[0].value,
        });
        setEditingId(resource._id);
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
        const fileUrl = form.fileUrl.trim();

        if (!title || !fileUrl) {
            setError('Merci de renseigner le titre et le lien du fichier.');
            return;
        }

        try {
            setIsSubmitting(true);
            const method = activeMode === 'edit' ? 'PATCH' : 'POST';
            const response = await fetch('/api/admin/resources', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingId,
                    ...form,
                    title,
                    fileUrl,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de sauvegarder cette ressource.');
            }
            setSuccess(activeMode === 'edit' ? 'Ressource mise à jour.' : 'Ressource enregistrée avec succès.');
            setForm(defaultForm);
            setActiveMode(null);
            setEditingId(null);
            await loadResources();
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
            const response = await fetch('/api/admin/resources', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: deleteTarget._id }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de supprimer cette ressource.');
            }
            setSuccess('Ressource supprimée.');
            setDeleteTarget(null);
            await loadResources();
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
                    <p className="text-xs uppercase tracking-[0.3em] text-main/40">Bibliothèque</p>
                    <h2 className="font-serif-title text-2xl text-main">Ressources</h2>
                    <p className="text-sm text-main/60">Centralisez les fichiers et liens clés pour vos apprenants.</p>
                </div>
                <button
                    type="button"
                    onClick={openCreate}
                    className="rounded-full bg-main px-4 py-2 cursor-pointer text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-main/90"
                >
                    Nouvelle ressource
                </button>
            </header>

            {success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <section className="grid gap-4 md:grid-cols-2">
                {isLoading ? (
                    <p className="text-sm text-main/50">Chargement...</p>
                ) : resources.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-perl/70 bg-page px-4 py-6 text-sm text-main/60">
                        Aucune ressource pour le moment. Ajoutez un fichier ou un lien clé.
                    </div>
                ) : (
                    resources.map((resource) => (
                        <article key={resource._id} className="rounded-2xl border border-perl/50 bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-main/40">{resource.type}</p>
                                    <h3 className="text-lg font-semibold text-main">{resource.title}</h3>
                                    {resource.description && <p className="mt-2 text-xs text-main/60 line-clamp-2">{resource.description}</p>}
                                </div>
                                <a className="text-xs font-semibold text-main underline" href={resource.fileUrl} target="_blank" rel="noreferrer">
                                    Voir
                                </a>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => openEdit(resource)}
                                    className="rounded-full border border-main px-3 py-1 text-xs font-semibold text-main transition hover:bg-main hover:text-white"
                                >
                                    Modifier
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeleteTarget(resource)}
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
                                <h3 className="font-serif-title text-2xl text-main">{activeMode === 'edit' ? 'Mettre à jour la ressource' : 'Nouvelle ressource'}</h3>
                            </div>
                            <button type="button" onClick={closeModal} className="text-xs font-semibold uppercase tracking-wide text-main/60">
                                Fermer
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
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
                            {isUploading && <p className="text-xs text-main/60">Téléversement en cours…</p>}
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
                        <h3 className="font-serif-title text-xl text-main">Supprimer cette ressource ?</h3>
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
