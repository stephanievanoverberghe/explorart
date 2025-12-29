// src/app/api/users/me/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth/session';
import { ensureCsrfCookie } from '@/lib/security/csrf';

export async function GET() {
    const cookieStore = cookies();
    const authUser = await getAuthUser();

    // Pas de session → on renvoie juste user: null
    if (!authUser) {
        ensureCsrfCookie(cookieStore, response);
        return response;
        return NextResponse.json({ user: null });
    }

    await connectToDatabase();

    const user = await User.findById(authUser.userId).select('-password');

    if (!user) {
        // cas rare : token ok mais user supprimé
        const response = NextResponse.json({ user: null });
        ensureCsrfCookie(cookieStore, response);
        return response;
    }

    const response = NextResponse.json({ user });
    ensureCsrfCookie(cookieStore, response);
    return response;
}
