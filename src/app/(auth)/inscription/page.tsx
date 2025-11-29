// src/app/(auth)/inscription/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';

export default function InscriptionPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name || !email || !password || !confirmPassword) {
            setError('Merci de remplir tous les champs.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        if (!acceptTerms) {
            setError('Tu dois accepter la politique de confidentialité pour continuer.');
            return;
        }

        setIsSubmitting(true);

        // TODO: appel API inscription
        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/tableau-de-bord');
        }, 500);
    };

    const handleClose = () => {
        router.push('/');
    };

    return (
        <main className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6 md:px-6">
            {/* click en dehors pour fermer */}
            <button type="button" aria-label="Fermer la fenêtre d’inscription" onClick={handleClose} className="absolute inset-0 -z-10 cursor-default" />

            {/* MODAL */}
            <section className="relative w-full max-w-lg rounded-3xl bg-ivory shadow-xl border border-perl/60 overflow-hidden animate-fade-up">
                {/* halo fond artistique */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light bg-[radial-gradient(circle_at_0%_0%,#2f6973_0,transparent_55%),radial-gradient(circle_at_100%_100%,#b45c77_0,transparent_60%)]" />

                <div className="relative p-5 sm:p-6 md:p-7 space-y-5">
                    {/* header */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5 max-w-sm">
                            <p className="section-label section-label-sage">Créer ton compte</p>
                            <h1 className="font-serif-title text-xl md:text-2xl leading-snug text-main">Ton atelier Explor&apos;Art, rien qu&apos;à toi.</h1>
                            <p className="text-sm text-main/70">
                                En quelques clics, tu pourras garder tes favoris, suivre ta progression et retrouver tes ressources en un seul endroit.
                            </p>
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

                    {/* formulaire */}
                    <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                        {/* Nom */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium uppercase tracking-[0.16em] text-main/65">Prénom ou pseudo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-main/35 pointer-events-none" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Comment tu veux qu’on t’appelle ?"
                                    className="w-full rounded-full border border-perl/70 bg-white/85 pl-9 pr-3 py-2.5 text-sm text-main outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium uppercase tracking-[0.16em] text-main/65">Adresse e-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-main/35 pointer-events-none" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="toi@exemple.com"
                                    className="w-full rounded-full border border-perl/70 bg-white/85 pl-9 pr-3 py-2.5 text-sm text-main outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                            </div>
                        </div>

                        {/* MDP */}
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-medium uppercase tracking-[0.16em] text-main/65">Mot de passe</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-main/35 pointer-events-none" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded-full border border-perl/70 bg-white/85 pl-9 pr-3 py-2.5 text-sm text-main outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium uppercase tracking-[0.16em] text-main/65">Confirmer</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-main/35 pointer-events-none" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded-full border border-perl/70 bg-white/85 pl-9 pr-3 py-2.5 text-sm text-main outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Consentement */}
                        <div className="space-y-2 pt-1">
                            <label className="flex items-start gap-2 text-[0.78rem] text-main/70">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 rounded border-perl/70 text-sage focus:ring-sage/40"
                                />
                                <span>
                                    J’accepte la{' '}
                                    <Link href="/mentions-legales" className="underline underline-offset-2 hover:text-sage">
                                        politique de confidentialité
                                    </Link>{' '}
                                    et je comprends que je peux me désinscrire à tout moment.
                                </span>
                            </label>
                            <p className="text-[0.72rem] text-main/50">Pas de spam, pas de revente de données. Juste les outils dont tu as besoin pour créer plus sereinement.</p>
                        </div>

                        {error && <p className="text-[0.78rem] text-rose mt-1">{error}</p>}

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 rounded-full bg-sage text-ivory px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-sage/90 disabled:bg-sage/40 disabled:cursor-not-allowed transition"
                            >
                                {isSubmitting ? 'Création en cours…' : 'Créer mon compte'}
                            </button>

                            <Link
                                href="/connexion"
                                className="flex-1 inline-flex items-center justify-center rounded-full border border-perl/70 bg-white/85 px-4 py-2.5 text-sm font-medium text-main/85 hover:bg-ivory hover:border-sage/70 transition"
                            >
                                J’ai déjà un compte
                            </Link>
                        </div>
                    </form>

                    {/* bas de modal */}
                    <div className="pt-1 border-t border-perl/40 mt-3">
                        <p className="text-[0.75rem] text-main/55 pt-3">
                            Tu peux aussi continuer à explorer librement&nbsp;:{' '}
                            <Link href="/articles" className="underline underline-offset-2 hover:text-sage">
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
