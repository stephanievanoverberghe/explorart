// src/app/(admin)/admin/cours/[courseId]/setup/layout.tsx
'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

const steps = [
    { key: 'identity', label: 'Identité', hrefSuffix: '/setup/identity' },
    { key: 'intent', label: 'Intention', hrefSuffix: '/setup/intent' },
    { key: 'structure', label: 'Structure', hrefSuffix: '/setup/structure' },
    { key: 'access', label: 'Accès', hrefSuffix: '/setup/access' },
    { key: 'pricing', label: 'Prix', hrefSuffix: '/setup/pricing' },
    { key: 'resources', label: 'Ressources', hrefSuffix: '/setup/resources' },
    { key: 'validation', label: 'Validation', hrefSuffix: '/setup/validation' },
] as const;

export default function CourseSetupLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const params = useParams<{ courseId: string }>();
    const courseId = params?.courseId;

    // Sécurité : évite /admin/cours/undefined/...
    const base = courseId ? `/admin/cours/${courseId}` : '/admin/cours';

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
                <Link
                    href={base}
                    className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-sm font-semibold text-main/80 hover:bg-page transition cursor-pointer"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Retour à l’aperçu
                </Link>

                <Link
                    href="/admin/cours"
                    className="rounded-full border border-perl/60 bg-page/60 px-3 py-1 text-[11px] font-semibold text-main/70 hover:bg-page transition cursor-pointer"
                >
                    Liste des cours
                </Link>
            </div>

            <section className="rounded-3xl border border-perl/60 bg-white/95 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-perl/50 bg-page/50">
                    <p className="text-xs uppercase tracking-[0.18em] text-main/55">Setup du cours</p>
                    <p className="mt-1 text-xs text-main/60">Cheminement guidé (progression visible, jamais “perdue”).</p>
                </div>

                <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap gap-2">
                        {steps.map((s) => {
                            const href = courseId ? `${base}${s.hrefSuffix}` : '/admin/cours';
                            const active = pathname === href;

                            return (
                                <Link
                                    key={s.key}
                                    href={href}
                                    aria-disabled={!courseId}
                                    className={cx(
                                        'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition cursor-pointer',
                                        !courseId && 'opacity-60 pointer-events-none',
                                        active ? 'border-main bg-main text-white' : 'border-perl/70 bg-white text-main/75 hover:bg-page'
                                    )}
                                >
                                    {active ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-main/30" />}
                                    {s.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {children}
        </div>
    );
}
