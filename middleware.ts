// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { CSRF_COOKIE_NAME, setCsrfCookie } from '@/lib/security/csrf';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const existingCsrf = request.cookies.get(CSRF_COOKIE_NAME)?.value;

    if (!existingCsrf) {
        setCsrfCookie(response);
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)'],
};
