// src/app/(admin)/admin/cours/new/page.tsx
import { redirect } from 'next/navigation';

export default async function AdminCoursNewRedirectPage() {
    // TODO: remplacer par ta création réelle (DB)
    const fakeId = crypto.randomUUID();

    redirect(`/admin/cours/${fakeId}/setup/identity`);
}
