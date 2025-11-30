// src/lib/auth/jwt.ts
import jwt from 'jsonwebtoken';
import { getJwtSecret } from './secret';

interface AuthTokenPayload {
    userId: string;
    email: string;
    role: 'user' | 'admin';
}

export function signAuthToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}
