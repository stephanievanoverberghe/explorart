// src/components/admin/courses/CourseUI.tsx
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

export function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

/** Small badges (top-right, etc.) */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
    return <span className={cx('rounded-full border border-perl/60 bg-page/60 px-3 py-1 text-[11px] font-semibold text-main/70', className)}>{children}</span>;
}

/** Consistent page header (label + title + desc) */
export function PageHeader({ label, title, description, className }: { label: string; title: string; description?: ReactNode; className?: string }) {
    return (
        <header className={cx('space-y-2', className)}>
            <span className="section-label section-label-sage">{label}</span>
            <h2 className="font-serif-title text-2xl text-main">{title}</h2>
            {description ? <p className="text-sm text-main/60">{description}</p> : null}
        </header>
    );
}

/** Top bar with back + right side slot */
export function TopBar({ backHref, backLabel, right, className }: { backHref: string; backLabel: React.ReactNode; right?: ReactNode; className?: string }) {
    return (
        <div className={cx('flex items-center justify-between gap-3', className)}>
            <Link
                href={backHref}
                className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
            >
                {backLabel}
            </Link>
            {right ?? null}
        </div>
    );
}

/** Card wrapper */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
    return <section className={cx('rounded-3xl border border-perl/60 bg-white/95 shadow-sm overflow-hidden', className)}>{children}</section>;
}

export function CardHeader({ title, subtitle, right, className }: { title: string; subtitle?: ReactNode; right?: ReactNode; className?: string }) {
    return (
        <div className={cx('px-5 py-4 border-b border-perl/50 bg-page/50 flex items-start justify-between gap-3', className)}>
            <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-main/55">{title}</p>
                {subtitle ? <p className="mt-1 text-xs text-main/60">{subtitle}</p> : null}
            </div>
            {right ? <div className="shrink-0">{right}</div> : null}
        </div>
    );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cx('p-5 sm:p-6', className)}>{children}</div>;
}

/** Action tile */
export function ActionTile({
    href,
    kicker,
    title,
    desc,
    icon,
    className,
}: {
    href: string;
    kicker: string;
    title: ReactNode;
    desc?: ReactNode;
    icon?: ReactNode;
    className?: string;
}) {
    return (
        <Link href={href} className={cx('group rounded-3xl border border-perl/60 bg-white p-4 hover:bg-page/50 transition cursor-pointer', className)}>
            <p className="text-xs uppercase tracking-[0.18em] text-main/55">{kicker}</p>
            <p className="mt-1 text-sm font-semibold text-main inline-flex items-center gap-2">{title}</p>
            {desc ? <p className="mt-2 text-xs text-main/60">{desc}</p> : null}
            {icon ? <div className="mt-3 text-main/70">{icon}</div> : null}
        </Link>
    );
}

/** Small shortcut chips row (Hub / Cours etc.) */
export function QuickLinks({ items, className }: { items: Array<{ href: string; label: string }>; className?: string }) {
    return (
        <div className={cx('flex items-center gap-2', className)}>
            {items.map((it) => (
                <Link
                    key={it.href}
                    href={it.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                >
                    <ExternalLink className="h-4 w-4" />
                    {it.label}
                </Link>
            ))}
        </div>
    );
}
