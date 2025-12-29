import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/lib/models/User';
import { createAuthSuccessResponse } from '../utils';
import { hasJwtSecret, MISSING_SECRET_MESSAGE } from '@/lib/auth/secret';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
    try {
        const rateLimitResult = rateLimit(req, {
            limit: 5,
            windowMs: 60_000,
            prefix: 'auth:login',
        });

        if (!rateLimitResult.success) {
            return NextResponse.json({ error: 'Trop de tentatives. Merci de réessayer plus tard.' }, { status: 429, headers: rateLimitResult.headers });
        }

        if (!hasJwtSecret()) {
            console.error(MISSING_SECRET_MESSAGE);
            return NextResponse.json({ error: "Le serveur n'est pas configuré pour générer des connexions. Merci de réessayer plus tard." }, { status: 500 });
        }

        const { email, password } = await req.json();

        if (!email?.trim() || !password?.trim()) {
            return NextResponse.json({ error: 'Merci de fournir un e-mail et un mot de passe.' }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
        }

        return await createAuthSuccessResponse(user, 'Connexion réussie.');
    } catch (error) {
        console.error('POST /api/auth/login - ERREUR interne', error);
        return NextResponse.json({ error: 'Impossible de te connecter pour le moment. Merci de réessayer dans quelques instants.' }, { status: 500 });
    }
}
