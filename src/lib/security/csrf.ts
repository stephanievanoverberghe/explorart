// src/lib/security/csrf.ts
import crypto from 'crypto';
import type { NextResponse } from 'next/server';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const CSRF_COOKIE_NAME = 'csrf_token';
export const CSRF_HEADER_NAME = 'x-csrf-token';

function generateCsrfToken() {
    return crypto.randomBytes(32).toString('hex');
}

export function setCsrfCookie(response: NextResponse, token: string = generateCsrfToken()) {
    response.cookies.set(CSRF_COOKIE_NAME, token, {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });

    return token;
}

export function ensureCsrfCookie(cookieStore: ReadonlyRequestCookies, response: NextResponse) {
    const existing = cookieStore.get(CSRF_COOKIE_NAME)?.value;

    if (!existing) {
        setCsrfCookie(response);
    }
}

function tokensMatch(a: string, b: string) {
    if (a.length !== b.length) {
        return false;
    }

    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function validateCsrf(cookieStore: ReadonlyRequestCookies, request: Request) {
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
    const headerToken = request.headers.get(CSRF_HEADER_NAME);

    if (!cookieToken || !headerToken) {
        return false;
    }

    return tokensMatch(cookieToken, headerToken);
}
