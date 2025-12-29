// src/app/api/users/me/favorites/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth/session';
import { ensureCsrfCookie } from '@/lib/security/csrf';

export async function GET() {
    const cookieStore = await cookies();
    const authUser = await getAuthUser();

    if (!authUser) {
        const response = NextResponse.json({ downloads: [] }, { status: 401 });
        ensureCsrfCookie(cookieStore, response);
        return response;
    }

    await connectToDatabase();

    const user = await User.findById(authUser.userId).select('downloads');

    if (!user) {
        const response = NextResponse.json({ downloads: [] }, { status: 404 });
        ensureCsrfCookie(cookieStore, response);
        return response;
    }

    const response = NextResponse.json({ downloads: user.downloads ?? [] });
    ensureCsrfCookie(cookieStore, response);
    return response;
}
