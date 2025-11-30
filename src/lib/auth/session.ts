// src/lib/auth/session.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getJwtSecret, hasJwtSecret, MISSING_SECRET_MESSAGE } from './secret';

export interface AuthUser {
    userId: string;
    email: string;
    role: 'user' | 'admin';
}

// ⬇⬇⬇ ICI : async + await cookies()
export async function getAuthUser(): Promise<AuthUser | null> {
    if (!hasJwtSecret()) {
        console.error(MISSING_SECRET_MESSAGE);
        return null;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, getJwtSecret()) as Partial<AuthUser>;
        return {
            userId: decoded.userId as string,
            email: decoded.email as string,
            role: (decoded.role as AuthUser['role']) ?? 'user',
        };
    } catch {
        // token expiré / invalide
        return null;
    }
}
