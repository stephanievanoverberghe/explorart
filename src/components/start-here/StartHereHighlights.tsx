// src/components/start-here/StartHereHighlights.tsx

import { CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react';

const HIGHLIGHTS = [
    {
        title: 'Pensé pour démarrer en sécurité',
        description: 'Chaque module débloque le suivant : tu avances sans te perdre et tu consolides tes bases avant d’explorer plus loin.',
        icon: ShieldCheck,
    },
    {
        title: 'Formats courts et rejouables',
        description: 'Des contenus audio et écrits, conçus pour s’intégrer dans une vraie journée. Tu peux refaire les exercices quand tu veux.',
        icon: CalendarCheck,
    },
    {
        title: 'Aligné avec les autres cours',
        description: 'Le parcours prépare directement les thématiques des cours payants. Tu parles la même langue et tu gagnes du temps.',
        icon: Sparkles,
    },
];

export function StartHereHighlights() {
    return (
        <section className="grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map(({ title, description, icon: Icon }) => (
                <article key={title} className="card border border-sage/40 bg-ivory/90 space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-3 py-1 text-[0.75rem] text-sage">
                        <Icon className="h-4 w-4" />
                        <span>Ce que tu y trouves</span>
                    </div>
                    <h2 className="font-serif-title text-lg text-main">{title}</h2>
                    <p className="text-sm text-main/75">{description}</p>
                </article>
            ))}
        </section>
    );
}
