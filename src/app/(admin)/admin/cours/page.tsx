import { headers } from 'next/headers';
import { CoursesPageClient, type CourseListResponse } from './CoursesPageClient';

async function getBaseUrl() {
    const headerList = await headers();
    const host = headerList.get('host');
    if (host) {
        const protocol = host.includes('localhost') ? 'http' : 'https';
        return `${protocol}://${host}`;
    }
    return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

async function getCoursesData(): Promise<CourseListResponse> {
    const baseUrl = await getBaseUrl();
    const response = await fetch(`${baseUrl}/api/admin/courses?page=1&pageSize=8`, { cache: 'no-store' });

    if (!response.ok) {
        return {
            data: [],
            meta: { total: 0, page: 1, pageSize: 8, totalPages: 1 },
            metrics: [],
        };
    }
    return response.json();
}

export default async function AdminCoursPage() {
    const initialData = await getCoursesData();

    return <CoursesPageClient initialData={initialData} />;
}
