// src/app/(auth)/deconnexion/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { X, LogOut, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from '@/lib/security/csrf';

function getCsrfTokenFromCookie() {
    return document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith(`${CSRF_COOKIE_NAME}=`))
        ?.split('=')[1];
}

type LogoutStatus = 'idle' | 'loading' | 'success' | 'error';

export default function DeconnexionPage() {
    const router = useRouter();
    const [status, setStatus] = useState<LogoutStatus>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleLogout = useCallback(async () => {
        setStatus('loading');
        setError(null);

        try {
            const csrfToken = getCsrfTokenFromCookie();
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: csrfToken ? { [CSRF_HEADER_NAME]: decodeURIComponent(csrfToken) } : undefined,
            });

            if (!response.ok) {
                throw new Error('Impossible de te déconnecter pour le moment.');
            }

            setStatus('success');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Une erreur est survenue.';
            setError(message);
            setStatus('error');
        }
    }, []);

    useEffect(() => {
        void handleLogout();
    }, [handleLogout]);

    const handleClose = () => {
        router.push('/');
    };

    const showLoader = status === 'loading' || status === 'idle';

    return (
        <main className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6 md:px-6">
            <button type="button" aria-label="Fermer la déconnexion" onClick={handleClose} className="absolute inset-0 -z-10 cursor-default" />

            <section className="relative w-full max-w-md rounded-3xl bg-ivory shadow-xl border border-perl/60 overflow-hidden animate-fade-up">
                <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light bg-[radial-gradient(circle_at_0%_0%,#2f6973_0,transparent_55%),radial-gradient(circle_at_100%_100%,#b45c77_0,transparent_60%)]" />

                <div className="relative p-5 sm:p-6 md:p-7 space-y-5">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1.5 max-w-sm">
                            <p className="section-label section-label-sage">Déconnexion</p>
                            <h1 className="font-serif-title text-xl md:text-2xl leading-snug text-main">On ferme l&apos;atelier pour l&apos;instant</h1>
                            <p className="text-sm text-main/70">Tu pourras revenir dès que tu veux, tes inspirations restent bien au chaud.</p>
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

                    <div className="rounded-2xl border border-perl/55 bg-white/85 p-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage/90 border border-sage/20">
                            {showLoader && <Loader2 className="h-5 w-5 animate-spin" />}
                            {status === 'success' && <CheckCircle2 className="h-5 w-5" />}
                            {status === 'error' && <AlertCircle className="h-5 w-5 text-rose" />}
                        </div>
                        <div className="space-y-1">
                            {status === 'success' ? (
                                <>
                                    <p className="text-sm font-semibold text-main">Tu es bien déconnecté·e.</p>
                                    <p className="text-sm text-main/70">Bonne pause ! Tu peux revenir explorer quand tu veux.</p>
                                </>
                            ) : status === 'error' ? (
                                <>
                                    <p className="text-sm font-semibold text-main">Oups, la déconnexion a échoué.</p>
                                    <p className="text-sm text-main/70">Ressaie dans un instant ou retourne à l&apos;accueil.</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm font-semibold text-main">Déconnexion en cours…</p>
                                    <p className="text-sm text-main/70">On sécurise tes données et on ferme ta session.</p>
                                </>
                            )}
                        </div>
                    </div>

                    {error && <p className="text-[0.78rem] text-rose">{error}</p>}

                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <button
                            type="button"
                            onClick={status === 'success' ? handleClose : handleLogout}
                            disabled={status === 'loading' || status === 'idle'}
                            className="flex-1 cursor-pointer rounded-full bg-sage text-ivory px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-sage/90 disabled:bg-sage/40 disabled:cursor-not-allowed transition"
                        >
                            {status === 'success' ? "Retour à l'accueil" : status === 'error' ? 'Réessayer' : 'Déconnexion…'}
                        </button>

                        <Link
                            href="/connexion"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white/85 px-4 py-2.5 text-sm font-medium text-main/85 hover:bg-ivory hover:border-sage/70 transition"
                        >
                            <LogOut className="h-4 w-4" />
                            Se reconnecter
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
