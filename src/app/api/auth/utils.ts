// src/app/api/auth/utils.ts
import { NextResponse } from 'next/server';
import { signAuthToken } from '@/lib/auth/jwt';
import type { UserDocument } from '@/lib/models/User';

export function createAuthSuccessResponse(user: UserDocument, message: string) {
    const token = signAuthToken({ userId: user._id.toString(), email: user.email });

    const response = NextResponse.json({
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
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

    return response;
}
