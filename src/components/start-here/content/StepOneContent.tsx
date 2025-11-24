// src/components/start-here/content/StepOneContent.tsx
import VideoBlock from './VideoBlock';

export default function StepOneContent() {
    return (
        <div className="space-y-8">
            {/* HEADER ÉTAPE 1 */}
            <header className="space-y-3">
                <p className="inline-flex items-center rounded-full bg-vert/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-vert">Étape 1 · Retrouver le geste</p>
                <h2 className="font-serif-title text-xl md:text-2xl">Dessiner en cherchant la forme, pas en traçant un contour</h2>
                <p className="text-sm md:text-base text-main/75 max-w-2xl">
                    Ici, tu ne vas pas « faire un beau dessin ». Tu vas réapprendre à regarder un objet comme un volume vivant&nbsp;: avec du poids, des courbes, des creux. Ton
                    trait n&apos;a pas besoin d&apos;être sûr, il a besoin d&apos;être curieux.
                </p>
            </header>

            {/* VIDÉO TUTO GESTE & FORME */}
            <section className="space-y-3">
                <h3 className="font-serif-title text-lg">Démonstration : la forme qui émerge</h3>
                <VideoBlock title="Recherche de forme sur un objet simple" youtubeId="eNuOpMOPorU" cover="/start-here/step1-cover.png" />
            </section>

            {/* MATÉRIEL + INTENTION */}
            <section className="grid gap-5 md:grid-cols-2">
                <div className="card bg-ivory/90 space-y-3">
                    <h3 className="font-serif-title text-lg">Matériel (vraiment) minimal</h3>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Une feuille A4 (ou une page de carnet, même déjà entamée).</li>
                        <li>• Un crayon ou stylo fluide (sans gomme).</li>
                        <li>• Un petit objet du quotidien (tasse, cuillère, plante, lunettes…).</li>
                        <li>• 10 à 15 minutes où tu peux être un peu tranquille.</li>
                    </ul>
                    <p className="text-[0.78rem] text-main/60">
                        Pas besoin de « bon matériel ». Le but ici, c&apos;est ton regard et ton geste, pas la perfection de l&apos;outillage.
                    </p>
                </div>

                <div className="card space-y-3">
                    <h3 className="font-serif-title text-lg">Intention de cette étape</h3>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Sortir du réflexe « je copie le contour ».</li>
                        <li>• Sentir le poids, les masses et les directions de l&apos;objet.</li>
                        <li>• Laisser ton trait bouger, vibrer, recommencer.</li>
                        <li>• Accepter que le dessin ressemble à une recherche, pas à un résultat fini.</li>
                    </ul>
                </div>
            </section>

            {/* EXERCICE PRINCIPAL : LA FORME QUI ÉMERGE */}
            <section className="card space-y-4 bg-ivory/95 border-dashed border-perl">
                <h3 className="font-serif-title text-lg">Exercice guidé : faire émerger la forme</h3>
                <p className="text-sm text-main/75">
                    Tu vas dessiner ton objet comme si tu le découvrais pour la première fois. Pas pour « bien le représenter », mais pour comprendre comment il occupe l’espace.
                </p>

                <ol className="text-sm text-main/75 space-y-1.75 list-decimal list-inside">
                    <li>
                        <span className="font-medium">Observe les masses, pas les contours.</span> Regarde où l&apos;objet est le plus lourd, le plus large, où il s&apos;affine, où
                        il se courbe. Pense « volume » plutôt que « ligne de bord ».
                    </li>
                    <li>
                        <span className="font-medium">Pose 3 à 5 lignes exploratoires.</span> Avant de « dessiner l&apos;objet », trace quelques lignes légères qui traversent ou
                        entourent sa forme&nbsp;: un axe, une grande courbe, une diagonale qui donne sa direction.
                    </li>
                    <li>
                        <span className="font-medium">Laisse la forme apparaître petit à petit.</span> Repasse là où ça semble juste, corrige par-dessus sans gommer, superpose des
                        traits comme tu superposerais des idées.
                    </li>
                    <li>
                        <span className="font-medium">Arrête-toi quand la forme “tient debout”.</span> Tu n&apos;as pas besoin de tout détailler. Tu t&apos;arrêtes quand tu sens
                        que l&apos;objet a une présence, même si le dessin est bancal.
                    </li>
                    <li>
                        Juste à côté, écris une phrase qui commence par : <em>« Ce que j&apos;ai découvert dans cette forme, c&apos;est… »</em> et laisse venir la suite sans te
                        censurer.
                    </li>
                </ol>

                <p className="text-[0.78rem] text-main/60">
                    Tu peux recommencer avec d&apos;autres objets, toujours en acceptant que chaque dessin soit une exploration, pas un verdict sur ton niveau.
                </p>
            </section>

            {/* CE QUI COMPTE + ASTUCE DOUCE */}
            <section className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div className="card space-y-3">
                    <h3 className="font-serif-title text-lg">Ce qui compte vraiment dans cette étape</h3>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Tu as laissé ton trait chercher, au lieu de vouloir « réussir du premier coup ».</li>
                        <li>• Tu as regardé l&apos;objet comme un volume, pas comme une silhouette fermée.</li>
                        <li>• Tu as pris quelques minutes pour toi, dans un geste créatif qui n&apos;a pas besoin d&apos;être parfait.</li>
                    </ul>
                    <p className="text-sm text-main/70">
                        Si tu veux, prends une photo de ton dessin avant de passer à l&apos;étape suivante. Tu pourras revenir le regarder plus tard pour mesurer ton chemin.
                    </p>
                </div>

                <div className="rounded-xl shadow-sm p-4 space-y-2 border border-rose/60 bg-rose/5">
                    <p className="text-[0.75rem] uppercase tracking-[0.2em] text-main">Astuce douce</p>
                    <p className="text-sm text-main/80">
                        Si une petite voix te dit « c&apos;est moche », tu peux lui répondre :{' '}
                        <em>« Ici, je n&apos;essaie pas d&apos;être parfaite. J&apos;apprends à sentir la forme. »</em> Puis tu continues ton dessin, même si ça grince un peu
                        dedans. C&apos;est déjà un vrai travail artistique.
                    </p>
                </div>
            </section>
        </div>
    );
}
