'use client';

import Link from 'next/link';
import { Loader2, Save, ArrowRight, ChevronLeft, Home } from 'lucide-react';
import { cx } from '@/components/admin/courses/CourseUI';

interface CourseWizardFooterProps {
    backHref?: string;
    hubHref: string;
    onSave?: () => Promise<void> | void;
    onContinue?: () => Promise<void> | void;
    continueHref?: string;
    saveLabel?: string;
    continueLabel?: string;
    disableSave?: boolean;
    disableContinue?: boolean;
    isSaving?: boolean;
}

export function CourseWizardFooter({
    backHref,
    hubHref,
    onSave,
    onContinue,
    continueHref,
    saveLabel = 'Sauvegarder',
    continueLabel = 'Continuer',
    disableSave,
    disableContinue,
    isSaving,
}: CourseWizardFooterProps) {
    const canContinue = !disableContinue && !isSaving;

    return (
        <div className="flex flex-col gap-3 rounded-3xl border border-perl/60 bg-page/40 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
                {backHref ? (
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page transition"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Retour
                    </Link>
                ) : null}

                <Link
                    href={hubHref}
                    className="inline-flex items-center gap-2 rounded-full border border-perl/70 bg-white px-4 py-2 text-xs font-semibold text-main/80 hover:bg-page transition"
                >
                    <Home className="h-4 w-4" />
                    HUB cours
                </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {onSave ? (
                    <button
                        type="button"
                        onClick={onSave}
                        disabled={disableSave || isSaving}
                        className={cx(
                            'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition',
                            disableSave || isSaving ? 'border-perl/60 bg-page text-main/40 cursor-not-allowed' : 'border-perl/70 bg-white text-main/80 hover:bg-page'
                        )}
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {saveLabel}
                    </button>
                ) : null}

                {continueHref ? (
                    <Link
                        href={continueHref}
                        className={cx(
                            'inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition',
                            canContinue ? 'bg-main text-white hover:bg-main/90' : 'bg-main/20 text-main/40 cursor-not-allowed pointer-events-none'
                        )}
                    >
                        {continueLabel}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                ) : onContinue ? (
                    <button
                        type="button"
                        onClick={onContinue}
                        disabled={!canContinue || isSaving}
                        className={cx(
                            'inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition',
                            !canContinue || isSaving ? 'bg-main/20 text-main/40 cursor-not-allowed' : 'bg-main text-white hover:bg-main/90'
                        )}
                    >
                        {continueLabel}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                ) : null}
            </div>
        </div>
    );
}
