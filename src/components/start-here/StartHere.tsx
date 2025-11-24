'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Check, ListTree, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { sections } from './sections';
import StartHereSidebar from './StartHereSidebar';
import StartHereContent from './StartHereContent';

export default function StartHere() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completed, setCompleted] = useState<boolean[]>(() => new Array(sections.length).fill(false));
    const [isOutlineOpen, setIsOutlineOpen] = useState(false);

    const TOTAL = sections.length;
    const currentSection = sections[currentIndex];

    // 🔗 Référence pour remonter en haut du module
    const headerRef = useRef<HTMLElement | null>(null);
    const hasInteractedRef = useRef(false); // false = premier affichage, pas de scroll auto

    // 🔒 Verrouillage : module n+1 verrouillé tant que n n’est pas terminé
    const isLocked = useCallback(
        (index: number) => {
            if (index === 0) return false; // intro toujours accessible
            return !completed[index - 1];
        },
        [completed]
    );

    const handleSelectSection = (index: number) => {
        if (isLocked(index)) return;
        hasInteractedRef.current = true;
        setCurrentIndex(index);
    };

    // Quand on clique dans le sommaire, on ferme le drawer
    const handleSelectFromSidebar = (index: number) => {
        handleSelectSection(index);
        setIsOutlineOpen(false);
    };

    const completedCount = completed.filter(Boolean).length;
    const progressPercent = (completedCount / TOTAL) * 100;
    const isCurrentCompleted = completed[currentIndex];
    const hasNext = currentIndex < TOTAL - 1;

    // 👉 Navigation locale bas de page
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < TOTAL - 1 && !isLocked(currentIndex + 1);

    const goPrev = () => {
        if (!canGoPrev) return;
        hasInteractedRef.current = true;
        setCurrentIndex((i) => Math.max(0, i - 1));
    };

    const goNext = () => {
        if (!canGoNext) return;
        hasInteractedRef.current = true;
        setCurrentIndex((i) => Math.min(TOTAL - 1, i + 1));
    };

    // CTA principal : “Terminer et continuer” ou “Continuer”
    const handlePrimaryAction = () => {
        hasInteractedRef.current = true;

        // 1) on marque le module courant comme complété si ce n'est pas déjà fait
        setCompleted((prev) => {
            const next = [...prev];
            if (!next[currentIndex]) {
                next[currentIndex] = true;
            }
            return next;
        });

        // 2) navigation en fonction du contexte
        if (currentIndex < TOTAL - 1) {
            // modules 1, 2, 3, 4 → on avance simplement
            setCurrentIndex(currentIndex + 1);
        } else if (isCurrentCompleted) {
            // dernier module + déjà complété → "Revoir le parcours"
            setCurrentIndex(0); // retour à l'intro
        }
        // dernier module non encore complété → on reste dessus après "Terminer le parcours"
    };

    const primaryLabel = !isCurrentCompleted
        ? hasNext
            ? 'Terminer ce module et continuer'
            : 'Terminer le parcours'
        : hasNext
        ? 'Continuer vers le module suivant'
        : 'Revoir le parcours (modules terminés)';

    // 🔒 Quand le plan est ouvert : on bloque le scroll derrière
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const previousOverflow = document.body.style.overflow;

        if (isOutlineOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = previousOverflow || '';
        }

        return () => {
            document.body.style.overflow = previousOverflow || '';
        };
    }, [isOutlineOpen]);

    // ⬆️ Scroll automatique en haut du module après navigation
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!hasInteractedRef.current) return; // première visite → pas de scroll auto
        if (!headerRef.current) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const rect = headerRef.current.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;

        // petit offset si tu as une navbar sticky
        const offset = 80;
        const target = Math.max(absoluteTop - offset, 0);

        window.scrollTo({ top: target, behavior: 'smooth' });
    }, [currentIndex]);

    return (
        <>
            {/* Bandeau progression globale */}
            <section
                ref={headerRef}
                className="rounded-2xl border border-sage/60 bg-sage/5 px-4 py-3.5 md:px-5 md:py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between animate-fade-up-delay"
            >
                <div className="min-w-0 space-y-1">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-sage">Progression du parcours</p>
                    <p className="text-xs md:text-sm text-main">
                        {completedCount}/{TOTAL} module{TOTAL > 1 ? 's' : ''} complété
                        {completedCount > 1 ? 's' : ''} · Actuellement : <span className="font-medium">{currentSection.label}</span>
                    </p>
                    <div className="h-1.5 w-full rounded-full bg-sage/20 overflow-hidden">
                        <div className="h-full rounded-full bg-sage transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                    </div>
                </div>

                {/* Bouton pour ouvrir le plan du parcours */}
                <div className="flex justify-start md:justify-end">
                    <button
                        type="button"
                        onClick={() => setIsOutlineOpen(true)}
                        className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full cursor-pointer border border-sage bg-sage px-3 py-1.5 text-[0.75rem] font-medium text-ivory hover:bg-ivory hover:text-sage transition-colors md:mt-0"
                    >
                        <ListTree className="h-4 w-4" />
                        <span>Ouvrir le plan du parcours</span>
                    </button>
                </div>
            </section>

            {/* Zone contenu (100% largeur) */}
            <div className="mt-6 md:mt-8 space-y-6 md:space-y-8">
                <main className="space-y-6 md:space-y-8 animate-fade-up-delay">
                    {/* Meta du module courant */}
                    <header
                        className="
                            rounded-2xl md:rounded-3xl 
                            border border-sage/60 bg-sage/5
                            px-4 py-4 md:px-6 md:py-5 
                            space-y-2 
                            shadow-sm
                        "
                    >
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-sage">
                            Module {currentIndex + 1} / {TOTAL}
                        </p>

                        <h2 className="font-serif-title text-xl md:text-2xl leading-snug text-sage">{currentSection.title}</h2>

                        <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-main/70">
                            <span className="font-medium">{currentSection.label}</span>
                            <span className="h-1 w-1 rounded-full bg-main/30" />

                            <span>{currentSection.duration}</span>
                            <span className="inline-flex items-center gap-1">
                                <span className={`h-1.5 w-1.5 rounded-full ${currentSection.colorDotClass}`} />
                                <span className="uppercase tracking-[0.16em]">{currentSection.type}</span>
                            </span>

                            {isCurrentCompleted && (
                                <>
                                    <span className="h-1 w-1 rounded-full bg-main/30" />
                                    <span className="inline-flex items-center gap-1 text-vert/80">
                                        <Check className="h-3 w-3" />
                                        <span>Module complété</span>
                                    </span>
                                </>
                            )}
                        </div>
                    </header>

                    {/* Contenu pédagogique */}
                    <StartHereContent sectionId={currentSection.id} />

                    {/* Barre d’action bas de module */}
                    <section className="flex flex-col gap-4 pt-4 border-t border-perl/50">
                        <p className="text-xs text-main/65">
                            {!isCurrentCompleted ? (
                                <>
                                    Quand tu as terminé ce module, clique sur <span className="font-medium text-terre">« Terminer ce module et continuer »</span> pour avancer dans
                                    le parcours.
                                </>
                            ) : (
                                <>
                                    Ce module est <span className="font-medium text-vert">marqué comme complété</span>. Tu peux continuer vers le module suivant ou simplement
                                    revoir le contenu.
                                </>
                            )}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            {/* 🔹 Navigation locale : précédent / suivant */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    disabled={!canGoPrev}
                                    className={[
                                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.75rem] sm:text-xs transition-colors',
                                        canGoPrev
                                            ? 'border-perl/70 bg-ivory text-main/80 hover:bg-background cursor-pointer'
                                            : 'border-perl/40 bg-ivory/70 text-main/35 cursor-not-allowed',
                                    ].join(' ')}
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    <span>Module précédent</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={goNext}
                                    disabled={!canGoNext}
                                    className={[
                                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.75rem] sm:text-xs transition-colors',
                                        canGoNext
                                            ? 'border-sage/70 bg-sage/5 text-sage hover:bg-sage/10 cursor-pointer'
                                            : 'border-perl/40 bg-ivory/70 text-main/35 cursor-not-allowed',
                                    ].join(' ')}
                                >
                                    <span>Module suivant</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {/* CTA principal : continuer le parcours */}
                            <button
                                type="button"
                                onClick={handlePrimaryAction}
                                className="inline-flex items-center justify-center cursor-pointer gap-2 rounded-full bg-terre px-4 py-2 text-xs sm:text-sm font-medium text-ivory shadow-sm hover:bg-terre/90 transition-colors"
                            >
                                <Check className="h-4 w-4" />
                                <span>{primaryLabel}</span>
                            </button>
                        </div>
                    </section>
                </main>
            </div>

            {/* 🔹 Overlay plein écran (scroll bloqué derrière) */}
            {isOutlineOpen && (
                <div className="fixed inset-0 z-40 m-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOutlineOpen(false)} aria-label="Fermer le plan du parcours" />
            )}

            {/* 🔹 Handle flottant, qui suit l'ouverture/fermeture */}
            <button
                type="button"
                onClick={() => setIsOutlineOpen((o) => !o)}
                className={`
                    fixed top-1/2 z-50 -translate-y-1/2
                    bg-sage border border-sage/60 shadow-md
                    rounded-l-full
                    cursor-pointer
                    px-2 py-3
                    md:flex items-center justify-center
                    hover:bg-sage
                    transition-all duration-300
                    ${isOutlineOpen ? 'right-96' : 'right-0'}
                `}
                aria-label={isOutlineOpen ? 'Fermer le plan du parcours' : 'Ouvrir le plan du parcours'}
            >
                {isOutlineOpen ? <ChevronRight className="h-6 w-6 text-ivory" /> : <ChevronLeft className="h-6 w-6 text-ivory" />}
            </button>

            {/* 🔹 Drawer latéral : plan du parcours (mobile + desktop) */}
            <aside
                className={[
                    'fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l-3 border-sage bg-background shadow-2xl',
                    'transform transition-transform duration-300 ease-out',
                    isOutlineOpen ? 'translate-x-0' : 'translate-x-full',
                ].join(' ')}
            >
                {/* Header du drawer */}
                <div className="flex items-center justify-between gap-3 border-b border-perl/60 px-4 py-3">
                    <div className="space-y-0.5">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main">Plan du parcours</p>
                        <p className="text-xs text-main/80">Naviguer entre les modules de la mini-formation.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsOutlineOpen(false)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-perl/60 bg-ivory hover:bg-background transition-colors"
                        aria-label="Fermer le plan du parcours"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Contenu du drawer : uniquement le sommaire / modules */}
                <div className="h-[calc(100vh-3rem)] overflow-y-auto px-3 py-3 md:px-4 md:py-4">
                    <StartHereSidebar
                        sections={sections}
                        currentIndex={currentIndex}
                        completed={completed}
                        isLocked={isLocked}
                        onSelectSection={handleSelectFromSidebar}
                        progressPercent={progressPercent}
                    />
                </div>
            </aside>
        </>
    );
}
