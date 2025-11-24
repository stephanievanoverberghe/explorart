// src/components/start-here/content/StepTwoContent.tsx
import VideoBlock from './VideoBlock';

export default function StepTwoContent() {
    return (
        <div className="space-y-8">
            {/* HEADER GLOBAL ÉTAPE 2 */}
            <header className="space-y-3">
                <p className="inline-flex items-center rounded-full bg-bleu/8 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-bleu">Étape 2 · Lire une image</p>

                <h2 className="font-serif-title text-xl md:text-2xl">Lire une image : entraîner ton regard en douceur</h2>

                <p className="text-sm md:text-base text-main/75 max-w-2xl">
                    Après avoir réveillé ta main à l’étape 1, on entraîne maintenant ton regard. Ici, tu ne cherches ni vocabulaire technique ni connaissances d’histoire de l’art :
                    tu observes ton <strong>trajet du regard</strong>, les <strong>grandes masses</strong>, et ce que l’image te <strong>fait ressentir</strong>.
                </p>
            </header>

            {/* VIDÉO */}
            <section className="space-y-3">
                <h3 className="font-serif-title text-lg">Vidéo : Lecture guidée d’une image</h3>

                <VideoBlock title="Lecture guidée d’une image" youtubeId="eNuOpMOPorU" cover="/start-here/step2-cover.png" />
            </section>

            {/* SECTION 1 — CHOISIR L’IMAGE */}
            <section className="card bg-ivory/95 border-bleu/30 space-y-3">
                <h3 className="font-serif-title text-lg">1 · Choisir une image qui t’appelle</h3>
                <p className="text-sm text-main/75">
                    Ce peut être une photo, un tableau, une illustration… L’important n’est pas la qualité de l’œuvre, mais qu’elle <strong>t’attire</strong> ou te{' '}
                    <strong>pose une question</strong>.
                </p>
                <ul className="text-sm text-main/75 space-y-1.5">
                    <li>• Affiche-la en assez grand.</li>
                    <li>• Respire 3 fois lentement.</li>
                    <li>• Laisse ton regard se poser dessus sans analyser.</li>
                </ul>
            </section>

            {/* LES 3 TEMPS DU REGARD */}
            <section className="grid gap-5 md:grid-cols-3">
                <div className="rounded-xl shadow-sm p-4 space-y-2 border border-sage/60 bg-sage/5">
                    <p className="text-[0.75rem] uppercase tracking-[0.2em] text-bleu/80">Temps 1</p>
                    <h3 className="font-serif-title text-base">Le point d’entrée</h3>
                    <p className="text-sm text-main/75">
                        Où ton regard se pose en premier ? Une lumière, un visage, un contraste… note simplement cette <strong>porte d’entrée</strong>.
                    </p>
                </div>

                <div className="rounded-xl shadow-sm p-4 space-y-2 border border-terre/60 bg-terre/5">
                    <p className="text-[0.75rem] uppercase tracking-[0.2em] text-bleu/80">Temps 2</p>
                    <h3 className="font-serif-title text-base">Le trajet du regard</h3>
                    <p className="text-sm text-main/75">
                        Suis le mouvement de tes yeux : tournent-ils ? descendent-ils ? Repassent-ils plusieurs fois au même endroit ? Tu peux même tracer ce trajet dans ton
                        carnet.
                    </p>
                </div>

                <div className="rounded-xl shadow-sm p-4 space-y-2 border border-prune/60 bg-prune/5">
                    <p className="text-[0.75rem] uppercase tracking-[0.2em] text-bleu/80">Temps 3</p>
                    <h3 className="font-serif-title text-base">L’ambiance ressentie</h3>
                    <p className="text-sm text-main/75">
                        Après quelques secondes, dis-toi :<em>« L’ambiance est plutôt… » </em>
                        calme, tendue, mystérieuse, lumineuse, intime ? Un seul mot suffit.
                    </p>
                </div>
            </section>

            {/* MINI ANALYSE */}
            <section className="card space-y-3">
                <h3 className="font-serif-title text-lg">2 · Ta mini-lecture d’image</h3>
                <p className="text-sm text-main/75">Sur ton carnet, écris un petit paragraphe simple pour résumer ta lecture.</p>
                <p className="text-sm text-main/80 italic bg-ivory/90 border border-perl/60 rounded-xl px-3 py-2">
                    « Je vois d’abord… puis mes yeux vont vers… et ça crée une ambiance plutôt… »
                </p>
                <p className="text-sm text-main/75">C’est une vraie analyse d’œuvre — douce, personnelle, intuitive.</p>
            </section>

            {/* ALLER PLUS LOIN */}
            <section className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div className="card space-y-3">
                    <h3 className="font-serif-title text-lg">3 · Aller un peu plus loin (si tu veux)</h3>
                    <ul className="text-sm text-main/75 space-y-1.5">
                        <li>• Observe les masses claires / sombres.</li>
                        <li>• Repère les lignes fortes (horizontales, verticales, diagonales).</li>
                        <li>• Imagine l’image en noir et blanc : que changerait l’ambiance ?</li>
                    </ul>
                </div>

                <div className="rounded-xl shadow-sm p-4 space-y-2 border border-rose/60 bg-rose/5">
                    <p className="text-[0.75rem] uppercase tracking-[0.2em] text-main">À retenir</p>
                    <p className="text-sm text-main/80">
                        Regarder une œuvre, c’est d’abord <strong>te faire confiance</strong>. Ton regard raconte une histoire — la tienne.
                    </p>
                </div>
            </section>
        </div>
    );
}
