// src/components/articles/tutorials/TutorialOutlineHandle.tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
    isOpen: boolean;
    onToggle: () => void;
};

export function TutorialOutlineHandle({ isOpen, onToggle }: Props) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`
                fixed top-1/2 z-50 -translate-y-1/2
                bg-sage border border-sage/60 shadow-md
                rounded-l-full
                cursor-pointer
                px-2 py-3
                items-center justify-center
                hover:bg-sage
                transition-all duration-300
                ${isOpen ? 'right-96' : 'right-0'}
            `}
            aria-label={isOpen ? 'Fermer le plan du tutoriel' : 'Ouvrir le plan du tutoriel'}
        >
            {isOpen ? <ChevronRight className="h-6 w-6 text-ivory" /> : <ChevronLeft className="h-6 w-6 text-ivory" />}
        </button>
    );
}
