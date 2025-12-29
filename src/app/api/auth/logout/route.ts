// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateCsrf } from '@/lib/security/csrf';

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const isValidCsrf = validateCsrf(cookieStore, request);

    if (!isValidCsrf) {
        return NextResponse.json({ error: 'Jeton CSRF manquant ou invalide.' }, { status: 403 });
    }

    const response = NextResponse.json({ message: 'Déconnexion réussie.' });

    response.cookies.set('token', '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    });

    response.cookies.set('csrf_token', '', {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    });

    return response;
}
