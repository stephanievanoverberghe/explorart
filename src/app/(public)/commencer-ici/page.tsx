// src/app/(public)/commencer-ici/page.tsx
'use client';

import StartHere from '@/components/start-here/StartHere';
import { StartHereHero } from '@/components/start-here/StartHereHero';
import { StartHereHighlights } from '@/components/start-here/StartHereHighlights';
import Link from 'next/link';

export default function StartHerePage() {
    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                <StartHereHero />

                <StartHereHighlights />

                <div id="parcours-commencer" className="space-y-4 animate-fade-up">
                    <div className="space-y-1">
                        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">Modules guidés</p>
                        <h2 className="font-serif-title text-xl md:text-2xl text-main">Le parcours complet</h2>
                        <p className="text-sm text-main/70 max-w-2xl">
                            Suis les modules dans l’ordre : ils se débloquent au fur et à mesure pour te donner le bon niveau de profondeur sans te surcharger.
                        </p>
                    </div>
                </div>
                <StartHere />

                <section className="card bg-background space-y-4">
                    <div className="space-y-1">
                        <p className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">Et après ?</p>
                        <h3 className="font-serif-title text-lg md:text-xl">Prolonge le chemin à ton rythme</h3>
                        <p className="text-sm text-main/70 max-w-2xl">
                            Une fois les bases posées, tu peux explorer des articles ciblés, piocher des ressources ou choisir un cours pour t&apos;entraîner en douceur.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/articles" className="btn btn-secondary">
                            Explorer les articles
                        </Link>
                        <Link href="/ressources" className="btn btn-primary">
                            Découvrir les ressources
                        </Link>
                        <Link href="/cours" className="btn btn-secondary">
                            Voir les cours
                        </Link>
                    </div>
                </section>
            </div>
        </section>
    );
}
