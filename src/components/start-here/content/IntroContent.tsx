// src/components/start-here/content/IntroContent.tsx
import Link from 'next/link';
import { Download } from 'lucide-react';
import VideoBlock from './VideoBlock';

export default function IntroContent() {
    return (
        <div className="space-y-8 md:space-y-10">
            {/* HEADER INTRO GLOBAL */}
            <header className="space-y-3 md:space-y-4">
                <p className="inline-flex items-center rounded-full bg-sage/8 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-sage">Parcours débutant · Commencer ici</p>
                <div className="space-y-2">
                    <h2 className="font-serif-title text-xl md:text-2xl">Avant de commencer : comment profiter au mieux de ce parcours</h2>
                    <p className="text-sm md:text-base text-main/75 max-w-2xl">
                        Ce parcours débutant est pensé comme une première marche douce vers le dessin et l&apos;art. Tu n&apos;as pas besoin de « savoir dessiner » ni de tout faire
                        d&apos;un coup : on avance ensemble, pas à pas, avec des exercices simples et des temps de pause pour ton regard.
                    </p>
                </div>
            </header>

            {/* VIDÉO D'INTRO + TEXTE CÔTÉ À CÔTÉ SUR DESKTOP */}
            <section className="card space-y-4 md:space-y-0 md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] md:gap-6 items-start">
                <div className="space-y-2">
                    <h3 className="font-serif-title text-lg">Vidéo d&apos;introduction au parcours</h3>
                    <p className="text-sm text-main/70 max-w-md">
                        Dans cette vidéo, je te présente le parcours, mon intention, et la meilleure façon de l&apos;utiliser. C&apos;est ton petit mot d&apos;accueil pour entrer
                        dans Explor&apos;Art en douceur.
                    </p>
                    <p className="text-[0.8rem] text-main/60">
                        Tu peux regarder la vidéo une première fois tranquillement, puis revenir dessus après quelques modules si tu as besoin de te recentrer.
                    </p>
                </div>

                <VideoBlock title="Présentation du parcours" youtubeId="eNuOpMOPorU" cover="/start-here/intro-cover.png" />
            </section>

            {/* RÉSUMÉ + À QUI ÇA S'ADRESSE */}
            <section className="grid gap-5 md:grid-cols-2">
                <div className="card bg-ivory/90 space-y-3">
                    <h3 className="font-serif-title text-lg">Ce que tu vas vivre dans ce parcours</h3>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Reprendre un crayon sans pression ni jugement.</li>
                        <li>• Apprendre à regarder une image avec quelques questions simples.</li>
                        <li>• Explorer comment les couleurs jouent avec tes émotions.</li>
                        <li>• Terminer avec une petite conclusion personnelle, pour savoir comment continuer.</li>
                    </ul>
                </div>

                <div className="card space-y-3">
                    <h3 className="font-serif-title text-lg">À qui ce parcours est destiné</h3>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Tu te sens « rouillée » ou débutante et tu ne sais pas par où commencer.</li>
                        <li>• Tu as envie de retrouver un lien simple et doux avec le dessin.</li>
                        <li>• Tu n&apos;as pas beaucoup de temps, mais tu veux avancer un peu chaque semaine.</li>
                        <li>• Tu as besoin d&apos;un cadre rassurant, sans performance ni compétition.</li>
                    </ul>
                </div>
            </section>

            {/* RESSOURCES À TÉLÉCHARGER */}
            <section className="card bg-ivory/95 border-perl/70 space-y-4">
                <div className="flex flex-col gap-1">
                    <h3 className="font-serif-title text-lg">Ressources à télécharger pour ce parcours</h3>
                    <p className="text-sm text-main/70 max-w-2xl">
                        Tu peux télécharger ces supports et les garder sous la main pendant toute la mini-formation. Ils t&apos;aideront à suivre les exercices sans avoir à tout
                        retenir.
                    </p>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                    <DownloadRow
                        label="Kit du parcours débutant (PDF)"
                        description="Résumé des modules, checklists et petits rappels pour chaque étape."
                        href="/downloads/parcours-debutant-kit.pdf"
                    />
                    <DownloadRow
                        label="Fiches d’exercices imprimables"
                        description="Pages prêtes à imprimer pour noter tes observations et tes dessins."
                        href="/downloads/parcours-debutant-fiches-exercices.pdf"
                    />
                    <DownloadRow
                        label="Mini-nuancier à compléter"
                        description="Une page dédiée aux couleurs que tu découvriras au fil du parcours."
                        href="/downloads/parcours-debutant-nuancier.pdf"
                    />
                </div>
            </section>

            {/* COMMENT AVANCER + MATÉRIEL */}
            <section className="grid gap-5 md:grid-cols-2">
                <div className="card space-y-3">
                    <h3 className="font-serif-title text-lg">Comment suivre ce parcours en douceur</h3>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Prévoyez 20 à 30 minutes par module (tu peux fractionner si besoin).</li>
                        <li>• Avance dans l&apos;ordre : chaque étape prépare la suivante.</li>
                        <li>• Garde un carnet dédié : c&apos;est ton espace à toi, sans censure.</li>
                        <li>• Reviens sur les modules que tu aimes : ce n&apos;est pas une course.</li>
                    </ul>
                </div>

                <div className="card bg-sage/6 border-sage/40 space-y-3">
                    <h3 className="font-serif-title text-lg">Matériel recommandé (minimaliste)</h3>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Un carnet ou quelques feuilles A4 (même recyclées, même pas « jolies »).</li>
                        <li>• Un stylo ou crayon avec lequel tu te sens bien.</li>
                        <li>• 2–3 couleurs (feutres, crayons, aquarelle… peu importe la « qualité »).</li>
                        <li>• Un endroit où tu peux t&apos;asseoir tranquillement 10–15 minutes d&apos;affilée.</li>
                    </ul>
                    <p className="text-[0.75rem] text-main/65">Si tu n&apos;as pas tout, commence avec ce que tu as. Le plus important, c&apos;est toi, pas le matériel.</p>
                </div>
            </section>
        </div>
    );
}

/**
 * Petit composant interne pour les lignes de téléchargement
 */
type DownloadRowProps = {
    label: string;
    description: string;
    href: string;
};

function DownloadRow({ label, description, href }: DownloadRowProps) {
    return (
        <div className="flex flex-col gap-1 rounded-xl border border-perl/60 bg-ivory px-3 py-2.5 md:flex-row md:items-center md:justify-between md:gap-3">
            <div className="space-y-0.5">
                <p className="text-sm font-medium text-main/85">{label}</p>
                <p className="text-[0.8rem] text-main/65">{description}</p>
            </div>
            <Link
                href={href}
                className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-sage/60 bg-sage/5 px-3 py-1.5 text-[0.75rem] font-medium text-sage hover:bg-sage/10 transition-colors md:mt-0"
            >
                <Download className="h-3.5 w-3.5" />
                <span>Télécharger</span>
            </Link>
        </div>
    );
}
