// src/app/api/auth/login/route.ts
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/lib/models/User';
import { createAuthSuccessResponse } from '../utils';

export async function POST(req: Request) {
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
}
