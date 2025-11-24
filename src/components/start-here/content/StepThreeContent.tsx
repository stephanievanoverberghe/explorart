// src/components/start-here/content/StepThreeContent.tsx
import VideoBlock from './VideoBlock';

export default function StepThreeContent() {
    return (
        <div className="space-y-8">
            {/* HEADER ÉTAPE 3 */}
            <header className="space-y-3">
                <p className="inline-flex items-center rounded-full bg-rose/8 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-rose">Étape 3 · Couleurs & émotions</p>
                <h2 className="font-serif-title text-xl md:text-2xl">Comment les couleurs changent ton ressenti devant une image</h2>
                <p className="text-sm md:text-base text-main/75 max-w-2xl">
                    Dans cette étape, tu vas créer un mini nuancier personnel et observer comment quelques couleurs peuvent tout changer : ton humeur, ton geste, la manière dont tu
                    regardes ton dessin ou ton image. L’idée n’est pas de « connaître la théorie », mais de sentir ce qui se passe en toi.
                </p>
            </header>

            {/* VIDÉO D'ÉTAPE */}
            <section className="space-y-3">
                <h3 className="font-serif-title text-lg">Vidéo : explorer les couleurs dans ton dessin et ton image</h3>
                <VideoBlock title="Couleurs & émotions dans ton parcours" youtubeId="eNuOpMOPorU" cover="/start-here/step3-cover.png" />
            </section>

            {/* MINI NUANCIER PERSO */}
            <section className="grid gap-5 md:grid-cols-2">
                <div className="card space-y-3 bg-ivory/95">
                    <h3 className="font-serif-title text-lg">Créer ton mini nuancier personnel</h3>
                    <p className="text-sm text-main/75">
                        Tu peux utiliser le mini-nuancier du kit débutant, ou simplement une feuille blanche divisée en petits rectangles. L’idée : choisir quelques couleurs qui te
                        parlent vraiment.
                    </p>
                    <ol className="text-sm text-main/75 space-y-1.5 list-decimal list-inside">
                        <li>
                            Choisis <strong>3 à 5 couleurs</strong> (feutres, crayons, aquarelle, numérique… ce que tu as) : une plutôt calme, une plutôt intense, une qui
                            t’intrigue.
                        </li>
                        <li>Pour chaque couleur, trace un petit aplat (un rectangle, un rond, une forme libre) dans ton nuancier.</li>
                        <li>
                            À côté, écris <strong>un mot ou une émotion</strong> qui vient spontanément (ex : brume, feu, douceur, agitation…).
                        </li>
                        <li>
                            Ajoute si tu veux un <strong>lieu, un moment de la journée ou un souvenir</strong> que cette couleur te rappelle.
                        </li>
                    </ol>
                    <p className="text-xs text-main/60">Ne cherche pas le « bon vocabulaire ». Ce qui compte, c’est ton langage à toi avec les couleurs.</p>
                </div>

                <div className="card bg-rose/8 border-rose/40 space-y-3">
                    <h3 className="font-serif-title text-lg">Exemples avec la palette Explor&apos;Art</h3>
                    <ul className="text-sm text-main/80 space-y-1.5">
                        <li>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-vert" />
                                <span className="font-medium">Vert — Dessin &amp; geste</span>
                            </span>{' '}
                            → concentration douce, forêt, respiration lente.
                        </li>
                        <li>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-bleu" />
                                <span className="font-medium">Bleu — Comprendre une œuvre</span>
                            </span>{' '}
                            → profondeur, nuit, réflexion intérieure.
                        </li>
                        <li>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-rose" />
                                <span className="font-medium">Rose — Inspirations</span>
                            </span>{' '}
                            → peau, intimité, douceur chaleureuse.
                        </li>
                        <li>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-prune" />
                                <span className="font-medium">Prune — Psychologie de l&apos;art</span>
                            </span>{' '}
                            → introspection, mystère, profondeur émotionnelle.
                        </li>
                    </ul>
                    <p className="text-[0.78rem] text-main/70">
                        Tu peux t&apos;inspirer de ces associations, mais n&apos;hésite pas à inventer les tiennes : ton ressenti est toujours prioritaire.
                    </p>
                </div>
            </section>

            {/* OBSERVER TON CORPS & TES RÉACTIONS */}
            <section className="card space-y-3">
                <h3 className="font-serif-title text-lg">Observer ce que ton corps raconte devant les couleurs</h3>
                <p className="text-sm text-main/75">Regarde ton mini nuancier et prends une minute pour sentir ce qui se passe en toi, sans essayer de bien faire.</p>
                <ul className="text-sm text-main/75 space-y-1.5">
                    <li>• Est-ce que cette couleur me donne envie de m&apos;approcher ou de m&apos;éloigner ?</li>
                    <li>• Est-ce qu&apos;elle me donne plutôt envie de parler, de me taire, de bouger, de me poser ?</li>
                    <li>• Est-ce que je la vois dehors ? (une lumière, une pièce, une saison, un moment précis de la journée)</li>
                    <li>• Est-ce qu&apos;elle me rassure, me réveille, m&apos;énerve, m&apos;apaise ?</li>
                </ul>
                <p className="text-sm text-main/75">
                    Tu peux noter tout ça sous forme de mots, de petites flèches, de mini phrases. Tu es en train de construire ton <strong>vocabulaire intime des couleurs</strong>
                    .
                </p>
            </section>

            {/* RELIER AVEC LES ÉTAPES 1 & 2 */}
            <section className="grid gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                <div className="card space-y-3">
                    <h3 className="font-serif-title text-lg">Relier ton geste, ton regard et tes couleurs</h3>
                    <p className="text-sm text-main/75">
                        Reprends ton dessin de l&apos;Étape 1 et l&apos;image que tu as analysée à l&apos;Étape 2. On va les regarder avec tes nouvelles couleurs en tête.
                    </p>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Quelles couleurs dominent dans ton dessin, même si elles sont juste suggérées ou imaginées ?</li>
                        <li>• Quelles couleurs dominent dans l&apos;image que tu as étudiée ?</li>
                        <li>• Est-ce que certaines couleurs de ton nuancier reviennent dans ces deux supports ?</li>
                        <li>
                            • Si tu changeais <strong>une seule couleur</strong> dans ton dessin ou dans l&apos;image, qu&apos;est-ce que ça modifierait dans ton ressenti ?
                        </li>
                    </ul>
                    <p className="text-sm text-main/70">
                        Tu es en train de relier le geste (Étape 1), le regard (Étape 2) et les couleurs (Étape 3). C&apos;est exactement le cœur d&apos;Explor&apos;Art.
                    </p>
                </div>

                <div className="rounded-xl shadow-sm p-4 space-y-2 border border-rose/60 bg-rose/5">
                    <p className="text-[0.75rem] uppercase tracking-[0.2em] text-main">Petite respiration</p>
                    <p className="text-sm text-main/80">
                        Tu peux t&apos;arrêter ici pour aujourd&apos;hui. Reviens un autre jour pour relire ton nuancier, ton dessin, ton image, et sentir ce qui a changé. Quand tu
                        te sentiras prête, tu pourras passer à la conclusion pour faire le point sur tout ton parcours.
                    </p>
                </div>
            </section>
        </div>
    );
}
