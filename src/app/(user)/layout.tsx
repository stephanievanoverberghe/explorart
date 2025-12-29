// src/app/(user)/layout.tsx
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAuthUser } from '@/lib/auth/session';

export default async function UserLayout({ children }: { children: ReactNode }) {
    const authUser = await getAuthUser();

    if (!authUser) {
        redirect('/connexion?redirect=/tableau-de-bord');
    }

    return (
        <>
            <Header />
            {/* CONTENU DE L’ESPACE MEMBRE */}
            <main className="bg-ivory min-h-screen pt-4 pb-16">
                <div className="container-page">{children}</div>
            </main>
            <Footer />
        </>
    );
}
