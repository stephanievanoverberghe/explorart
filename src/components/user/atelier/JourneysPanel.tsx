import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { mockMiniFormation } from './atelier-data';

export function JourneysPanel() {
    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Parcours guidés</p>
                <h2 className="font-serif-title text-xl md:text-2xl text-main">Tes parcours & mini-formations</h2>
                <p className="text-sm text-main/70 max-w-2xl">Ici, tu retrouveras toutes les mini-formations et parcours thématiques que tu suis (ou que tu as terminés).</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Mini-formation actuelle */}
                <div className="rounded-3xl border border-perl/60 bg-white/95 p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">En cours</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-sage/10 px-2.5 py-0.5 text-[0.7rem] text-sage">
                            <Sparkles className="h-3 w-3" />
                            Prioritaire
                        </span>
                    </div>
                    <Link href={mockMiniFormation.href} className="font-serif-title text-lg text-main hover:underline decoration-1 underline-offset-4">
                        {mockMiniFormation.title}
                    </Link>
                    <p className="text-sm text-main/70">{mockMiniFormation.currentStep}</p>
                    <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-[0.75rem] text-main/60">
                            <span>Progression</span>
                            <span>{mockMiniFormation.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-perl/25 overflow-hidden">
                            <div className="h-full rounded-full bg-sage transition-all" style={{ width: `${mockMiniFormation.progress}%` }} />
                        </div>
                    </div>
                    <div className="pt-2">
                        <Link
                            href={mockMiniFormation.href}
                            className="inline-flex items-center justify-center rounded-full bg-sage px-4 py-2.5 text-sm font-medium text-ivory shadow-sm hover:bg-sage/90 transition"
                        >
                            Reprendre ce parcours
                        </Link>
                    </div>
                </div>

                {/* place-holder parcours futurs */}
                <div className="rounded-3xl border border-dashed border-perl/60 bg-ivory/80 p-5 shadow-xxs space-y-3">
                    <h3 className="font-serif-title text-base md:text-lg text-main">Parcours à venir</h3>
                    <p className="text-sm text-main/70">
                        Bientôt : des parcours thématiques (couleurs, psychologie de l’art, histoire de l’art…) avec modules, exercices et ressources téléchargeables.
                    </p>
                    <p className="text-[0.8rem] text-main/55">Tu pourras suivre ton avancée, reprendre là où tu t’es arrêtée et débloquer des bonus en fin de parcours.</p>
                </div>
            </div>
        </section>
    );
}
