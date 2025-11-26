// src/app/(public)/commencer-ici/page.tsx
'use client';

import StartHere from '@/components/start-here/StartHere';

export default function StartHerePage() {
    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                {/* HEADER GLOBAL FORMATION */}
                <div className="space-y-4 max-w-3xl animate-fade-up">
                    <div className="flex flex-wrap items-center gap-3">
                        <p className="section-label section-label-sage">Mini-formation — Commencer ici</p>
                        <span className="text-[0.72rem] uppercase tracking-[0.18em] text-main/70">5 modules · geste · regard · couleurs</span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl leading-tight">
                            Prendre confiance avec l&apos;art,
                            <br />
                            <span className="text-sage">comme une petite formation à ton rythme.</span>
                        </h1>
                        <p className="text-main/75 text-sm md:text-base max-w-2xl">
                            Tu vas suivre un parcours court, mais pensé comme une vraie mini-formation : introduction, trois étapes guidées, puis une conclusion pour savoir comment
                            continuer. Les modules se débloquent au fur et à mesure, pour t&apos;accompagner pas à pas.
                        </p>
                    </div>
                </div>

                {/* Corps de la mini-formation */}
                <StartHere />
            </div>
        </section>
    );
}
