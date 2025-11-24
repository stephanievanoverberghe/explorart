'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

type VideoBlockProps = {
    title: string;
    youtubeId?: string;
    cover?: string;
    note?: string;
};

export default function VideoBlock({ title, youtubeId, cover, note }: VideoBlockProps) {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="space-y-2">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-perl/60 bg-black/5 shadow-sm">
                {/* IMAGE DE COUVERTURE SI PAS ENCORE PLAYING */}
                {!playing && cover && (
                    <button onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer">
                        <Image src={cover} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />

                        {/* Overlay fondu */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                        {/* Bouton Play */}
                        <div className="absolute flex items-center justify-center">
                            <div
                                className="
                                h-16 w-16 rounded-full 
                                bg-sage 
                                text-ivory 
                                shadow-lg 
                                flex items-center justify-center 
                                transition-all
                                group-hover:bg-ivory group-hover:text-sage
                            "
                            >
                                <Play className="h-6 w-6 translate-x-px" />
                            </div>
                        </div>
                    </button>
                )}

                {/* IFRAME YOUTUBE APRES CLIC */}
                {youtubeId && playing && (
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}

                {/* FALLBACK : pas de cover + pas de vidéo */}
                {!cover && !playing && !youtubeId && (
                    <div className="absolute inset-0 flex items-center justify-center text-main/60">
                        <p className="text-xs md:text-sm">Vidéo : {title}</p>
                    </div>
                )}
            </div>

            {note && <p className="text-[0.7rem] text-main/60">{note}</p>}
        </div>
    );
}
