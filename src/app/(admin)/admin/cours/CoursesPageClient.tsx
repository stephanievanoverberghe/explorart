// src/app/(admin)/admin/cours/CoursesPageClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Plus, Pencil, Eye, Trash2, Pin, LockOpen, Layers, X, ChevronRight, Search, SlidersHorizontal, ChevronDown, Tag } from 'lucide-react';

type CourseStatus = 'Publié' | 'Brouillon' | 'En préparation';

type Pillar = 'dessin-peinture' | 'comprendre-une-oeuvre' | 'histoire-de-l-art' | 'histoires-d-artistes' | 'couleurs-harmonie' | 'inspirations' | 'psychologie-de-l-art';

type Course = {
    id: string;
    slug: string;
    title: string;
    level: 'Débutant' | 'Intermédiaire' | 'Tous niveaux';
    duration: string;
    status: CourseStatus;
    students: string;
    modulesCount: number;
    hasIntro: boolean;
    access: 'free' | 'premium';
    isFree?: boolean;
    pinned?: boolean;
    pillar: Pillar;
    heroImage: { src: string; alt: string };
    icon?: LucideIcon;
    hrefEdit: string;
    hrefPreview: string;
    summary?: string;
    priceLabel: string;
    videoCount: number;
    resourceCount: number;
    resourcesLabel: string;
};

type CourseMetric = {
    label: string;
    value: string;
    detail: string;
};

export type CourseListResponse = {
    data: Course[];
    meta: { total: number; page: number; pageSize: number; totalPages: number };
    metrics: CourseMetric[];
};

const statusToQueryMap: Record<CourseStatus, string> = {
    Publié: 'published',
    Brouillon: 'draft',
    'En préparation': 'archived',
};

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function pillarStyles(pillar: Pillar) {
    switch (pillar) {
        case 'dessin-peinture':
            return { dot: 'bg-vert', bar: 'bg-vert', badge: 'border-vert/40 bg-vert/10 text-vert' };
        case 'comprendre-une-oeuvre':
            return { dot: 'bg-bleu', bar: 'bg-bleu', badge: 'border-bleu/40 bg-bleu/10 text-bleu' };
        case 'histoire-de-l-art':
            return { dot: 'bg-terre', bar: 'bg-terre', badge: 'border-terre/40 bg-terre/10 text-terre' };
        case 'histoires-d-artistes':
            return { dot: 'bg-prune', bar: 'bg-prune', badge: 'border-prune/40 bg-prune/10 text-prune' };
        case 'couleurs-harmonie':
            return { dot: 'bg-rose', bar: 'bg-rose', badge: 'border-rose/40 bg-rose/10 text-rose' };
        case 'inspirations':
            return { dot: 'bg-sage', bar: 'bg-sage', badge: 'border-sage/40 bg-sage/10 text-sage' };
        case 'psychologie-de-l-art':
            return { dot: 'bg-prune', bar: 'bg-prune', badge: 'border-prune/40 bg-prune/10 text-prune' };
    }
}

function pillarLabel(pillar: Pillar) {
    switch (pillar) {
        case 'dessin-peinture':
            return 'Dessin & Peinture';
        case 'comprendre-une-oeuvre':
            return 'Comprendre une œuvre';
        case 'histoire-de-l-art':
            return "Histoire de l'art";
        case 'histoires-d-artistes':
            return "Histoires d'artistes";
        case 'couleurs-harmonie':
            return 'Couleurs & harmonie';
        case 'inspirations':
            return 'Inspirations';
        case 'psychologie-de-l-art':
            return "Psychologie de l'art";
    }
}

function StatusPill({ status }: { status: CourseStatus }) {
    const cls =
        status === 'Publié' ? 'border-sage/40 bg-sage/10 text-sage' : status === 'Brouillon' ? 'border-perl/70 bg-white text-main/70' : 'border-main/30 bg-page text-main/80';

    return <span className={cx('rounded-full border px-3 py-1 text-[11px] font-semibold', cls)}>{status}</span>;
}

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
    return <span className={cx('rounded-full border px-3 py-1 text-[11px] font-semibold', className)}>{children}</span>;
}

function PrettySelect({
    label,
    icon,
    value,
    onChange,
    children,
    className,
}: {
    label: string;
    icon: React.ReactNode;
    value: string;
    onChange: (v: string) => void;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cx('flex w-full min-w-0 items-center gap-2 sm:w-auto', className)}>
            <span className="shrink-0 text-xs font-semibold text-main/70">{label}</span>

            <div className="relative w-full min-w-0 sm:w-[220px]">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronDown className="h-4 w-4 text-main/45" />
                </div>

                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cx(
                        'h-10 w-full min-w-0 max-w-full appearance-none rounded-full border border-perl/70 bg-white pl-10 pr-10',
                        'text-xs font-semibold text-main/80 outline-none transition',
                        'hover:bg-page focus:border-main focus:ring-2 focus:ring-main/10'
                    )}
                >
                    {children}
                </select>
            </div>
        </div>
    );
}

function MobileCourseCard({ course, onOpen }: { course: Course; onOpen: () => void }) {
    const Icon = course.icon ?? Layers;
    const s = pillarStyles(course.pillar);

    return (
        <button type="button" onClick={onOpen} className="w-full overflow-hidden rounded-3xl border border-perl/60 bg-white text-left shadow-sm transition hover:bg-page/40">
            <div className="relative aspect-video w-full bg-page/60">
                <Image src={course.heroImage.src} alt={course.heroImage.alt} fill className="object-cover" />
                <div className={cx('absolute left-0 top-0 h-1.5 w-full', s.bar)} />
                <span className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-perl/60 bg-white/90 backdrop-blur">
                    <Icon className="h-5 w-5 text-main" />
                </span>
            </div>

            <div className="p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2 overflow-hidden">
                    <span className={cx('inline-flex h-2.5 w-2.5 rounded-full', s.dot)} />
                    <Pill className={cx('border', s.badge)}>{pillarLabel(course.pillar)}</Pill>
                    <StatusPill status={course.status} />
                </div>

                <div className="min-w-0 space-y-1">
                    <p className="font-serif-title text-lg text-main leading-snug wrap-break-words">{course.title}</p>
                    <p className="text-xs text-main/60 wrap-break-words">
                        {course.level} • {course.duration} • {course.students} • {course.priceLabel}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Pill className="border-perl/60 bg-page/60 text-main/70">{course.modulesCount} modules + intro</Pill>
                    <Pill className="border-perl/60 bg-page/60 text-main/70">{course.videoCount} vidéos</Pill>
                    <Pill className="border-perl/60 bg-page/60 text-main/70">{course.resourceCount} ressources</Pill>

                    {course.pinned ? (
                        <Pill className="border-perl/60 bg-page/60 text-main/75">
                            <span className="inline-flex items-center gap-1.5">
                                <Pin className="h-3.5 w-3.5" />
                                Épinglé
                            </span>
                        </Pill>
                    ) : null}

                    {course.isFree ? (
                        <Pill className="border-perl/60 bg-page/60 text-main/75">
                            <span className="inline-flex items-center gap-1.5">
                                <LockOpen className="h-3.5 w-3.5" />
                                Gratuit
                            </span>
                        </Pill>
                    ) : null}
                </div>

                <p className="text-xs text-main/60">{course.resourcesLabel}</p>

                <div className="pt-1">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-main/80">
                        Ouvrir la fiche
                        <ChevronRight className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </button>
    );
}

function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <button type="button" onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm cursor-pointer" aria-label="Fermer" />

            <div className="relative mx-auto h-full w-full max-w-3xl px-4 py-6 md:py-10 flex items-start justify-center">
                <div className="w-full overflow-hidden rounded-3xl border border-perl/60 bg-white shadow-xl">
                    <div className="flex items-center justify-between gap-3 border-b border-perl/50 px-5 py-4">
                        <div className="min-w-0">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/50">Fiche cours</p>
                            <h3 className="truncate font-serif-title text-lg text-main">{title}</h3>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-perl/60 bg-page hover:bg-ivory transition-colors cursor-pointer"
                            aria-label="Fermer la fenêtre"
                        >
                            <X className="h-5 w-5 text-main" />
                        </button>
                    </div>

                    <div className="max-h-[calc(100vh-140px)] overflow-y-auto overflow-x-hidden">{children}</div>
                </div>
            </div>
        </div>
    );
}

const PAGE_SIZE = 8;

export function CoursesPageClient({ initialData }: { initialData: CourseListResponse }) {
    const [courses, setCourses] = useState<Course[]>(initialData.data);
    const [metrics, setMetrics] = useState<CourseMetric[]>(initialData.metrics);
    const [meta, setMeta] = useState(initialData.meta);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(meta.page);

    const [statusFilter, setStatusFilter] = useState<CourseStatus | 'all'>('all');
    const [pillarFilter, setPillarFilter] = useState<Pillar | 'all'>('all');
    const [flagFree, setFlagFree] = useState(false);
    const [flagPinned, setFlagPinned] = useState(false);

    const totalPages = Math.max(1, meta.totalPages);
    const safePage = Math.min(page, totalPages);

    const pageNumbers = useMemo(() => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

        const pages: Array<number | 'dots'> = [];
        const left = Math.max(1, safePage - 1);
        const right = Math.min(totalPages, safePage + 1);

        const push = (v: number | 'dots') => pages.push(v);

        push(1);

        if (left > 2) push('dots');

        for (let p = left; p <= right; p++) {
            if (p !== 1 && p !== totalPages) push(p);
        }

        if (right < totalPages - 1) push('dots');

        if (totalPages !== 1) push(totalPages);

        return pages;
    }, [safePage, totalPages]);

    const total = meta.total;
    const startIndex = total === 0 ? 0 : (safePage - 1) * meta.pageSize + 1;
    const endIndex = total === 0 ? 0 : Math.min(total, startIndex + courses.length - 1);

    const fetchCourses = async (targetPage: number) => {
        const params = new URLSearchParams({
            page: String(targetPage),
            pageSize: String(PAGE_SIZE),
        });

        if (query.trim()) params.set('q', query.trim());
        if (statusFilter !== 'all') params.set('status', statusToQueryMap[statusFilter]);
        if (pillarFilter !== 'all') params.set('pillar', pillarFilter);
        if (flagFree) params.set('free', 'true');
        if (flagPinned) params.set('pinned', 'true');

        setIsLoading(true);
        try {
            const response = await fetch(`/api/admin/courses?${params.toString()}`, { cache: 'no-store' });
            if (!response.ok) {
                setCourses([]);
                setMeta({ total: 0, page: targetPage, pageSize: PAGE_SIZE, totalPages: 1 });
                setMetrics([]);
                return;
            }
            const payload: CourseListResponse = await response.json();
            setCourses(payload.data);
            setMeta(payload.meta);
            setMetrics(payload.metrics);
            setPage(payload.meta.page);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, statusFilter, pillarFilter, flagFree, flagPinned]);

    const openCourse = (course: Course) => setSelectedCourse(course);
    const closeCourse = () => {
        setConfirmDeleteId(null);
        setSelectedCourse(null);
    };

    const requestDelete = (id: string) => setConfirmDeleteId(id);
    const cancelDelete = () => setConfirmDeleteId(null);

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });

        if (response.ok) {
            setConfirmDeleteId(null);
            setSelectedCourse(null);
            fetchCourses(1);
        }
    };

    const resetFilters = () => {
        setQuery('');
        setStatusFilter('all');
        setPillarFilter('all');
        setFlagFree(false);
        setFlagPinned(false);
        setPage(1);
    };

    return (
        <div className="space-y-8 overflow-x-hidden">
            <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                    <span className="section-label section-label-sage">Cours unitaires</span>
                    <h2 className="font-serif-title text-2xl text-main">Cours</h2>
                    <p className="text-sm text-main/60">Liste → clic → fiche complète en modal (cover + pilier + actions).</p>
                </div>

                <Link
                    href="/admin/cours/new"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-5 py-2 text-sm font-medium text-white transition hover:bg-main/90"
                >
                    <Plus className="h-4 w-4" />
                    Créer un cours
                </Link>
            </header>

            <section className="grid gap-4 md:grid-cols-3">
                {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-3xl border border-perl/60 bg-white px-5 py-5 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-main/50">{metric.label}</p>
                        <p className="mt-3 text-2xl font-semibold text-main">{metric.value}</p>
                        <p className="mt-2 text-sm text-main/60">{metric.detail}</p>
                    </div>
                ))}
            </section>

            <section className="rounded-3xl border border-perl/60 bg-white/95 shadow-sm overflow-hidden overflow-x-hidden">
                <div className="px-5 py-4 border-b border-perl/50 bg-page/50 space-y-4 overflow-x-hidden">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-0.5">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/55">Catalogue</p>
                            <p className="text-xs text-main/60">
                                {total} cours {query.trim() || statusFilter !== 'all' || pillarFilter !== 'all' || flagFree || flagPinned ? 'filtré(s)' : 'au total'}
                            </p>
                        </div>

                        <div className="w-full lg:max-w-xl">
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-main/45" />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Rechercher… (ex : couleurs publié, dessin débutant, croquis…)"
                                    className="w-full rounded-2xl border border-perl/70 bg-white pl-10 pr-10 py-2 text-sm text-main outline-none transition focus:border-main focus:ring-2 focus:ring-main/10"
                                />
                                {query.trim() ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setQuery('');
                                            setPage(1);
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-perl/60 bg-page hover:bg-ivory transition cursor-pointer"
                                        aria-label="Effacer la recherche"
                                    >
                                        <X className="h-4 w-4 text-main/70" />
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-main/55">
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                Filtres :
                            </span>

                            <PrettySelect
                                label="Pilier"
                                value={pillarFilter}
                                onChange={(v) => {
                                    setPillarFilter(v as Pillar | 'all');
                                    setPage(1);
                                }}
                                icon={
                                    pillarFilter !== 'all' ? (
                                        <span className={cx('inline-flex h-2.5 w-2.5 rounded-full', pillarStyles(pillarFilter as Pillar).dot)} />
                                    ) : (
                                        <Tag className="h-4 w-4 text-main/45" />
                                    )
                                }
                            >
                                <option value="all">Tous</option>
                                <option value="dessin-peinture">Dessin & Peinture</option>
                                <option value="comprendre-une-oeuvre">Comprendre une œuvre</option>
                                <option value="histoire-de-l-art">Histoire de l’art</option>
                                <option value="histoires-d-artistes">Histoires d’artistes</option>
                                <option value="couleurs-harmonie">Couleurs & harmonie</option>
                                <option value="inspirations">Inspirations</option>
                                <option value="psychologie-de-l-art">Psychologie de l’art</option>
                            </PrettySelect>

                            <PrettySelect
                                label="Statut"
                                value={statusFilter}
                                onChange={(v) => {
                                    setStatusFilter(v as CourseStatus | 'all');
                                    setPage(1);
                                }}
                                icon={<span className="inline-flex h-2.5 w-2.5 rounded-full bg-main/40" />}
                            >
                                <option value="all">Tous</option>
                                <option value="Publié">Publié</option>
                                <option value="Brouillon">Brouillon</option>
                                <option value="En préparation">En préparation</option>
                            </PrettySelect>

                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFlagFree((v) => !v);
                                        setPage(1);
                                    }}
                                    className={cx(
                                        'rounded-full border px-3 py-2 text-xs font-semibold transition cursor-pointer',
                                        flagFree ? 'border-sage/50 bg-sage/10 text-sage' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                    )}
                                >
                                    Gratuit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setFlagPinned((v) => !v);
                                        setPage(1);
                                    }}
                                    className={cx(
                                        'rounded-full border px-3 py-2 text-xs font-semibold transition cursor-pointer',
                                        flagPinned ? 'border-sage/50 bg-sage/10 text-sage' : 'border-perl/70 bg-white text-main/70 hover:bg-page'
                                    )}
                                >
                                    Épinglé
                                </button>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page transition"
                        >
                            <X className="h-4 w-4" />
                            Réinitialiser
                        </button>
                    </div>

                    {(query.trim() || statusFilter !== 'all' || pillarFilter !== 'all' || flagFree || flagPinned) && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] text-main/55">Filtres actifs :</span>

                            {query.trim() ? (
                                <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/70">Recherche : “{query.trim()}”</span>
                            ) : null}

                            {pillarFilter !== 'all' ? (
                                <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/70">
                                    Pilier : {pillarLabel(pillarFilter as Pillar)}
                                </span>
                            ) : null}

                            {statusFilter !== 'all' ? (
                                <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/70">Statut : {statusFilter}</span>
                            ) : null}

                            {flagFree ? <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/70">Gratuit</span> : null}
                            {flagPinned ? <span className="rounded-full border border-perl/60 bg-white px-3 py-1 text-[11px] font-semibold text-main/70">Épinglé</span> : null}
                        </div>
                    )}
                </div>

                <div className="sm:hidden p-4 space-y-3">
                    {courses.length === 0 ? (
                        <div className="rounded-3xl border border-perl/60 bg-white px-5 py-10 text-center">
                            <p className="text-sm text-main/70">{isLoading ? 'Chargement des cours…' : 'Aucun cours ne correspond à ta recherche.'}</p>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-3 inline-flex items-center justify-center rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page"
                            >
                                Réinitialiser
                            </button>
                        </div>
                    ) : (
                        courses.map((course) => <MobileCourseCard key={course.id || course.slug} course={course} onOpen={() => openCourse(course)} />)
                    )}
                </div>

                <div className="hidden sm:block divide-y divide-perl/40">
                    {courses.length === 0 ? (
                        <div className="px-5 py-10 text-center">
                            <p className="text-sm text-main/70">{isLoading ? 'Chargement des cours…' : 'Aucun cours ne correspond à ta recherche.'}</p>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-3 inline-flex items-center justify-center rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page"
                            >
                                Réinitialiser
                            </button>
                        </div>
                    ) : (
                        courses.map((course) => {
                            const Icon = course.icon ?? Layers;
                            const s = pillarStyles(course.pillar);

                            return (
                                <button
                                    key={course.id || course.slug}
                                    type="button"
                                    onClick={() => openCourse(course)}
                                    className="w-full text-left px-4 sm:px-5 py-4 hover:bg-page/60 transition cursor-pointer overflow-x-hidden"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 space-y-2">
                                            <div className="flex flex-wrap items-center gap-2 min-w-0">
                                                <span className={cx('inline-flex h-2.5 w-2.5 rounded-full', s.dot)} />
                                                <Pill className={cx('border', s.badge)}>{pillarLabel(course.pillar)}</Pill>
                                                <StatusPill status={course.status} />

                                                {course.pinned ? (
                                                    <Pill className="border-perl/60 bg-page/70 text-main/75">
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <Pin className="h-3.5 w-3.5" />
                                                            Épinglé
                                                        </span>
                                                    </Pill>
                                                ) : null}

                                                {course.isFree ? (
                                                    <Pill className="border-perl/60 bg-page/70 text-main/75">
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <LockOpen className="h-3.5 w-3.5" />
                                                            Gratuit
                                                        </span>
                                                    </Pill>
                                                ) : null}
                                            </div>

                                            <div className="space-y-1 min-w-0">
                                                <p className="font-serif-title text-lg text-main leading-snug truncate">{course.title}</p>
                                                <p className="text-xs text-main/60">
                                                    {course.level} • {course.duration} • {course.students} • {course.modulesCount} modules + intro • {course.videoCount} vidéos •{' '}
                                                    {course.resourceCount} ressources • {course.priceLabel}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-perl/60 bg-page/70">
                                            <Icon className="h-5 w-5 text-main" />
                                        </span>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>

                <div className="border-t border-perl/50 bg-white px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between overflow-x-hidden">
                    <p className="text-xs text-main/60">
                        Affichage <span className="font-semibold text-main">{startIndex}</span>–<span className="font-semibold text-main">{endIndex}</span> sur{' '}
                        <span className="font-semibold text-main">{total}</span>
                    </p>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                const nextPage = Math.max(1, safePage - 1);
                                setPage(nextPage);
                                fetchCourses(nextPage);
                            }}
                            disabled={safePage <= 1}
                            className={cx(
                                'rounded-full border px-4 py-2 text-sm font-semibold transition',
                                safePage <= 1 ? 'border-perl/50 bg-page/60 text-main/40 cursor-not-allowed' : 'border-perl/70 bg-white text-main/80 hover:bg-page'
                            )}
                        >
                            Précédent
                        </button>

                        <div className="hidden sm:flex items-center gap-1.5">
                            {pageNumbers.map((p, idx) =>
                                p === 'dots' ? (
                                    <span key={`dots-${idx}`} className="px-2 text-sm text-main/40">
                                        …
                                    </span>
                                ) : (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => {
                                            setPage(p);
                                            fetchCourses(p);
                                        }}
                                        className={cx(
                                            'h-9 w-9 rounded-full border text-sm font-semibold transition cursor-pointer',
                                            p === safePage ? 'border-main bg-main text-white' : 'border-perl/70 bg-white text-main/80 hover:bg-page'
                                        )}
                                        aria-current={p === safePage ? 'page' : undefined}
                                    >
                                        {p}
                                    </button>
                                )
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                const nextPage = Math.min(totalPages, safePage + 1);
                                setPage(nextPage);
                                fetchCourses(nextPage);
                            }}
                            disabled={safePage >= totalPages}
                            className={cx(
                                'rounded-full border px-4 py-2 text-sm font-semibold transition',
                                safePage >= totalPages ? 'border-perl/50 bg-page/60 text-main/40 cursor-not-allowed' : 'border-perl/70 bg-white text-main/80 hover:bg-page'
                            )}
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            </section>

            <Modal open={Boolean(selectedCourse)} title={selectedCourse?.title ?? ''} onClose={closeCourse}>
                {selectedCourse ? (
                    <div className="p-5 sm:p-6 space-y-5">
                        <div className="rounded-3xl border border-perl/60 overflow-hidden bg-page/60">
                            <div className="relative aspect-video w-full">
                                <Image src={selectedCourse.heroImage.src} alt={selectedCourse.heroImage.alt} fill className="object-cover" />
                                <div className={cx('absolute left-0 top-0 h-1.5 w-full', pillarStyles(selectedCourse.pillar).bar)} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <Pill className={cx('border', pillarStyles(selectedCourse.pillar).badge)}>{pillarLabel(selectedCourse.pillar)}</Pill>
                                <StatusPill status={selectedCourse.status} />

                                {selectedCourse.pinned ? (
                                    <Pill className="border-perl/60 bg-page/70 text-main/75">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Pin className="h-3.5 w-3.5" />
                                            Épinglé
                                        </span>
                                    </Pill>
                                ) : null}

                                {selectedCourse.isFree ? (
                                    <Pill className="border-perl/60 bg-page/70 text-main/75">
                                        <span className="inline-flex items-center gap-1.5">
                                            <LockOpen className="h-3.5 w-3.5" />
                                            Gratuit
                                        </span>
                                    </Pill>
                                ) : null}
                            </div>

                            <p className="text-sm text-main/70">
                                {selectedCourse.level} • {selectedCourse.duration} • {selectedCourse.students} • {selectedCourse.priceLabel}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <Pill className="border-perl/60 bg-page/70 text-main/70">{selectedCourse.modulesCount} modules</Pill>
                                <Pill className="border-perl/60 bg-page/70 text-main/70">Intro incluse</Pill>
                                <Pill className="border-perl/60 bg-page/70 text-main/70">{selectedCourse.videoCount} vidéos</Pill>
                                <Pill className="border-perl/60 bg-page/70 text-main/70">{selectedCourse.resourceCount} ressources</Pill>
                            </div>

                            {selectedCourse.summary ? <p className="text-sm text-main/70 max-w-2xl">{selectedCourse.summary}</p> : null}

                            <div className="rounded-2xl border border-perl/60 bg-page/50 p-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-main/55">Ressources incluses</p>
                                <p className="mt-1 text-sm text-main/70">{selectedCourse.resourcesLabel}</p>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-perl/60 bg-white/95 p-4 sm:p-5 space-y-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-main/50">Actions</p>

                            <div className="flex flex-col sm:flex-row gap-2">
                                <Link
                                    href={selectedCourse.hrefEdit}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-semibold text-white transition hover:bg-main/90"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Éditer
                                </Link>

                                <Link
                                    href={selectedCourse.hrefPreview}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 transition hover:border-main/50 hover:bg-page"
                                >
                                    <Eye className="h-4 w-4" />
                                    Prévisualiser
                                    <ChevronRight className="h-4 w-4" />
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => requestDelete(selectedCourse.id)}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-rose/40 bg-rose/5 px-4 py-2 text-sm font-semibold text-rose transition hover:bg-rose/10 cursor-pointer"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Supprimer
                                </button>
                            </div>
                        </div>

                        {confirmDeleteId === selectedCourse.id ? (
                            <div className="rounded-3xl border border-rose/40 bg-rose/5 p-4 sm:p-5 space-y-3">
                                <p className="text-sm font-semibold text-main">Confirmer la suppression ?</p>
                                <p className="text-sm text-main/70">Cette action est définitive.</p>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        type="button"
                                        onClick={cancelDelete}
                                        className="inline-flex items-center justify-center rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(selectedCourse.id)}
                                        className="inline-flex items-center justify-center rounded-full bg-rose px-4 py-2 text-sm font-semibold text-ivory hover:bg-rose/90"
                                    >
                                        Oui, supprimer
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </Modal>
        </div>
    );
}
