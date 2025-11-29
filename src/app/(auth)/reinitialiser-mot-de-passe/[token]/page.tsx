// src/app/(auth)/reinitialisation-mot-de-passe/[token]/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { X, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function ReinitialisationMotDePassePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // ⚠️ à vérifier côté backend

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);

    const handleClose = () => {
        router.push('/');
    };

    const validate = () => {
        if (!token) {
            setError('Le lien semble incomplet ou expiré. Merci de demander un nouveau lien.');
            return false;
        }
        if (!password || !confirm) {
            setError('Merci de remplir les deux champs.');
            return false;
        }
        if (password.length < 8) {
            setError('Ton nouveau mot de passe doit contenir au moins 8 caractères.');
            return false;
        }
        if (password !== confirm) {
            setError('Les deux mots de passe ne correspondent pas.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validate()) return;

        setIsSubmitting(true);

        // TODO: appeler ton endpoint de réinitialisation avec { token, password }
        setTimeout(() => {
            setIsSubmitting(false);
            setDone(true);
        }, 700);
    };

    const passwordHint =
        password.length === 0
            ? 'Ton nouveau mot de passe doit faire au moins 8 caractères.'
            : password.length < 8
            ? 'Encore quelques caractères pour atteindre 8.'
            : 'C’est bon pour la longueur — choisis quelque chose que tu retiendras facilement.';

    return (
        <main className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6 md:px-6">
            {/* clic en dehors pour fermer */}
            <button type="button" aria-label="Fermer la fenêtre de réinitialisation" onClick={handleClose} className="absolute inset-0 -z-10 cursor-default" />

            {/* MODAL */}
            <section className="relative w-full max-w-lg rounded-3xl bg-ivory shadow-xl border border-perl/60 overflow-hidden animate-fade-up">
                {/* halo artistique en fond */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light bg-[radial-gradient(circle_at_0%_0%,#5a3c74_0,transparent_55%),radial-gradient(circle_at_100%_100%,#2f6973_0,transparent_60%)]" />

                <div className="relative p-5 sm:p-6 md:p-7 space-y-5">
                    {/* header */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5 max-w-sm">
                            <p className="section-label section-label-sage">Nouveau mot de passe</p>
                            <h1 className="font-serif-title text-xl md:text-2xl leading-snug text-main">On sécurise ton atelier en douceur.</h1>
                            <p className="text-sm text-main/70">
                                Choisis un nouveau mot de passe pour ton compte Explor&apos;Art. Tu pourras ensuite te reconnecter avec tes identifiants habituels.
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
                        {/* nouveau mot de passe */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium uppercase tracking-[0.16em] text-main/65">Nouveau mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-main/35 pointer-events-none" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Au moins 8 caractères"
                                    className="w-full rounded-full border border-perl/70 bg-white/85 pl-9 pr-9 py-2.5 text-sm text-main outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-main/45 hover:text-main/80"
                                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <p className="text-[0.75rem] text-main/55 pt-1">{passwordHint}</p>
                        </div>

                        {/* confirmation */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium uppercase tracking-[0.16em] text-main/65">Confirmation</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-main/35 pointer-events-none" />
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    placeholder="Répète ton nouveau mot de passe"
                                    className="w-full rounded-full border border-perl/70 bg-white/85 pl-9 pr-9 py-2.5 text-sm text-main outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-main/45 hover:text-main/80"
                                    aria-label={showConfirm ? 'Masquer la confirmation' : 'Afficher la confirmation'}
                                >
                                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-[0.8rem] text-rose mt-1">{error}</p>}

                        {done && !error && (
                            <p className="text-[0.8rem] text-sage mt-1">Ton mot de passe a été mis à jour. Tu peux maintenant te connecter avec ce nouveau mot de passe.</p>
                        )}

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting || done}
                                className="flex-1 rounded-full bg-sage text-ivory px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-sage/90 disabled:bg-sage/40 disabled:cursor-not-allowed transition"
                            >
                                {isSubmitting ? 'Mise à jour…' : done ? 'Mot de passe mis à jour' : 'Valider le nouveau mot de passe'}
                            </button>

                            <Link
                                href="/connexion"
                                className="flex-1 inline-flex items-center justify-center rounded-full border border-perl/70 bg-white/85 px-4 py-2.5 text-sm font-medium text-main/85 hover:bg-ivory hover:border-sage/70 transition"
                            >
                                Aller à la connexion
                            </Link>
                        </div>
                    </form>

                    {/* bas de modal */}
                    <div className="pt-1 border-t border-perl/40 mt-3">
                        <p className="text-[0.75rem] text-main/55 pt-3">
                            Si le lien ne fonctionne pas, tu peux recommencer depuis la page{' '}
                            <Link href="/mot-de-passe-oublie" className="underline underline-offset-2 hover:text-sage">
                                mot de passe oublié
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
