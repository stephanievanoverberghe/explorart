// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _unused = request;
    return NextResponse.next();
}
