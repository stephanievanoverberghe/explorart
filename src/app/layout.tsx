// src/app/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Explor'Art – Blog d’art lumineux et accessible",
    description: 'Un espace pour apprendre à dessiner, comprendre les œuvres, explorer les couleurs et ressentir l’art autrement.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
            <body className="min-h-screen bg-page text-main antialiased">{children}</body>
        </html>
    );
}
