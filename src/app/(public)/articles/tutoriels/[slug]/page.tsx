// src/app/(public)/articles/tutoriels/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { TUTORIALS, getTutorialBySlug } from '@/lib/content/tutorials';
import { TutorialLayout } from '@/components/articles/tutorials/TutorialLayout';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return TUTORIALS.map((tuto) => ({ slug: tuto.slug }));
}

export default async function TutorialArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const tutorial = getTutorialBySlug(slug);

    if (!tutorial) return notFound();

    return (
        <section className="relative overflow-hidden bg-ivory pt-4 pb-24 md:pt-24 md:pb-28">
            <div className="container-page space-y-10">
                <TutorialLayout tutorial={tutorial} />
            </div>
        </section>
    );
}
