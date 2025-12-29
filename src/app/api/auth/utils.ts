// src/app/api/auth/utils.ts
import { NextResponse } from 'next/server';
import { signAuthToken } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';
import { ensureCsrfCookie } from '@/lib/security/csrf';
import type { UserDocument } from '@/lib/models/User';

export async function createAuthSuccessResponse(user: UserDocument, message: string) {
    const role = user.role ?? 'user';

    const token = signAuthToken({
        userId: user._id.toString(),
        email: user.email,
        role,
    });

    const response = NextResponse.json({
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role,
            avatarUrl: user.avatarUrl,
        },
        message,
    });

    response.cookies.set('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const cookieStore = await cookies();
    ensureCsrfCookie(cookieStore, response);

    return response;
}
