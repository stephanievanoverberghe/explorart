// src/app/api/users/me/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth/session';

export async function GET() {
    const authUser = await getAuthUser();

    if (!authUser) {
        return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findById(authUser.userId).select('-password');

    if (!user) {
        return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
    }

    return NextResponse.json({ user });
}
