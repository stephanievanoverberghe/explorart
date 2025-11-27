// src/components/articles/common/ArticleSections.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ChevronDown } from 'lucide-react';

import type {
    ArticleBlock,
    ArticleSimpleBlock,
    ArticleTwoColsBlock,
    ArticleSection,
    ArticleExercisesGroupBlock,
    ArticleSectionCardBlock,
    ArticleRow,
    ArticleColumn,
} from '@/types/article';

import { MarkdownProse } from '@/components/articles/common/MarkdownProse';

type SectionsProps = {
    sections: ArticleSection[];
};

export function ArticleSections({ sections }: SectionsProps) {
    if (!sections || sections.length === 0) return null;

    return (
        <div className="space-y-24">
            {sections.map((section) => (
                <section key={section.id} id={section.anchorId} className="space-y-8 scroll-mt-28">
                    {/* 🏷️ Titre de section si tu veux l'afficher un jour */}
                    {/* {section.label && <h2 className="text-lg font-serif-title">{section.label}</h2>} */}

                    {/* 🧱 1) layout builder : rows / colonnes */}
                    {section.rows && section.rows.map((row) => <ArticleRowRenderer key={row.id} row={row} />)}

                    {/* 📚 2) fallback : pile de blocks */}
                    {section.blocks && section.blocks.map((block) => <ArticleBlockRenderer key={block.id} block={block} />)}
                </section>
            ))}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                RENDER BLOCS                                */
/* -------------------------------------------------------------------------- */

function ArticleBlockRenderer({ block }: { block: ArticleBlock }) {
    if (block.kind === 'two-cols') {
        return <TwoColsBlock block={block} />;
    }

    if (block.kind === 'exercises-group') {
        return <ExercisesGroupBlock block={block} />;
    }

    if (block.kind === 'section-card') {
        return <SectionCardBlock block={block} />;
    }

    return <SimpleBlock block={block} />;
}

function SimpleBlock({ block }: { block: ArticleSimpleBlock }) {
    const wrapperProps = { id: block.id };

    switch (block.kind) {
        case 'rich-text':
            return (
                <section {...wrapperProps}>
                    {block.title && <h2 className="mb-3 text-xl font-semibold md:text-2xl font-serif-title">{block.title}</h2>}
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
                        <h3 className={`${titleClass} mb-2 flex items-center gap-2 font-semibold`}>
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
                <section {...wrapperProps} className="rounded-2xl border border-vert/30 bg-ivory/80 p-4 shadow-sm md:p-5">
                    <div className={`grid gap-4 ${hasMedia ? 'md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)]' : ''}`}>
                        <div>
                            <div className="mb-2 flex items-baseline justify-between gap-3">
                                <h2 className="text-lg font-semibold md:text-xl font-serif-title">{block.title}</h2>
                                {block.subtitle && <p className="text-[0.7rem] uppercase tracking-[0.18em] text-vert md:text-xs">{block.subtitle}</p>}
                            </div>

                            {block.goalMarkdown && (
                                <div className="mb-3 text-sm text-main/90">
                                    <MarkdownProse content={block.goalMarkdown} />
                                </div>
                            )}

                            <div className="mt-3">
                                <h3 className="mb-1 text-sm font-semibold text-main">Étapes</h3>
                                <ol className="list-inside list-decimal space-y-1.5 text-sm text-main/90">
                                    {block.steps.map((s, i) => (
                                        <li key={i}>{s}</li>
                                    ))}
                                </ol>
                            </div>

                            {block.variants && block.variants.length > 0 && (
                                <div className="mt-3">
                                    <h3 className="mb-1 text-sm font-semibold text-main">Variantes</h3>
                                    <ul className="list-inside list-disc space-y-1.5 text-sm text-main/90">
                                        {block.variants.map((v, i) => (
                                            <li key={i}>{v}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {block.errors && block.errors.length > 0 && (
                                <div className="mt-3">
                                    <h3 className="mb-1 text-sm font-semibold text-main">Erreurs courantes</h3>
                                    <ul className="list-inside list-disc space-y-1.5 text-sm text-main/90">
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
                                    <Image src={block.media.src} alt={block.media.alt} width={700} height={700} className="h-full w-full object-cover" />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            );
        }

        case 'image': {
            const { fullWidth, emphasis = 'soft' } = block;

            const wrapperClass = [fullWidth ? '-mx-4 md:-mx-8' : '', 'animate-subtle-fade-up'].filter(Boolean).join(' ');

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
                        {emphasis === 'hero' ? (
                            <div className="relative h-52 w-full md:h-72">
                                <Image src={block.src} alt={block.alt} fill className="object-cover" />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
                            </div>
                        ) : (
                            <Image src={block.src} alt={block.alt} width={900} height={600} className="h-full w-full object-cover" />
                        )}
                    </div>

                    {block.caption && <figcaption className="mt-2 text-xs text-main/60">{block.caption}</figcaption>}
                </figure>
            );
        }

        case 'video':
            return <VideoBlock block={block} wrapperProps={wrapperProps} />;

        case 'resources-grid':
            return (
                <section {...wrapperProps} className="space-y-2 rounded-2xl border border-sage bg-sage/5 p-4 shadow-sm md:p-5">
                    {block.title && <h2 className="text-xl font-semibold md:text-2xl font-serif-title">{block.title}</h2>}
                    <div className="grid gap-4 md:grid-cols-3">
                        {block.items.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className="group rounded-2xl border border-sage/50 bg-background px-4 py-3 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-sage/80 hover:bg-sage/5"
                            >
                                {item.badge && (
                                    <span className="mb-2 inline-flex items-center rounded-full bg-sage/10 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-sage">
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

        case 'faq':
            return <FAQBlock block={block} wrapperProps={wrapperProps} />;

        case 'divider':
            return <div {...wrapperProps} className="my-8 border-t border-dashed border-perl/60" />;

        default:
            return null;
    }
}

/* -------------------------------------------------------------------------- */
/*                        BLOCS COMPLEXES / COMPOSÉS                          */
/* -------------------------------------------------------------------------- */

function TwoColsBlock({ block }: { block: ArticleTwoColsBlock }) {
    const layout = block.layout ?? 'balanced';
    const variant = block.variant ?? 'default';

    const gridClass =
        layout === 'balanced' ? 'lg:grid-cols-2' : layout === 'sidebar-right' ? 'md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]' : 'md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)]';

    const [left, right] = layout === 'sidebar-left' ? [block.right, block.left] : [block.left, block.right];

    if (variant === 'section-card') {
        return (
            <section id={block.id}>
                <div className="rounded-3xl border border-perl/60 bg-background px-4 py-4 shadow-sm md:px-6 md:py-6">
                    {block.hero && (
                        <figure className="mb-4">
                            <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-black/5 md:h-60">
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

type SectionCardBlockProps = {
    block: ArticleSectionCardBlock;
};

function SectionCardBlock({ block }: SectionCardBlockProps) {
    return (
        <section id={block.id} className="animate-subtle-fade-up">
            <div className="space-y-6 rounded-3xl border border-perl/60 bg-background px-4 py-4 shadow-sm md:px-6 md:py-6">
                {block.blocks.map((child) => (
                    <ArticleBlockRenderer key={child.id} block={child as ArticleBlock} />
                ))}
            </div>
        </section>
    );
}

type ExercisesGroupBlockProps = {
    block: ArticleExercisesGroupBlock;
};

function ExercisesGroupBlock({ block }: ExercisesGroupBlockProps) {
    const [activeId, setActiveId] = useState(block.items[0]?.id ?? '');

    const handleClick = (id: string) => {
        setActiveId(id);
    };

    return (
        <section id={block.id} className="space-y-6">
            <div className="flex flex-col gap-3 rounded-2xl border border-sage bg-sage/5 px-4 py-3.5 md:flex-row md:items-center md:justify-between md:px-5 md:py-4">
                <h2 className="text-base font-semibold text-main md:text-lg font-serif-title">{block.title ?? 'Les exercices guidés'}</h2>

                <div className="mx-auto w-full max-w-2xl">
                    <div className="rounded-2xl border border-perl/60 bg-background p-1.5 shadow-sm md:p-2">
                        <div className="grid grid-cols-3 gap-1.5">
                            {block.items.map((item) => {
                                const isActive = item.id === activeId;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleClick(item.id)}
                                        className={`flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[0.72rem] font-medium border transition-all md:px-3 md:py-2 md:text-[0.8rem] ${
                                            isActive
                                                ? 'border-sage bg-sage text-ivory shadow-sm'
                                                : 'border-transparent bg-transparent text-main/70 hover:border-sage/40 hover:bg-sage/5 hover:text-main cursor-pointer'
                                        }`}
                                    >
                                        <span className="truncate">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {block.items.map((item) => (
                    <div key={item.id} id={item.id} className={item.id === activeId ? 'space-y-6' : 'hidden'}>
                        {item.blocks.map((b) => (
                            <ArticleBlockRenderer key={b.id} block={b as ArticleBlock} />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   FAQ                                      */
/* -------------------------------------------------------------------------- */

type FAQBlockProps = {
    block: Extract<ArticleSimpleBlock, { kind: 'faq' }>;
    wrapperProps: { id: string };
};

function FAQBlock({ block, wrapperProps }: FAQBlockProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section {...wrapperProps} className="space-y-4 rounded-3xl border border-perl/60 bg-background px-4 py-4 shadow-sm animate-subtle-fade-up md:px-6 md:py-6">
            {block.title && (
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-main md:text-2xl font-serif-title">{block.title}</h2>
                    <span className="hidden items-center rounded-full bg-vert/8 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-vert md:inline-flex">FAQ</span>
                </div>
            )}

            <div className="space-y-3">
                {block.items.map((item, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div key={index} className="rounded-2xl border border-sage/40 bg-sage/5 shadow-sm">
                            <button
                                type="button"
                                onClick={() => toggle(index)}
                                className="flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-3 text-left md:px-4 md:py-3"
                            >
                                <span className="text-[0.9rem] font-semibold text-sage md:text-[0.95rem]">{item.question}</span>

                                <span
                                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-sage bg-sage transition-transform duration-200 ${
                                        isOpen ? 'rotate-180' : ''
                                    }`}
                                >
                                    <ChevronDown className="h-3 w-3 text-ivory" />
                                </span>
                            </button>

                            <div
                                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out ${
                                    isOpen ? 'grid-rows-[1fr] block' : 'grid-rows-[0fr] hidden'
                                }`}
                            >
                                <div className="min-h-0 px-3 pb-3 md:px-4 md:pb-4">
                                    <div className="border-t border-sage/40 pt-3 text-[0.85rem] text-main/80 md:text-sm">
                                        <MarkdownProse content={item.answer} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/*                              VIDEO AVEC COVER                              */
/* -------------------------------------------------------------------------- */

type VideoBlockProps = {
    block: Extract<ArticleSimpleBlock, { kind: 'video' }>;
    wrapperProps: { id: string };
};

function VideoBlock({ block, wrapperProps }: VideoBlockProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    const coverSrc = block.cover?.src;
    const coverAlt = block.cover?.alt ?? block.caption ?? 'Vidéo de l’article';
    const hasVideo = Boolean(block.url);

    const autoplayUrl = block.url && block.url.includes('?') ? `${block.url}&autoplay=1&rel=0&modestbranding=1` : block.url ? `${block.url}?autoplay=1&rel=0&modestbranding=1` : '';

    return (
        <section {...wrapperProps} className="animate-subtle-fade-up">
            <div className="space-y-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-perl/60 bg-black/5 shadow-sm">
                    {!isPlaying && coverSrc && (
                        <button type="button" onClick={() => setIsPlaying(true)} className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center">
                            <Image src={coverSrc} alt={coverAlt} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />

                            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />

                            <div className="absolute flex items-center justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-ivory shadow-lg transition-all group-hover:bg-ivory group-hover:text-sage">
                                    <Play className="h-6 w-6 translate-x-px" />
                                </div>
                            </div>
                        </button>
                    )}

                    {hasVideo && isPlaying && (
                        <iframe
                            className="absolute inset-0 h-full w-full"
                            src={autoplayUrl}
                            title={coverAlt}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}

                    {!coverSrc && !hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center text-main/60">
                            <p className="text-xs md:text-sm">Vidéo : {block.caption ?? 'Contenu vidéo'}</p>
                        </div>
                    )}
                </div>

                {block.caption && <p className="text-[0.7rem] text-main/60">{block.caption}</p>}
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   ROWS                                     */
/* -------------------------------------------------------------------------- */

function ArticleRowRenderer({ row }: { row: ArticleRow }) {
    const cols = row.columns;
    const count = cols.length;

    const visibleCols = cols.slice(0, 4);

    const gridClass = count === 1 ? 'grid gap-6' : count === 2 ? 'grid gap-6 md:grid-cols-2' : count === 3 ? 'grid gap-6 md:grid-cols-3' : 'grid gap-6 md:grid-cols-4';

    return (
        <div className={gridClass}>
            {visibleCols.map((col: ArticleColumn) => (
                <div key={col.id} className="space-y-4">
                    {col.blocks.map((block: ArticleBlock) => (
                        <ArticleBlockRenderer key={block.id} block={block} />
                    ))}
                </div>
            ))}
        </div>
    );
}
