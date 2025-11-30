// src/lib/auth/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

interface AuthTokenPayload {
    userId: string;
    email: string;
    role: 'user' | 'admin';
}

export function signAuthToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
