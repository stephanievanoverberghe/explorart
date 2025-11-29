'use client';

import { useState, type MouseEvent, useEffect } from 'react';
import { Star } from 'lucide-react';

interface FavoriteToggleProps {
    defaultActive?: boolean;
    variant?: 'pill' | 'floating';
    label?: string;
    helperText?: string;
    className?: string;
}

export function FavoriteToggle({ defaultActive = false, variant = 'pill', label = 'Ajouter aux favoris', helperText, className = '' }: FavoriteToggleProps) {
    const [isActive, setIsActive] = useState(defaultActive);

    // animation pop quand l’état change
    const [animate, setAnimate] = useState(false);

    const toggle = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsActive((prev) => !prev);
        setAnimate(true);
    };

    // supprime la classe après l’animation
    useEffect(() => {
        if (animate) {
            const t = setTimeout(() => setAnimate(false), 220);
            return () => clearTimeout(t);
        }
    }, [animate]);

    const animClass = animate ? 'animate-fav-bounce' : '';

    return (
        <>
            {/* Keyframes une seule fois pour cet élément */}
            <style>{`
                @keyframes fav-bounce {
                    0%   { transform: scale(0.9); }
                    55%  { transform: scale(1.12); }
                    100% { transform: scale(1); }
                }
                .animate-fav-bounce {
                    animation: fav-bounce 0.22s ease-out;
                }
            `}</style>

            {variant === 'floating' ? (
                <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={toggle}
                    className={`
                        inline-flex items-center justify-center
                        rounded-full border shadow-xxs
                        bg-white
                        px-2.5 py-2 text-xs font-medium
                        transition-all duration-200 active:scale-90
                        ${
                            isActive
                                ? 'bg-sage/15 text-sage border-sage/50 cursor-pointer'
                                : 'bg-white/90 text-main/70 border-perl/60 hover:border-ocre/60 hover:text-ocre cursor-pointer'
                        }
                        ${animClass}
                        ${className}
                    `}
                >
                    <Star className="h-4 w-4" strokeWidth={2.4} fill={isActive ? 'currentColor' : 'none'} aria-hidden />
                    <span className="sr-only">{label}</span>
                </button>
            ) : (
                <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={toggle}
                    className={`
                        inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm font-medium shadow-xxs
                        transition-all duration-200 text-left active:scale-[0.96]
                        ${isActive ? 'bg-sage/10 text-sage border-sage/50' : 'bg-white/95 text-main/80 border-perl/60 hover:border-sage/70 hover:text-sage cursor-pointer'}
                        ${animClass}
                        ${className}
                    `}
                >
                    <span
                        className={`
                            inline-flex h-9 w-9 items-center justify-center rounded-full border text-sage/90 shadow-inner
                            ${isActive ? 'bg-sage/15 border-sage/40' : 'bg-sage/5 border-sage/30'}
                        `}
                    >
                        <Star className="h-[18px] w-[18px]" strokeWidth={2.2} fill={isActive ? 'currentColor' : 'none'} aria-hidden />
                    </span>
                    <span className="flex flex-col leading-tight">
                        <span className="text-[0.92rem]">{isActive ? 'Dans tes favoris' : label}</span>
                        <span className="text-[0.78rem] text-main/60">{helperText ?? 'Disponible dans ton Atelier Explor’Art'}</span>
                    </span>
                </button>
            )}
        </>
    );
}
