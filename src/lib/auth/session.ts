import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export interface AuthUser {
    userId: string;
    email: string;
    role: 'user' | 'admin';
}

// ⬇⬇⬇ ICI : async + await cookies()
export async function getAuthUser(): Promise<AuthUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as Partial<AuthUser>;
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
