// src/lib/security/csrf.ts
import type { NextResponse } from 'next/server';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const CSRF_COOKIE_NAME = 'csrf_token';
export const CSRF_HEADER_NAME = 'x-csrf-token';

function bytesToHex(bytes: Uint8Array) {
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function generateCsrfToken() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes); // ✅ Edge/Web Crypto
    return bytesToHex(bytes);
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

// (optionnel si tu l’utilises ailleurs)
export function ensureCsrfCookie(cookieStore: ReadonlyRequestCookies, response: NextResponse) {
    const existing = cookieStore.get(CSRF_COOKIE_NAME)?.value;
    if (!existing) setCsrfCookie(response);
}

// compare sans Buffer/crypto node
function timingSafeEqual(a: string, b: string) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

export function validateCsrf(cookieStore: ReadonlyRequestCookies, request: Request) {
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
    const headerToken = request.headers.get(CSRF_HEADER_NAME);

    if (!cookieToken || !headerToken) return false;
    return timingSafeEqual(cookieToken, headerToken);
}
