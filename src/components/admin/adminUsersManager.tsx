'use client';

import { useEffect, useState } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type UserRecord = {
    _id?: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    createdAt?: string;
};

type UserFormState = {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
};

const defaultForm: UserFormState = {
    name: '',
    email: '',
    password: '',
    role: 'user',
};

export function AdminUsersManager() {
    const [users, setUsers] = useState<UserRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState<UserFormState>(defaultForm);
    const [activeMode, setActiveMode] = useState<'create' | 'edit' | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<UserRecord | null>(null);

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Erreur de chargement.');
            }
            setUsers(data.data ?? []);
        } catch (fetchError) {
            setError(fetchError instanceof Error ? fetchError.message : 'Erreur inconnue.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadUsers();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const openEdit = (user: UserRecord) => {
        setForm({
            name: user.name ?? '',
            email: user.email ?? '',
            password: '',
            role: user.role ?? 'user',
        });
        setEditingId(user._id ?? null);
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
        const email = form.email.trim().toLowerCase();

        if (!name || !email || (activeMode === 'create' && !form.password.trim())) {
            setError('Merci de renseigner le nom, l’e-mail et le mot de passe.');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Adresse e-mail invalide.');
            return;
        }

        if (form.password.trim() && form.password.trim().length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        try {
            setIsSubmitting(true);
            const method = activeMode === 'edit' ? 'PATCH' : 'POST';
            const payload = {
                id: editingId,
                ...form,
                name,
                email,
                password: form.password.trim(),
            };
            const response = await fetch('/api/admin/users', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de sauvegarder cet utilisateur.');
            }
            setSuccess(activeMode === 'edit' ? 'Utilisateur mis à jour.' : 'Utilisateur créé avec succès.');
            setForm(defaultForm);
            setActiveMode(null);
            setEditingId(null);
            await loadUsers();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Erreur inconnue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget?._id) {
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/admin/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: deleteTarget._id }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de supprimer cet utilisateur.');
            }
            setSuccess('Utilisateur supprimé.');
            setDeleteTarget(null);
            await loadUsers();
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
                    <p className="text-xs uppercase tracking-[0.3em] text-main/40">Communauté</p>
                    <h2 className="font-serif-title text-2xl text-main">Utilisateurs</h2>
                    <p className="text-sm text-main/60">Gardez une vue synthétique sur les comptes, les rôles et les accès.</p>
                </div>

                <button
                    type="button"
                    onClick={openCreate}
                    className="rounded-full bg-main px-4 py-2 text-xs cursor-pointer font-semibold uppercase tracking-wide text-white transition hover:bg-main/90"
                >
                    Nouvel utilisateur
                </button>
            </header>

            {success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <section className="grid gap-4 md:grid-cols-2">
                {isLoading ? (
                    <p className="text-sm text-main/50">Chargement...</p>
                ) : users.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-perl/70 bg-page px-4 py-6 text-sm text-main/60">
                        Aucun utilisateur pour le moment. Ajoutez vos premiers comptes.
                    </div>
                ) : (
                    users.map((user) => (
                        <article key={user._id ?? user.email} className="rounded-2xl border border-perl/50 bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-main/40">{user.role}</p>
                                    <h3 className="text-lg font-semibold text-main">{user.name}</h3>
                                    <p className="mt-1 text-xs text-main/60">{user.email}</p>
                                </div>
                                <span
                                    className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                                        user.role === 'admin' ? 'border-main/40 bg-main/10 text-main' : 'border-perl/70 bg-page text-main/50'
                                    }`}
                                >
                                    {user.role}
                                </span>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => openEdit(user)}
                                    className="rounded-full border border-main px-3 py-1 text-xs font-semibold text-main transition hover:bg-main hover:text-white"
                                >
                                    Modifier
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeleteTarget(user)}
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
                                <h3 className="font-serif-title text-2xl text-main">{activeMode === 'edit' ? 'Mettre à jour le compte' : 'Nouvel utilisateur'}</h3>
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
                                    E-mail
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm"
                                    />
                                </label>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="text-sm text-main/70">
                                    Mot de passe
                                    <input
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm"
                                        placeholder={activeMode === 'edit' ? 'Laissez vide pour ne pas modifier' : ''}
                                    />
                                </label>
                                <label className="text-sm text-main/70">
                                    Rôle
                                    <select name="role" value={form.role} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm">
                                        <option value="user">Utilisateur</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </label>
                            </div>

                            <div className="flex flex-wrap justify-end gap-3">
                                <button
                                    type="submit"
                                    className="rounded-full bg-main px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enregistrement...' : activeMode === 'edit' ? 'Mettre à jour' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-8">
                    <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-xl">
                        <h3 className="font-serif-title text-xl text-main">Supprimer cet utilisateur ?</h3>
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
