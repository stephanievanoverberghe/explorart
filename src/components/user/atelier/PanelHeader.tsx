import type { ReactNode } from 'react';

type PanelHeaderProps = {
    kicker: string;
    title: string;
    description?: string;
    rightSlot?: ReactNode; // CTA à droite (md+)
    chipsSlot?: ReactNode; // chips / stats sous le texte
    className?: string;
};

export function PanelHeader({ kicker, title, description, rightSlot, chipsSlot, className = '' }: PanelHeaderProps) {
    return (
        <header
            className={['rounded-3xl border border-perl/50 bg-white/95 px-5 py-4 shadow-sm', 'flex flex-col gap-4 md:flex-row md:items-start md:justify-between', className].join(
                ' '
            )}
        >
            <div className="space-y-2 max-w-2xl">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">{kicker}</p>
                <h2 className="font-serif-title text-xl md:text-2xl text-main">{title}</h2>
                {description ? <p className="text-sm text-main/70">{description}</p> : null}

                {chipsSlot ? <div className="flex flex-wrap gap-2 pt-1 text-[0.82rem] text-main/70">{chipsSlot}</div> : null}
            </div>

            {rightSlot ? <div className="flex w-full flex-wrap gap-2 md:w-auto md:justify-end">{rightSlot}</div> : null}
        </header>
    );
}
