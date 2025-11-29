// src/app/(user)/layout.tsx
import { Header } from '@/components/layout/Header';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* HEADER GLOBAL */}
            <Header />

            {/* CONTENU DE L’ESPACE MEMBRE */}
            <main className="bg-ivory min-h-screen pt-20 pb-16">
                <div className="container-page">{children}</div>
            </main>
        </>
    );
}
