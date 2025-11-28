// src/components/articles/common/ArticleComments.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

type ArticleCommentsProps = {
    articleSlug: string;
    articleTitle: string;
};

type Comment = {
    id: number;
    author: string;
    content: string;
    createdAt: string;
};

const MAX_LENGTH = 800;

export function ArticleComments({ articleSlug, articleTitle }: ArticleCommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
    const [mood, setMood] = useState<'helped' | 'moved' | 'question' | null>(null);

    const remaining = MAX_LENGTH - content.length;
    const isOverLimit = remaining < 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || isOverLimit) return;

        setIsSubmitting(true);

        // Simule un envoi (backend plus tard)
        setTimeout(() => {
            const newComment: Comment = {
                id: Date.now(),
                author: author.trim() || 'Anonyme',
                content: content.trim(),
                createdAt: new Date().toISOString(),
            };

            setComments((prev) => [newComment, ...prev]);
            setContent('');
            setHasSubmittedOnce(true);
            setIsSubmitting(false);
        }, 250);
    };

    return (
        <section id={`comments-${articleSlug}`} aria-label={`Commentaires sur l’article ${articleTitle}`} className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-perl/40 bg-background px-4 py-6 shadow-sm md:px-6 md:py-7">
                {/* Header */}
                <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-vert/15 bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-vert/80">
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>Échanges autour du tutoriel</span>
                        </div>
                        <h2 className="text-lg font-semibold tracking-tight text-ink md:text-xl">Laisser une trace douce sous ce tutoriel</h2>
                        <p className="max-w-2xl text-sm text-ink/70">
                            Partage ce que tu as ressenti, ce qui t’a aidé, ou ce qui reste flou. Tes mots peuvent débloquer quelqu’un qui hésite encore à poser son trait.
                        </p>
                    </div>

                    <div className="relative flex flex-col items-start gap-2 text-right md:items-end">
                        <span className="inline-flex items-center gap-1 rounded-full bg-ivory px-3 py-1 text-xs font-medium text-ink/80">
                            <Sparkles className="h-3.5 w-3.5 text-vert" />
                            {comments.length === 0 ? 'Aucun commentaire pour le moment' : comments.length === 1 ? '1 commentaire' : `${comments.length} commentaires`}
                        </span>
                        <span className="text-[11px] text-ink/60">Pas de compte, pas d’inscription — juste toi et ton crayon.</span>
                    </div>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="relative mt-6 space-y-4 rounded-2xl border border-perl/40 bg-ivory p-4 md:p-5">
                    {/* mini chips “mood” */}
                    <div className="flex flex-wrap gap-2 text-xs text-ink/70">
                        <span className="mr-1 text-[11px] uppercase tracking-wide text-ink/60">Ton ressenti :</span>
                        <button
                            type="button"
                            onClick={() => setMood(mood === 'helped' ? null : 'helped')}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 transition ${
                                mood === 'helped' ? 'border-vert/60 bg-vert/10 text-vert' : 'cursor-pointer border-perl/60 bg-ivory/70 hover:border-vert/50 hover:bg-vert/5'
                            }`}
                        >
                            <span>✨ Ça m’a aidé·e</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setMood(mood === 'moved' ? null : 'moved')}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 transition ${
                                mood === 'moved' ? 'border-rose/60 bg-rose/10 text-rose' : 'cursor-pointer border-perl/60 bg-ivory/70 hover:border-rose/50 hover:bg-rose/5'
                            }`}
                        >
                            <span>💗 Ça m’a touché·e</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setMood(mood === 'question' ? null : 'question')}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 transition ${
                                mood === 'question' ? 'border-bleu/60 bg-bleu/10 text-bleu' : 'cursor-pointer border-perl/60 bg-ivory/70 hover:border-bleu/50 hover:bg-bleu/5'
                            }`}
                        >
                            <span>❓ J’ai une question</span>
                        </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                        <div className="space-y-1 md:col-span-1">
                            <label htmlFor={`comment-author-${articleSlug}`} className="text-xs font-medium uppercase tracking-wide text-ink/70">
                                Prénom (optionnel)
                            </label>
                            <input
                                id={`comment-author-${articleSlug}`}
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Ton prénom ou un pseudo"
                                className="w-full rounded-xl border border-perl/60 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-vert/70 focus:ring-1 focus:ring-vert/50"
                            />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor={`comment-content-${articleSlug}`} className="text-xs font-medium uppercase tracking-wide text-ink/70">
                                    Ton message
                                </label>
                                <span className={`text-[11px] ${isOverLimit ? 'text-red-500' : 'text-ink/50'}`}>{remaining} caractères restants</span>
                            </div>
                            <textarea
                                id={`comment-content-${articleSlug}`}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={
                                    mood === 'question'
                                        ? 'Pose ta question sur un geste, une étape, une difficulté que tu rencontres…'
                                        : mood === 'helped'
                                        ? 'Qu’est-ce qui t’a aidé·e dans ce tutoriel ? Un geste, une phrase, un exercice en particulier ?'
                                        : mood === 'moved'
                                        ? 'Raconte ce que tu as ressenti en dessinant, ce qui a changé dans ton geste, ton regard…'
                                        : 'Ce que tu as ressenti, ce qui t’a aidé, une question sur un exercice…'
                                }
                                rows={4}
                                maxLength={MAX_LENGTH + 200} // on laisse taper un peu plus mais on bloque à l’envoi
                                className={`w-full rounded-2xl border bg-white/90 px-3 py-2.5 text-sm outline-none transition resize-none ${
                                    isOverLimit
                                        ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400/80'
                                        : 'border-perl/60 focus:border-vert/70 focus:ring-1 focus:ring-vert/50'
                                }`}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <button
                            type="submit"
                            disabled={isSubmitting || !content.trim() || isOverLimit}
                            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-vert px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-vert/90 disabled:cursor-not-allowed disabled:bg-vert/40"
                        >
                            {isSubmitting ? 'Envoi en cours…' : 'Publier mon message'}
                        </button>

                        <div className="flex flex-col items-start gap-1 text-xs text-ink/60 md:items-end">
                            {hasSubmittedOnce ? (
                                <span className="text-[11px]">
                                    Merci pour ton partage 🙏 (pour l’instant, les commentaires restent sur ton navigateur — la vraie section communauté arrivera plus tard).
                                </span>
                            ) : (
                                <span className="text-[11px]">Les commentaires sont modérés par la douceur : bienveillance obligatoire, perfection interdite.</span>
                            )}
                        </div>
                    </div>
                </form>

                {/* Liste des commentaires */}
                <div className="relative mt-6 space-y-4">
                    {comments.length === 0 ? (
                        <p className="text-sm text-ink/60">Aucun commentaire pour le moment. Tu peux être la première personne à laisser une empreinte douce sous ce tutoriel.</p>
                    ) : (
                        <>
                            <h3 className="text-sm font-medium text-ink/90">Derniers partages</h3>
                            <ul className="space-y-3.5">
                                {comments.map((comment) => {
                                    const date = new Date(comment.createdAt);
                                    const initials =
                                        (comment.author || 'A')
                                            .split(' ')
                                            .map((p) => p[0])
                                            .join('')
                                            .slice(0, 2)
                                            .toUpperCase() || 'A';

                                    return (
                                        <li
                                            key={comment.id}
                                            className="group flex gap-3 rounded-2xl border border-perl/40 bg-white/90 p-3.5 text-sm shadow-xxs transition hover:-translate-y-0.5 hover:border-vert/40 hover:shadow-sm"
                                        >
                                            {/* avatar cercle avec initiales */}
                                            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-vert/10 text-xs font-semibold text-vert">
                                                {initials}
                                            </div>

                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="font-medium text-ink">{comment.author}</span>
                                                    <span className="text-[11px] uppercase tracking-wide text-ink/45">
                                                        {date.toLocaleDateString('fr-FR', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: '2-digit',
                                                        })}
                                                    </span>
                                                </div>
                                                <p className="whitespace-pre-line text-ink/80">{comment.content}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
