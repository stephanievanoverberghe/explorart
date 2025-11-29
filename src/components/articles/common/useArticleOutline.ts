import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ArticleSection } from '@/types/article';

interface OutlineItem {
    id: string;
    label: string;
}

export function useArticleOutline(sections?: ArticleSection[]) {
    const outlineItems: OutlineItem[] = useMemo(
        () =>
            (sections ?? []).map((section) => ({
                id: section.anchorId,
                label: section.label,
            })),
        [sections]
    );

    const totalSections = outlineItems.length;
    const [isOutlineOpen, setIsOutlineOpen] = useState(false);

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

    const scrollToSection = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const offset = 80;

        window.scrollTo({
            top: Math.max(absoluteTop - offset, 0),
            behavior: 'smooth',
        });
    }, []);

    const handleSelect = useCallback(
        (id: string) => {
            scrollToSection(id);
            setIsOutlineOpen(false);
        },
        [scrollToSection]
    );

    return {
        outlineItems,
        totalSections,
        isOutlineOpen,
        openOutline: () => setIsOutlineOpen(true),
        closeOutline: () => setIsOutlineOpen(false),
        toggleOutline: () => setIsOutlineOpen((open) => !open),
        handleSelect,
    };
}
