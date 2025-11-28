'use client';

import { useEffect, useState } from 'react';

interface ArticleScrollProgressProps {
    /** id de l’élément dont on suit la progression (ton <article>) */
    targetId: string;
}

export function ArticleScrollProgress({ targetId }: ArticleScrollProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const el = document.getElementById(targetId);
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const totalScrollable = rect.height - viewportHeight;
            if (totalScrollable <= 0) {
                setProgress(0);
                return;
            }

            // distance déjà parcourue dans l’article
            const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
            const pct = (scrolled / totalScrollable) * 100;
            setProgress(pct);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [targetId]);

    return (
        <div
            className="
                fixed inset-x-0
                top-16 md:top-[81px]
                z-45
                pointer-events-none
            "
            aria-hidden="true"
        >
            {/* barre qui prend 100% de l'écran */}
            <div className="h-1 bg-sage/10 overflow-hidden">
                <div className="h-full bg-sage rounded-full  transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}
