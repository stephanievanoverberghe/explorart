import Link from 'next/link';
import { MessageCircle, Filter, MoreHorizontal } from 'lucide-react';
import { mockComments, type CommentStatus } from './atelier-data';
import { PanelHeader } from './PanelHeader';

type FilterId = CommentStatus | 'all';

export function CommentsPanel() {
    const hasComments = mockComments.length > 0;

    // UI only : filtre figé pour l’instant
    const activeFilter: FilterId = 'all';
    const filtered = mockComments.filter((c) => (activeFilter === 'all' ? true : c.status === activeFilter));

    if (!hasComments) {
        return (
            <section className="relative overflow-hidden rounded-3xl border border-perl/60 bg-white/96 p-7 md:p-9 text-center shadow-sm" aria-label="Commentaires Explor'Art">
                <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_18%_22%,#b45c77_0,transparent_46%),radial-gradient(circle_at_82%_82%,#1e3d72_0,transparent_50%)]" />
                <div className="pointer-events-none absolute inset-4 rounded-[1.75rem] border border-perl/30" />

                <div className="relative space-y-5">
                    <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ivory shadow-xxs ring-1 ring-perl/40">
                        <MessageCircle className="h-7 w-7 text-main/80" />
                    </div>

                    <div className="space-y-2">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Tes traces écrites</p>
                        <h2 className="font-serif-title text-xl md:text-2xl text-main">Pas encore de commentaire laissé</h2>
                        <p className="mx-auto max-w-xl text-sm md:text-base text-main/70">
                            Dès que tu laisseras un commentaire sous un article, il apparaîtra ici. Un endroit pour retrouver facilement ce que tu as partagé et les réponses
                            reçues.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 pt-1 text-sm">
                        <Link
                            href="/articles"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-4 py-2.5 font-medium text-ivory shadow-sm transition hover:-translate-y-0.5 hover:bg-main/90"
                        >
                            <span>Découvrir un article</span>
                            <span aria-hidden>↗</span>
                        </Link>
                        <Link
                            href="/categories"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-ivory px-4 py-2.5 font-medium text-main/80 transition hover:-translate-y-0.5 hover:border-sage/70 hover:bg-sage/5"
                        >
                            <span>Explorer les 7 piliers</span>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-5 md:space-y-7" aria-label="Commentaires Explor'Art">
            {/* ✅ Header seulement si contenu */}
            <PanelHeader
                kicker="Commentaires"
                title="Tes échanges avec Explor'Art"
                description="Retrouve en un coup d’œil ce que tu as écrit sous les articles, les réponses et les idées que tu veux garder comme repères."
                chipsSlot={
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3 py-1 shadow-xxs ring-1 ring-perl/40">
                        <MessageCircle className="h-3.5 w-3.5 text-main/70" />
                        <span>{mockComments.length} commentaire(s)</span>
                    </span>
                }
                rightSlot={
                    <button
                        type="button"
                        className="cursor-pointer inline-flex flex-1 md:flex-none items-center justify-center gap-1.5 rounded-full border border-perl/60 bg-white px-3 py-2 text-[0.85rem] text-main/70 shadow-xxs transition hover:border-sage/70 hover:bg-sage/5"
                    >
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filtre (bientôt)</span>
                    </button>
                }
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
        </section>
    );
}

type CommentCardProps = {
    comment: (typeof mockComments)[number];
};

function CommentCard({ comment }: CommentCardProps) {
    const isPending = comment.status === 'pending';
    const isArchived = comment.status === 'archived';

    let statusLabel = 'Publié';
    let statusClass = 'bg-sage/10 text-sage';
    if (isPending) {
        statusLabel = 'En attente';
        statusClass = 'bg-rose/10 text-rose/80';
    }
    if (isArchived) {
        statusLabel = 'Archivé';
        statusClass = 'bg-perl/20 text-main/60';
    }

    return (
        <article className="group relative flex h-full flex-col gap-3 rounded-2xl border border-perl/50 bg-white/96 p-4 shadow-xxs transition-all hover:-translate-y-0.5 hover:border-sage/70 hover:shadow-sm">
            <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-2.5 py-1 text-[0.78rem] text-main/70 shadow-xxs">
                    <span className={`h-1.5 w-1.5 rounded-full ${comment.pillarColorClass}`} />
                    <span className="truncate max-w-40 sm:max-w-48">{comment.pillarTag}</span>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.72rem] ${statusClass}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current/60" />
                    <span>{statusLabel}</span>
                </span>
            </div>

            <div className="space-y-1.5">
                <Link href={comment.articleHref} className="font-serif-title text-[0.96rem] text-main decoration-1 underline-offset-4 hover:underline md:text-base">
                    {comment.articleTitle}
                </Link>
                <p className="text-[0.83rem] leading-relaxed text-main/70 line-clamp-3">“{comment.excerpt}”</p>
            </div>

            <div className="mt-auto flex items-center justify-between gap-2 pt-1 text-[0.78rem] text-main/60">
                <span>{comment.createdAt}</span>
                <button
                    type="button"
                    className="cursor-pointer inline-flex items-center gap-1 rounded-full bg-ivory px-2.5 py-1 text-[0.75rem] text-main/70 transition hover:bg-sage/5 hover:text-main"
                >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                    <span>Actions (bientôt)</span>
                </button>
            </div>
        </article>
    );
}
