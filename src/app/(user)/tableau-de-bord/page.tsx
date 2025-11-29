// src/app/(user)/tableau-de-bord/page.tsx

import { Suspense } from 'react';
import { AtelierShell } from '@/components/user/atelier/AtelierShell';

export default function TableauDeBordPage() {
    return (
        <Suspense
            fallback={
                <main className="py-8 md:py-10">
                    <section className="space-y-6 md:space-y-8">
                        <div className="h-32 md:h-40 rounded-3xl bg-ivory/80 border border-perl/40 animate-pulse" />
                        <div className="h-10 rounded-2xl bg-ivory/80 border border-perl/40 animate-pulse" />
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="h-40 rounded-3xl bg-ivory/80 border border-perl/40 animate-pulse" />
                            <div className="h-40 rounded-3xl bg-ivory/80 border border-perl/40 animate-pulse" />
                        </div>
                    </section>
                </main>
            }
        >
            <AtelierShell />
        </Suspense>
    );
}
