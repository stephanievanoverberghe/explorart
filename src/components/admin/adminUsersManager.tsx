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

export function AdminUsersManager() {
    const [users, setUsers] = useState<UserRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const name = form.name.trim();
        const email = form.email.trim().toLowerCase();

        if (!name || !email || !form.password.trim()) {
            setError('Merci de renseigner le nom, l’e-mail et le mot de passe.');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Adresse e-mail invalide.');
            return;
        }

        if (form.password.trim().length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    name,
                    email,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Impossible de créer cet utilisateur.');
            }
            setSuccess('Utilisateur créé avec succès.');
            setForm({ name: '', email: '', password: '', role: 'user' });
            await loadUsers();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Erreur inconnue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h2 className="font-serif-title text-xl text-main">Utilisateurs</h2>
                <p className="text-sm text-main/60">Gérez les comptes utilisateurs et les rôles admin.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-perl/60 bg-white p-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-main/70">
                        Nom
                        <input name="name" value={form.name} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm" />
                    </label>
                    <label className="text-sm text-main/70">
                        E-mail
                        <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-2 w-full rounded-full border border-perl/60 px-4 py-2 text-sm" />
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

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <button
                    type="submit"
                    className="w-full rounded-full bg-main px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Enregistrement...' : 'Créer l’utilisateur'}
                </button>
            </form>

            <section className="space-y-3">
                <h3 className="text-sm font-semibold text-main/70">Utilisateurs récents</h3>
                {isLoading ? (
                    <p className="text-sm text-main/50">Chargement...</p>
                ) : users.length === 0 ? (
                    <p className="text-sm text-main/50">Aucun utilisateur pour le moment.</p>
                ) : (
                    <ul className="space-y-2 text-sm text-main/70">
                        {users.map((user) => (
                            <li key={user._id ?? user.email} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-perl/50 bg-white/70 px-4 py-2">
                                <span className="font-medium text-main">{user.name}</span>
                                <span>{user.email}</span>
                                <span className="text-xs uppercase tracking-[0.2em] text-main/50">{user.role}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
