// src/app/api/auth/login/route.ts
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/lib/models/User';
import { createAuthSuccessResponse } from '../utils';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
    try {
        const rateLimitResult = rateLimit(req, {
            limit: 5,
            windowMs: 60_000,
            prefix: 'auth:register',
        });

        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Trop de tentatives. Merci de réessayer plus tard.' }, { status: 429, headers: rateLimitResult.headers });
        }

        const { name, email, password } = await req.json();

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return NextResponse.json({ error: 'Merci de remplir tous les champs.' }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 });
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({ error: 'Un compte existe déjà avec cette adresse e-mail.' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminEmailsEnv = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '';
        const adminEmails = adminEmailsEnv
            .split(',')
            .map((item) => item.trim().toLowerCase())
            .filter(Boolean);
        const role: 'user' | 'admin' = adminEmails.includes(email.toLowerCase().trim()) ? 'admin' : 'user';

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role,
        });

        return createAuthSuccessResponse(user, 'Compte créé avec succès.');
    } catch (error) {
        console.error('POST /api/auth/register', error);
        return NextResponse.json({ error: 'Impossible de créer le compte pour le moment. Merci de réessayer dans quelques instants.' }, { status: 500 });
    }
}
