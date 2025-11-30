// src/app/(auth)/connexion/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { X, Mail, Lock } from 'lucide-react';

export default function ConnexionPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Connexion impossible pour le moment.');
            }

            router.push('/tableau-de-bord');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Une erreur est survenue.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        router.push('/');
    };

    return (
        <main className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6 md:px-6">
            {/* Click extérieur pour fermer */}
            <button type="button" aria-label="Fermer la connexion" onClick={handleClose} className="absolute inset-0 -z-10 cursor-default" />

            {/* Modal */}
            <section className="relative w-full max-w-md rounded-3xl bg-ivory shadow-xl border border-perl/60 overflow-hidden animate-fade-up">
                {/* Halo de fond */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light bg-[radial-gradient(circle_at_0%_0%,#2f6973_0,transparent_55%),radial-gradient(circle_at_100%_100%,#b45c77_0,transparent_60%)]" />

                <div className="relative p-5 sm:p-6 md:p-7 space-y-5">
                    {/* Header modal */}
                    <div className="flex items-start justify-between">
                        <div className="space-y-1.5 max-w-sm">
                            <p className="section-label section-label-sage">Connexion</p>
                            <h1 className="font-serif-title text-xl md:text-2xl leading-snug text-main">Retrouve ton atelier Explor&apos;Art</h1>
                            <p className="text-sm text-main/70">Accède à tes favoris, tes progressions et les ressources qui t&apos;accompagnent.</p>
                        </div>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="
        flex items-center justify-center
        shrink-0
        h-9 w-9
        rounded-full
        cursor-pointer
        border border-perl/50
        bg-white/90 text-main/60
        shadow-xxs
        hover:bg-ivory hover:text-main hover:border-sage/70
        active:scale-95
        transition-all duration-150
    "
                            aria-label="Fermer"
                        >
                            <X className="h-4 w-4 stroke-[2.2]" />
                        </button>
                    </div>

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium uppercase tracking-[0.16em] text-main/65">Adresse e-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-main/35 pointer-events-none" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="toi@exemple.com"
                                    className="w-full rounded-full border border-perl/70 bg-white/85 pl-9 pr-3 py-2.5 text-sm text-main outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>
                        </div>

                        {/* Mot de passe */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-medium uppercase tracking-[0.16em] text-main/65">Mot de passe</label>
                                <Link href="/mot-de-passe-oublie" className="text-[0.75rem] text-sage/80 hover:text-sage underline underline-offset-2">
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-main/35 pointer-events-none" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-full border border-perl/70 bg-white/85 pl-9 pr-3 py-2.5 text-sm text-main outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>
                        </div>

                        <p className="text-[0.75rem] text-main/55">Jamais de spam, jamais de pub. Juste ton atelier.</p>

                        {error && <p className="text-[0.78rem] text-rose">{error}</p>}

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting || !email || !password}
                                className="flex-1 rounded-full cursor-pointer bg-sage text-ivory px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-sage/90 disabled:bg-sage/40 disabled:cursor-not-allowed transition"
                            >
                                {isSubmitting ? 'Connexion…' : 'Se connecter'}
                            </button>

                            <Link
                                href="/inscription"
                                className="flex-1 cursor-pointer inline-flex items-center justify-center rounded-full border border-perl/70 bg-white/85 px-4 py-2.5 text-sm font-medium text-main/85 hover:bg-ivory hover:border-sage/70 transition"
                            >
                                Créer un compte
                            </Link>
                        </div>
                    </form>

                    {/* Bas du modal */}
                    <div className="pt-1 border-t border-perl/40 mt-3">
                        <p className="text-[0.75rem] text-main/55 pt-3">
                            Tu peux aussi explorer librement&nbsp;:{' '}
                            <Link href="/articles" className="underline cursor-pointer underline-offset-2 hover:text-sage">
                                voir les articles
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
