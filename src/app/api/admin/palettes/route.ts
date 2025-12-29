import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { Palette } from '@/lib/models/Palette';

const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export async function GET() {
    try {
        await connectToDatabase();
        const palettes = await Palette.find().sort({ createdAt: -1 }).limit(50).lean();
        return NextResponse.json({ data: palettes });
    } catch (error) {
        console.error('GET /api/admin/palettes', error);
        return NextResponse.json({ error: 'Impossible de récupérer les palettes.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const name = String(body.name ?? '').trim();
        const description = String(body.description ?? '').trim();
        const colors = Array.isArray(body.colors) ? body.colors.map((color: string) => String(color).trim()) : [];

        if (!name) {
            return NextResponse.json({ error: 'Le nom est requis.' }, { status: 400 });
        }

        const invalidColor = colors.find((color: string) => color && !hexRegex.test(color));
        if (invalidColor) {
            return NextResponse.json({ error: `Couleur invalide : ${invalidColor}` }, { status: 400 });
        }

        await connectToDatabase();

        const palette = await Palette.create({
            name,
            description,
            colors,
        });

        return NextResponse.json({ data: palette }, { status: 201 });
    } catch (error) {
        console.error('POST /api/admin/palettes', error);
        return NextResponse.json({ error: 'Impossible de créer cette palette.' }, { status: 500 });
    }
}
