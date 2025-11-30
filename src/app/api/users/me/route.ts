// src/app/api/users/me/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth/session';

export async function GET() {
    const authUser = await getAuthUser();

    // Pas de session → on renvoie juste user: null
    if (!authUser) {
        return NextResponse.json({ user: null });
    }

    await connectToDatabase();

    const user = await User.findById(authUser.userId).select('-password');

    if (!user) {
        // cas rare : token ok mais user supprimé
        return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
}
