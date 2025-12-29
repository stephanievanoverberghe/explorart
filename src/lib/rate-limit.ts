type RateLimitOptions = {
    limit: number;
    windowMs: number;
    prefix?: string;
};

type RateLimitState = {
    count: number;
    reset: number;
};

type RateLimitResult = {
    success: boolean;
    headers: Headers;
};

const rateLimitStore = new Map<string, RateLimitState>();

function getClientIdentifier(req: Request) {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0]?.trim() || 'unknown';
    }

    return req.headers.get('x-real-ip') ?? 'unknown';
}

export function rateLimit(req: Request, options: RateLimitOptions): RateLimitResult {
    const { limit, windowMs, prefix = 'default' } = options;
    const clientId = getClientIdentifier(req);
    const key = `${prefix}:${clientId}`;
    const now = Date.now();

    let state = rateLimitStore.get(key);

    if (!state || now > state.reset) {
        state = { count: 0, reset: now + windowMs };
        rateLimitStore.set(key, state);
    }

    const remaining = Math.max(limit - state.count, 0);

    const headers = new Headers();
    headers.set('X-RateLimit-Limit', limit.toString());
    headers.set('X-RateLimit-Remaining', remaining.toString());
    headers.set('X-RateLimit-Reset', state.reset.toString());

    if (state.count >= limit) {
        const retryAfterSeconds = Math.ceil((state.reset - now) / 1000);
        headers.set('Retry-After', retryAfterSeconds.toString());
        return { success: false, headers };
    }

    state.count += 1;
    rateLimitStore.set(key, state);

    headers.set('X-RateLimit-Remaining', Math.max(limit - state.count, 0).toString());

    return { success: true, headers };
}
