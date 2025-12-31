// src/app/(admin)/admin/cours/new/page.tsx
import { redirect } from 'next/navigation';
import { createCourseDraft } from '@/lib/actions/courseAdmin';

export default async function AdminCoursNewRedirectPage() {
    const { courseId } = await createCourseDraft();
    redirect(`/admin/cours/${courseId}/setup/identity`);
}
