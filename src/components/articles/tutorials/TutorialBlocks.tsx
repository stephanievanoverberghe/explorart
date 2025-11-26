// src/components/articles/tutorials/TutorialBlocks.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { TutorialBlock, TutorialSimpleBlock, TutorialTwoColsBlock, TutorialSection, TutorialExercisesGroupBlock } from '@/types/tutorial';
import { MarkdownProse } from '@/components/articles/common/MarkdownProse';

type SectionsProps = {
    sections: TutorialSection[];
};

export function TutorialSections({ sections }: SectionsProps) {
    return (
        <div className="space-y-24">
            {sections.map((section) => (
                <section key={section.id} id={section.anchorId} className="space-y-8">
                    {section.blocks.map((block) => (
                        <TutorialBlockRenderer key={block.id} block={block} />
                    ))}
                </section>
            ))}
        </div>
    );
}

/* ----------------- RENDER DES BLOCS ----------------- */

function TutorialBlockRenderer({ block }: { block: TutorialBlock }) {
    if (block.kind === 'two-cols') {
        return <TwoColsBlock block={block} />;
    }

    if (block.kind === 'exercises-group') {
        return <ExercisesGroupBlock block={block} />;
    }

    return <SimpleBlock block={block} />;
}

function SimpleBlock({ block }: { block: TutorialSimpleBlock }) {
    const wrapperProps = { id: block.id };

    switch (block.kind) {
        case 'rich-text':
            return (
                <section {...wrapperProps}>
                    {block.title && <h2 className="text-xl md:text-2xl font-serif-title font-semibold mb-3">{block.title}</h2>}
                    <MarkdownProse content={block.markdown} />
                </section>
            );

        case 'encart': {
            const tone = block.tone ?? 'soft';
            const size = block.size ?? 'normal';
            let base = '';

            if (tone === 'pedagogic') {
                base = 'border-vert/70 bg-vert/5';
            } else if (tone === 'error') {
                base = 'border-rose/70 bg-rose/10';
            } else if (tone === 'question') {
                base = 'border-ocre/70 bg-ocre/5';
            } else {
                base = 'border-bleu/40 bg-bleu/5';
            }

            const paddingClass = size === 'compact' ? 'px-3 py-2.5 md:px-4 md:py-3' : 'px-4 py-3 md:px-5 md:py-4';

            const titleClass = size === 'compact' ? 'text-[0.8rem] md:text-[0.9rem]' : 'text-sm';

            const textClass = size === 'compact' ? 'text-[0.78rem] md:text-[0.8rem]' : 'text-sm';

            return (
                <aside {...wrapperProps} className={`rounded-2xl border ${base} ${paddingClass}`}>
                    {block.title && (
                        <h3 className={`${titleClass} font-semibold mb-2 flex items-center gap-2`}>
                            {/* emoji selon le tone */}
                            {tone === 'pedagogic' && <span className="text-xs">🌿</span>}
                            {tone === 'error' && <span className="text-xs">❌</span>}
                            {tone === 'soft' && <span className="text-xs">💙</span>}
                            {tone === 'question' && <span className="text-xs text-ocre">❓</span>}
                            <span>{block.title}</span>
                        </h3>
                    )}

                    <div className={textClass}>
                        <MarkdownProse content={block.markdown} />
                    </div>
                </aside>
            );
        }

        case 'exercise': {
            const hasMedia = !!block.media;
            return (
                <section {...wrapperProps} className="rounded-2xl border border-vert/30 bg-ivory/80 p-4 md:p-5 shadow-sm">
                    <div className={`grid gap-4 ${hasMedia ? 'md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)]' : ''}`}>
                        <div>
                            <div className="flex items-baseline justify-between gap-3 mb-2">
                                <h2 className="text-lg md:text-xl font-serif-title font-semibold">{block.title}</h2>
                                {block.subtitle && <p className="text-[0.7rem] md:text-xs uppercase tracking-[0.18em] text-vert">{block.subtitle}</p>}
                            </div>

                            {block.goalMarkdown && (
                                <div className="mb-3 text-sm text-main/90">
                                    <MarkdownProse content={block.goalMarkdown} />
                                </div>
                            )}

                            <div className="mt-3">
                                <h3 className="text-sm font-semibold mb-1 text-main">Étapes</h3>
                                <ol className="list-decimal list-inside space-y-1.5 text-sm text-main/90">
                                    {block.steps.map((s, i) => (
                                        <li key={i}>{s}</li>
                                    ))}
                                </ol>
                            </div>

                            {block.variants && block.variants.length > 0 && (
                                <div className="mt-3">
                                    <h3 className="text-sm font-semibold mb-1 text-main">Variantes</h3>
                                    <ul className="list-disc list-inside space-y-1.5 text-sm text-main/90">
                                        {block.variants.map((v, i) => (
                                            <li key={i}>{v}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {block.errors && block.errors.length > 0 && (
                                <div className="mt-3">
                                    <h3 className="text-sm font-semibold mb-1 text-main">Erreurs courantes</h3>
                                    <ul className="list-disc list-inside space-y-1.5 text-sm main/90">
                                        {block.errors.map((e, i) => (
                                            <li key={i}>{e}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {hasMedia && block.media?.type === 'image' && (
                            <div className="relative">
                                <div className="absolute -inset-1 rounded-2xl bg-vert/10 blur-sm" />
                                <div className="relative overflow-hidden rounded-2xl border border-perl/60 bg-ivory">
                                    <Image src={block.media.src} alt={block.media.alt} width={700} height={700} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            );
        }

        case 'image': {
            const { fullWidth, emphasis = 'soft' } = block;

            // wrapper global
            const wrapperClass = [fullWidth ? '-mx-4 md:-mx-8' : '', 'animate-subtle-fade-up'].filter(Boolean).join(' ');

            // style du cadre
            const frameClass =
                emphasis === 'hero'
                    ? 'relative overflow-hidden rounded-3xl md:rounded-[1.75rem] bg-black/5'
                    : emphasis === 'focus'
                    ? 'overflow-hidden rounded-2xl border border-vert/60 bg-vert/5 shadow-sm'
                    : emphasis === 'soft'
                    ? 'overflow-hidden rounded-2xl border border-perl/60 bg-ivory'
                    : 'overflow-hidden rounded-2xl border border-perl/40 bg-background';

            return (
                <figure id={block.id} className={wrapperClass}>
                    <div className={frameClass}>
                        {/* 🟢 HERO BANDEAU */}
                        {emphasis === 'hero' ? (
                            <div className="relative h-52 md:h-72 w-full">
                                <Image src={block.src} alt={block.alt} fill className="object-cover" />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
                            </div>
                        ) : (
                            <Image src={block.src} alt={block.alt} width={900} height={600} className="w-full h-full object-cover" />
                        )}
                    </div>

                    {block.caption && <figcaption className="mt-2 text-xs text-main/60">{block.caption}</figcaption>}
                </figure>
            );
        }

        case 'video':
            return <VideoBlock key={block.id} block={block} wrapperProps={wrapperProps} />;

        case 'resources-grid':
            return (
                <section {...wrapperProps} className="animate-subtle-fade-up space-y-2">
                    {block.title && <h2 className="text-xl md:text-2xl font-serif-title font-semibold">{block.title}</h2>}
                    <div className="grid gap-4 md:grid-cols-3">
                        {block.items.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className="group rounded-2xl border border-perl/50 bg-ivory/80 px-4 py-3 text-sm shadow-sm hover:-translate-y-0.5 hover:border-vert/60 hover:bg-vert/5 transition"
                            >
                                {item.badge && (
                                    <span className="inline-flex items-center rounded-full bg-vert/10 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-vert mb-2">
                                        {item.badge}
                                    </span>
                                )}
                                <p className="font-semibold text-slate-900 group-hover:text-vert">{item.label}</p>
                                <p className="mt-1 text-xs text-slate-600">{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            );

        default:
            return null;
    }
}

function TwoColsBlock({ block }: { block: TutorialTwoColsBlock }) {
    const layout = block.layout ?? 'balanced';
    const variant = block.variant ?? 'default';

    const gridClass =
        layout === 'balanced' ? 'lg:grid-cols-2' : layout === 'sidebar-right' ? 'md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]' : 'md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)]';

    const [left, right] = layout === 'sidebar-left' ? [block.right, block.left] : [block.left, block.right];

    if (variant === 'section-card') {
        return (
            <section id={block.id} className="">
                <div
                    className="
                        rounded-3xl border border-perl/60 bg-background
                        px-4 py-4 md:px-6 md:py-6
                        shadow-sm
                    "
                >
                    {/* 🟢 Bandeau image à l'intérieur de la card, au-dessus des 2 colonnes */}
                    {block.hero && (
                        <figure className="mb-4">
                            <div className="relative h-48 md:h-60 w-full overflow-hidden rounded-2xl bg-black/5">
                                <Image src={block.hero.src} alt={block.hero.alt} fill className="object-cover" />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
                            </div>
                            {block.hero.caption && <figcaption className="mt-2 text-xs text-main/60">{block.hero.caption}</figcaption>}
                        </figure>
                    )}

                    <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
                        <div className="space-y-4">
                            {left.map((b) => (
                                <SimpleBlock key={b.id} block={b} />
                            ))}
                        </div>
                        <div className="space-y-4">
                            {right.map((b) => (
                                <SimpleBlock key={b.id} block={b} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // 🔹 variante par défaut (tu laisses comme avant)
    return (
        <section id={block.id} className={`grid gap-6 md:gap-8 ${gridClass}`}>
            <div className="space-y-4">
                {left.map((b) => (
                    <SimpleBlock key={b.id} block={b} />
                ))}
            </div>
            <div className="space-y-4">
                {right.map((b) => (
                    <SimpleBlock key={b.id} block={b} />
                ))}
            </div>
        </section>
    );
}

type ExercisesGroupBlockProps = {
    block: TutorialExercisesGroupBlock;
};

function ExercisesGroupBlock({ block }: ExercisesGroupBlockProps) {
    const [activeId, setActiveId] = useState(block.items[0]?.id ?? '');

    const handleClick = (id: string) => {
        setActiveId(id);
    };

    return (
        <section id={block.id} className="space-y-6">
            <div className="rounded-2xl border border-sage bg-sage/5 px-4 py-3.5 md:px-5 md:py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {/* Titre optionnel au-dessus des tabs */}

                <h2 className="text-base md:text-lg font-serif-title font-semibold text-main">Les exercices guidés</h2>

                {/* 🔹 Tabs full-width, responsive, tendance */}
                <div className="w-full max-w-2xl mx-auto">
                    <div
                        className="
                        rounded-2xl border border-perl/60 bg-background
                        p-1.5 md:p-2
                        shadow-sm
                    "
                    >
                        <div className="grid grid-cols-3 gap-1.5">
                            {block.items.map((item) => {
                                const isActive = item.id === activeId;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleClick(item.id)}
                                        className={`
                                        flex items-center justify-center gap-1.5
                                        rounded-xl px-2.5 py-1.5 md:px-3 md:py-2
                                        text-[0.72rem] md:text-[0.8rem] font-medium
                                        border transition-all 
                                        ${
                                            isActive
                                                ? 'bg-sage text-ivory border-sage shadow-sm '
                                                : 'bg-transparent text-main/70 border-transparent hover:bg-sage/5 hover:border-sage/40 hover:text-main cursor-pointer'
                                        }
                                    `}
                                    >
                                        <span className="truncate">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔸 Contenu des onglets : un seul visible à la fois */}
            <div className="space-y-6">
                {block.items.map((item) => (
                    <div key={item.id} id={item.id} className={item.id === activeId ? 'space-y-6' : 'hidden'}>
                        {item.blocks.map((b) => (
                            <TutorialBlockRenderer key={b.id} block={b as TutorialBlock} />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ----------------- VIDEO BLOCK AVEC COVER STYLE PREMIUM ----------------- */

type VideoBlockProps = {
    block: Extract<TutorialSimpleBlock, { kind: 'video' }>;
    wrapperProps: { id: string };
};

function VideoBlock({ block, wrapperProps }: VideoBlockProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    const coverSrc = block.cover?.src;
    const coverAlt = block.cover?.alt ?? block.caption ?? 'Vidéo du tutoriel';
    const hasVideo = Boolean(block.url);

    const autoplayUrl = block.url && block.url.includes('?') ? `${block.url}&autoplay=1&rel=0&modestbranding=1` : block.url ? `${block.url}?autoplay=1&rel=0&modestbranding=1` : '';

    return (
        <section {...wrapperProps} className="animate-subtle-fade-up">
            <div className="space-y-2">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-perl/60 bg-black/5 shadow-sm">
                    {/* COVER + BOUTON PLAY */}
                    {!isPlaying && coverSrc && (
                        <button type="button" onClick={() => setIsPlaying(true)} className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center">
                            <Image src={coverSrc} alt={coverAlt} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />

                            {/* Overlay fondu */}
                            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />

                            {/* Bouton Play */}
                            <div className="absolute flex items-center justify-center">
                                <div
                                    className="
                                        flex h-16 w-16 items-center justify-center
                                        rounded-full bg-sage text-ivory shadow-lg
                                        transition-all
                                        group-hover:bg-ivory group-hover:text-sage
                                    "
                                >
                                    <Play className="h-6 w-6 translate-x-px" />
                                </div>
                            </div>
                        </button>
                    )}

                    {/* IFRAME YOUTUBE APRÈS CLIC */}
                    {hasVideo && isPlaying && (
                        <iframe
                            className="absolute inset-0 h-full w-full"
                            src={autoplayUrl}
                            title={coverAlt}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}

                    {/* FALLBACK : pas de cover + pas de vidéo */}
                    {!coverSrc && !hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center text-main/60">
                            <p className="text-xs md:text-sm">Vidéo : {block.caption ?? 'Tutoriel vidéo'}</p>
                        </div>
                    )}
                </div>

                {block.caption && <p className="text-[0.7rem] text-main/60">{block.caption}</p>}
            </div>
        </section>
    );
}
