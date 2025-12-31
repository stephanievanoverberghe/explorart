import { redirect } from 'next/navigation';

interface EditorPublishPageProps {
    params: { courseId: string };
}

export default function EditorPublishPage({ params }: EditorPublishPageProps) {
    redirect(`/admin/cours/${params.courseId}/setup/publish`);
}
