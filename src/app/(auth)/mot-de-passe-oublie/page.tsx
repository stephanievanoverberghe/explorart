// src/app/(auth)/mot-de-passe-oublie/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { X, Mail } from 'lucide-react';

export default function MotDePasseOubliePage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        router.push('/');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.trim()) {
            setError('Merci d’indiquer ton adresse e-mail.');
            return;
        }

        setIsSubmitting(true);

        // TODO: appel API "forgot password"
        setTimeout(() => {
            setIsSubmitting(false);
            setDone(true);
        }, 600);
    };

    return (
        <main className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6 md:px-6">
            {/* click en dehors pour fermer */}
            <button type="button" aria-label="Fermer la fenêtre mot de passe oublié" onClick={handleClose} className="absolute inset-0 -z-10 cursor-default" />

            {/* MODAL */}
            <section className="relative w-full max-w-lg rounded-3xl bg-ivory shadow-xl border border-perl/60 overflow-hidden animate-fade-up">
                {/* halo fond artistique */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light bg-[radial-gradient(circle_at_0%_0%,#2f6973_0,transparent_55%),radial-gradient(circle_at_100%_100%,#b45c77_0,transparent_60%)]" />

                <div className="relative p-5 sm:p-6 md:p-7 space-y-5">
                    {/* header */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5 max-w-sm">
                            <p className="section-label section-label-sage">Mot de passe oublié</p>
                            <h1 className="font-serif-title text-xl md:text-2xl leading-snug text-main">On t’envoie un lien tout doux.</h1>
                            <p className="text-sm text-main/70">
                                Indique l’adresse e-mail liée à ton compte Explor&apos;Art. Si elle existe chez nous, tu recevras un lien pour choisir un nouveau mot de passe.
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
                            <p className="text-[0.75rem] text-main/55 pt-1">
                                Par sécurité, le message ne dira jamais si le compte existe ou non. Pense à vérifier tes spams si tu ne vois rien arriver.
                            </p>
                        </div>

                        {error && <p className="text-[0.78rem] text-rose mt-1">{error}</p>}

                        {done && !error && (
                            <p className="text-[0.78rem] text-sage mt-1">
                                Si cette adresse existe dans notre atelier, un lien de réinitialisation vient de t’être envoyé. Tu peux fermer cette fenêtre après avoir vérifié ta
                                boîte mail.
                            </p>
                        )}

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 rounded-full bg-sage text-ivory px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-sage/90 disabled:bg-sage/40 disabled:cursor-not-allowed transition"
                            >
                                {isSubmitting ? 'Envoi en cours…' : 'Recevoir le lien'}
                            </button>

                            <Link
                                href="/connexion"
                                className="flex-1 inline-flex items-center justify-center rounded-full border border-perl/70 bg-white/85 px-4 py-2.5 text-sm font-medium text-main/85 hover:bg-ivory hover:border-sage/70 transition"
                            >
                                Retour à la connexion
                            </Link>
                        </div>
                    </form>

                    {/* bas de modal */}
                    <div className="pt-1 border-t border-perl/40 mt-3">
                        <p className="text-[0.75rem] text-main/55 pt-3">
                            Besoin d’aide supplémentaire ? Tu pourras toujours me contacter depuis la page{' '}
                            <Link href="/a-propos" className="underline underline-offset-2 hover:text-sage">
                                À propos
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
