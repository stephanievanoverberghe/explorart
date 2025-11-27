import Link from 'next/link';

interface ArticleCardProps {
    href: string;
    label: string;
    levelLabel: string;
    title: string;
    excerpt: string;
}

export function ArticleCard({ href, label, levelLabel, title, excerpt }: ArticleCardProps) {
    return (
        <article className="card h-full flex flex-col">
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                {label}
                {levelLabel && <> · {levelLabel}</>}
            </p>

            <h2 className="text-lg font-semibold mb-2">
                <Link href={href}>{title}</Link>
            </h2>

            <p className="text-sm text-slate-700 mb-4 flex-1">{excerpt}</p>

            <Link href={href} className="text-sm font-medium underline mt-auto">
                Lire l’article
            </Link>
        </article>
    );
}
