// src/components/courses/CoursesValueProps.tsx

import { Lightbulb, TimerReset, Wand2 } from 'lucide-react';

const VALUE_PROPS = [
    {
        title: 'Une structure rassurante',
        text: 'Chaque cours suit le même fil : introduction, 3 modules guidés, conclusion. Tu sais toujours où tu vas et comment avancer.',
        icon: TimerReset,
        classes: 'border-sage/50 bg-sage/5',
    },
    {
        title: 'Pensé pour les sensibles & autodidactes',
        text: 'Pas de jargon inutile ni de démonstration humiliante : des explications claires, des exemples concrets, de la place pour ton propre rythme.',
        icon: Wand2,
        classes: 'border-rose/50 bg-rose/5',
    },
    {
        title: 'Un impact durable',
        text: 'Les exercices sont rejouables. Tu gardes l’accès, tu reviens sur tes modules préférés et tu constates tes progrès dans la durée.',
        icon: Lightbulb,
        classes: 'border-terre/50 bg-terre/5',
    },
];

export function CoursesValueProps() {
    return (
        <section className="grid gap-5 md:grid-cols-3">
            {VALUE_PROPS.map(({ title, text, classes, icon: Icon }) => (
                <article key={title} className={`card space-y-2 border ${classes}`}>
                    <div className="inline-flex items-center gap-2 rounded-full bg-main/5 px-3 py-1 text-[0.75rem] text-main/70">
                        <Icon className="h-4 w-4" />
                        <span>Pourquoi ce format</span>
                    </div>
                    <h2 className="font-serif-title text-lg">{title}</h2>
                    <p className="text-sm text-main/75">{text}</p>
                </article>
            ))}
        </section>
    );
}
