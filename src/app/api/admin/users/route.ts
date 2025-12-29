import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { User } from '@/lib/models/User';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
    try {
        await connectToDatabase();
        const users = await User.find().select('name email role createdAt').sort({ createdAt: -1 }).limit(50).lean();
        return NextResponse.json({ data: users });
    } catch (error) {
        console.error('GET /api/admin/users', error);
        return NextResponse.json({ error: 'Impossible de récupérer les utilisateurs.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const name = String(body.name ?? '').trim();
        const email = String(body.email ?? '')
            .trim()
            .toLowerCase();
        const password = String(body.password ?? '').trim();
        const role = String(body.role ?? 'user').trim();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Nom, e-mail et mot de passe sont requis.' }, { status: 400 });
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 });
        }

        if (!['user', 'admin'].includes(role)) {
            return NextResponse.json({ error: 'Le rôle est invalide.' }, { status: 400 });
        }

        await connectToDatabase();

        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json({ error: 'Un compte existe déjà avec cet e-mail.' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return NextResponse.json(
            {
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('POST /api/admin/users', error);
        return NextResponse.json({ error: 'Impossible de créer cet utilisateur.' }, { status: 500 });
    }
}
