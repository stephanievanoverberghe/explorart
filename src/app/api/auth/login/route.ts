import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/lib/models/User';
import { createAuthSuccessResponse } from '../utils';
import { hasJwtSecret, MISSING_SECRET_MESSAGE } from '@/lib/auth/secret';

export async function POST(req: Request) {
    try {
        // 🔍 DEBUG ENV
        console.log('LOGIN: hasJwtSecret =', hasJwtSecret());
        console.log('LOGIN: JWT_SECRET length =', process.env.JWT_SECRET?.length || 0);
        console.log('LOGIN: MONGODB_URI exists =', Boolean(process.env.MONGODB_URI));

        if (!hasJwtSecret()) {
            console.error(MISSING_SECRET_MESSAGE);
            return NextResponse.json({ error: "Le serveur n'est pas configuré pour générer des connexions. Merci de réessayer plus tard." }, { status: 500 });
        }

        const { email, password } = await req.json();
        console.log('LOGIN: email reçu =', email);

        if (!email?.trim() || !password?.trim()) {
            return NextResponse.json({ error: 'Merci de fournir un e-mail et un mot de passe.' }, { status: 400 });
        }

        // 🔍 DEBUG DB
        console.log('LOGIN: connexion DB...');
        await connectToDatabase();
        console.log('LOGIN: DB OK');

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        console.log('LOGIN: user trouvé =', Boolean(user));

        if (!user) {
            return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        console.log('LOGIN: password valide =', isValid);

        if (!isValid) {
            return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
        }

        return createAuthSuccessResponse(user, 'Connexion réussie.');
    } catch (error) {
        console.error('POST /api/auth/login - ERREUR', error);
        return NextResponse.json({ error: 'Impossible de te connecter pour le moment. Merci de réessayer dans quelques instants.' }, { status: 500 });
    }
}
