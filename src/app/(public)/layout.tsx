// src/app/(public)/layout.tsx
import type { ReactNode } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-page text-main">
            <Header />
            <main className="flex-1 bg-ivory">{children}</main>
            <Footer />
        </div>
    );
}
