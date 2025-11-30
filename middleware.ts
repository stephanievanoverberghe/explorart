import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface AuthTokenPayload {
    userId: string;
    email: string;
    role?: 'user' | 'admin';
}

const JWT_SECRET = process.env.JWT_SECRET as string;

const protectedRoutes = ['/admin', '/tableau-de-bord', '/tableau-de-bord/formations', '/tableau-de-bord/cours', '/deconnexion'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const requiresAuth = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    if (!requiresAuth) {
        return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value;

    if (!token || !JWT_SECRET) {
        return NextResponse.redirect(new URL('/connexion', request.url));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;

        if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
            return NextResponse.redirect(new URL('/tableau-de-bord', request.url));
        }

        return NextResponse.next();
    } catch {
        const response = NextResponse.redirect(new URL('/connexion', request.url));
        response.cookies.set('token', '', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 0,
        });
        return response;
    }
}

export const config = {
    matcher: ['/admin/:path*', '/tableau-de-bord/:path*', '/tableau-de-bord/formations/:path*', '/tableau-de-bord/cours/:path*', '/deconnexion'],
};
