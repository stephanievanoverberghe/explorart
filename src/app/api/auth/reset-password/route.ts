// src/app/api/auth/reset-password/route.ts
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { PasswordResetToken } from '@/lib/models/PasswordResetToken';
import { User } from '@/lib/models/User';

export async function POST(req: Request) {
    const { token, password } = await req.json();

    if (!token?.trim() || !password?.trim()) {
        return NextResponse.json({ error: 'Token et mot de passe sont requis.' }, { status: 400 });
    }

    if (password.length < 8) {
        return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 });
    }

    await connectToDatabase();

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const resetToken = await PasswordResetToken.findOne({ tokenHash, expiresAt: { $gt: new Date() } });

    if (!resetToken) {
        return NextResponse.json({ error: 'Le lien de réinitialisation est invalide ou expiré.' }, { status: 400 });
    }

    const user = await User.findById(resetToken.userId);
    if (!user) {
        await PasswordResetToken.deleteMany({ userId: resetToken.userId });
        return NextResponse.json({ error: 'Le compte associé est introuvable.' }, { status: 404 });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    await PasswordResetToken.deleteMany({ userId: user._id });

    return NextResponse.json({ message: 'Mot de passe mis à jour. Tu peux te reconnecter.' });
}
