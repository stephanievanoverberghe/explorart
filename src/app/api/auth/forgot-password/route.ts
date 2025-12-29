// src/app/api/auth/forgot-password/route.ts
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { sendResetEmail } from '@/lib/email/sendResetEmail';
import { PasswordResetToken } from '@/lib/models/PasswordResetToken';
import { User } from '@/lib/models/User';
import { rateLimit } from '@/lib/rate-limit';
import { cookies } from 'next/headers';
import { validateCsrf } from '@/lib/security/csrf';

const RESET_TOKEN_EXPIRATION_MINUTES = 60;

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const isValidCsrf = validateCsrf(cookieStore, req);

        if (!isValidCsrf) {
            return NextResponse.json({ error: 'Jeton CSRF manquant ou invalide.' }, { status: 403 });
        }

        const rateLimitResult = rateLimit(req, {
            limit: 3,
            windowMs: 60_000,
            prefix: 'auth:forgot-password',
        });

        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Trop de tentatives. Merci de réessayer plus tard.' }, { status: 429, headers: rateLimitResult.headers });
        }

        const { email } = await req.json();

        if (!email?.trim()) {
            return NextResponse.json({ error: 'Merci de renseigner ton e-mail.' }, { status: 400 });
        }

        await connectToDatabase();

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return NextResponse.json({ message: 'Si ce compte existe, un e-mail a été envoyé.' });
        }

        await PasswordResetToken.deleteMany({ userId: user._id });

        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

        const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRATION_MINUTES * 60 * 1000);

        await PasswordResetToken.create({
            userId: user._id,
            tokenHash,
            expiresAt,
        });

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
        const resetUrl = `${siteUrl}/reinitialiser-mot-de-passe/${rawToken}`;

        try {
            await sendResetEmail({ to: normalizedEmail, resetUrl });
        } catch (error) {
            console.error('Failed to send reset email', error);
        }

        return NextResponse.json({
            message: 'Si ce compte existe, un e-mail de réinitialisation a été envoyé.',
        });
    } catch (error) {
        console.error('POST /api/auth/forgot-password', error);
        return NextResponse.json({ error: 'Impossible d’envoyer le lien pour le moment. Merci de réessayer plus tard.' }, { status: 500 });
    }
}
