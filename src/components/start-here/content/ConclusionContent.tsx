// src/components/start-here/content/ConclusionContent.tsx
import Link from 'next/link';
import VideoBlock from './VideoBlock';

export default function ConclusionContent() {
    return (
        <div className="space-y-8 md:space-y-10">
            {/* HEADER CONCLUSION GLOBAL */}
            <header className="space-y-3 md:space-y-4">
                <p className="inline-flex items-center rounded-full bg-terre/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-terre">Conclusion du parcours</p>

                <div className="space-y-2">
                    <h2 className="font-serif-title text-xl md:text-2xl">Tu viens de créer un véritable point de départ</h2>
                    <p className="text-sm md:text-base text-main/75 max-w-2xl">
                        Tu as posé trois gestes fondateurs : chercher une forme sans te juger, lire une image avec ton propre regard, et écouter ce que les couleurs réveillent en
                        toi. Cette conclusion t’aide à assembler tout ça pour continuer à avancer dans ta pratique artistique, à ton rythme.
                    </p>
                </div>
            </header>

            {/* VIDÉO DE CLÔTURE + TEXTE CÔTÉ À CÔTÉ */}
            <section className="card space-y-4 md:space-y-0 md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] md:gap-6 items-start">
                <div className="space-y-2">
                    <h3 className="font-serif-title text-lg">Vidéo de clôture du parcours</h3>
                    <p className="text-sm text-main/70 max-w-md">
                        Dans cette vidéo, tu pourras revenir sur les trois étapes, partager ton mot de la fin, et proposer des pistes concrètes pour la suite. C’est un moment pour
                        encourager, rassurer et ouvrir des portes.
                    </p>
                    <p className="text-[0.8rem] text-main/60">
                        Tu peux inviter la personne à garder son carnet à côté d’elle pendant la vidéo, pour noter ce qui résonne ou ce qu’elle a envie de prolonger.
                    </p>
                </div>

                <VideoBlock title="Mot de clôture & pistes pour la suite" youtubeId="eNuOpMOPorU" cover="/start-here/conclusion-cover.png" />
            </section>

            {/* BILAN DU PARCOURS */}
            <section className="card space-y-4 bg-ivory/95 border-perl/60">
                <h3 className="font-serif-title text-lg">Faire le point en 5 minutes</h3>
                <p className="text-sm text-main/75">Feuillette ton carnet et rassemble :</p>

                <ul className="text-sm text-main/75 space-y-1.5">
                    <li>• Ton dessin de recherche de forme (Étape 1).</li>
                    <li>• Ta lecture d’image intuitive (Étape 2).</li>
                    <li>• Ton mini nuancier personnel (Étape 3).</li>
                </ul>

                <p className="text-sm text-main/75">
                    Pose-toi ensuite une question simple : <em>« Qu’est-ce qui a un peu bougé en moi ? »</em> Le dessin n’est pas qu’un geste visuel : c’est aussi une manière
                    différente de te parler.
                </p>
            </section>

            {/* PHRASE PERSONNELLE + RAPPEL DOUX */}
            <section className="grid gap-5 md:grid-cols-2">
                <div className="card space-y-3">
                    <h3 className="font-serif-title text-lg">Une phrase pour guider la suite</h3>
                    <p className="text-sm text-main/75">
                        Écris une phrase qui commence par : <em>« Avec l’art, j’aimerais… »</em> et laisse venir ce qui sort, sans corriger. Cette phrase deviendra ta petite
                        boussole créative pour les prochaines semaines.
                    </p>
                </div>

                <div className="rounded-xl shadow-sm p-4 space-y-2 border border-rose/60 bg-rose/5">
                    <p className="text-[0.75rem] uppercase tracking-[0.2em] text-main">À garder en tête</p>
                    <p className="text-sm text-main/80">
                        Tu ne commences pas trop tard. Tu commences maintenant. À ton rythme, avec ton histoire, ton regard, et ce que tu as sous la main. C’est exactement ce qu’il
                        faut pour créer.
                    </p>
                </div>
            </section>

            {/* CONTINUER APRÈS LE PARCOURS */}
            <section className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div className="card space-y-3">
                    <h3 className="font-serif-title text-lg">Comment continuer ?</h3>
                    <p className="text-sm text-main/75">Voici trois façons douces de prolonger ton élan créatif :</p>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Refaire l’exercice de l’Étape 1 une fois par semaine avec un nouvel objet.</li>
                        <li>• Choisir un article Explor’Art qui t’attire et l’utiliser comme mini-exercice.</li>
                        <li>• Noter chaque jour une couleur qui t’a marquée et pourquoi.</li>
                    </ul>
                </div>

                <div className="card space-y-3">
                    <h3 className="font-serif-title text-lg">Prochaines découvertes</h3>
                    <div className="flex flex-col gap-2 text-sm text-main/80">
                        <Link
                            href="/articles"
                            className="inline-flex items-center justify-between rounded-xl border border-perl/70 bg-ivory px-3 py-2 hover:bg-background transition-colors"
                        >
                            <span>Explorer les articles du blog</span>
                            <span>↗</span>
                        </Link>
                        <Link
                            href="/categories"
                            className="inline-flex items-center justify-between rounded-xl border border-perl/70 bg-ivory px-3 py-2 hover:bg-background transition-colors"
                        >
                            <span>Découvrir les 7 piliers Explor’Art</span>
                            <span>↗</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
