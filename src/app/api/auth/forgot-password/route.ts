// src/app/api/auth/forgot-password/route.ts
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { PasswordResetToken } from '@/lib/models/PasswordResetToken';
import { User } from '@/lib/models/User';

const RESET_TOKEN_EXPIRATION_MINUTES = 60;

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email?.trim()) {
            return NextResponse.json({ error: 'Merci de renseigner ton e-mail.' }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email: email.toLowerCase().trim() });

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

        return NextResponse.json({
            message: 'Si ce compte existe, un e-mail de réinitialisation a été envoyé.',
            resetUrl,
        });
    } catch (error) {
        console.error('POST /api/auth/forgot-password', error);
        return NextResponse.json({ error: 'Impossible d’envoyer le lien pour le moment. Merci de réessayer plus tard.' }, { status: 500 });
    }
}
