// src/components/articles/tutorials/ArticleOutlineDrawer.tsx
'use client';

import { X } from 'lucide-react';

type OutlineItem = {
    id: string;
    label: string;
};

type Props = {
    isOpen: boolean;
    items: OutlineItem[];
    onSelect: (id: string) => void;
    onClose: () => void;
};

export function ArticleOutlineDrawer({ isOpen, items, onSelect, onClose }: Props) {
    const handleClick = (id: string) => {
        onSelect(id);
    };

    return (
        <aside
            className={[
                'fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l-3 border-sage bg-background shadow-2xl',
                'transform transition-transform duration-300 ease-out',
                isOpen ? 'translate-x-0' : 'translate-x-full',
            ].join(' ')}
        >
            {/* Header du drawer */}
            <div className="flex items-center justify-between gap-3 border-b border-perl/60 px-4 py-3">
                <div className="space-y-0.5">
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main">Plan du tutoriel</p>
                    <p className="text-xs text-main/80">Accède directement à la section qui t’intéresse.</p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-perl/60 bg-ivory hover:bg-background transition-colors"
                    aria-label="Fermer le plan du tutoriel"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Contenu du drawer : liste des sections */}
            <div className="h-[calc(100vh-3rem)] overflow-y-auto px-3 py-3 md:px-4 md:py-4">
                <nav aria-label="Sommaire du tutoriel" className="space-y-2">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => handleClick(item.id)}
                            className="
                                w-full text-left cursor-pointer group 
                                flex items-center justify-between gap-2 
                                rounded-2xl px-3.5 py-2.5 text-[0.82rem] 
                                text-main/80 
                                transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                hover:bg-sage/20
                                hover:shadow-[0_2px_6px_rgba(0,0,0,0.06)] 
                                hover:-translate-y-px
                                hover:border-sage/50
                                border border-transparent
                                backdrop-blur-[2px]
                            "
                        >
                            <span className="flex items-center gap-2 min-w-0">
                                <span
                                    className="
                                        h-1.5 w-1.5 rounded-full 
                                        bg-sage/60 
                                        transition-all duration-300 
                                        group-hover:bg-sage
                                        group-hover:scale-125 
                                        group-hover:shadow-[0_0_4px_rgba(255,255,255,0.6)]
                                    "
                                />
                                <span className="truncate transition-colors duration-300">{item.label}</span>
                            </span>
                            <span className="text-[0.7rem] text-main/50 transition-all duration-300 group-hover:scale-125 group-hover:text-sage">↗</span>
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
