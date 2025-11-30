// src/lib/auth/secret.ts
const JWT_SECRET = process.env.JWT_SECRET ?? process.env.NEXTAUTH_SECRET;

const MISSING_SECRET_MESSAGE = 'JWT secret is missing. Define JWT_SECRET or NEXTAUTH_SECRET in your environment variables.';

export function hasJwtSecret(): boolean {
    return Boolean(JWT_SECRET);
}

export function getJwtSecret(): string {
    if (!JWT_SECRET) {
        throw new Error(MISSING_SECRET_MESSAGE);
    }
    return JWT_SECRET;
}

export { MISSING_SECRET_MESSAGE };
