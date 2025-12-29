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

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const id = String(body.id ?? '').trim();
        const name = String(body.name ?? '').trim();
        const description = String(body.description ?? '').trim();
        const colors = Array.isArray(body.colors) ? body.colors.map((color: string) => String(color).trim()) : [];

        if (!id) {
            return NextResponse.json({ error: 'Identifiant requis.' }, { status: 400 });
        }

        if (!name) {
            return NextResponse.json({ error: 'Le nom est requis.' }, { status: 400 });
        }

        const invalidColor = colors.find((color: string) => color && !hexRegex.test(color));
        if (invalidColor) {
            return NextResponse.json({ error: `Couleur invalide : ${invalidColor}` }, { status: 400 });
        }

        await connectToDatabase();

        const palette = await Palette.findByIdAndUpdate(
            id,
            {
                name,
                description,
                colors,
            },
            { new: true }
        );

        if (!palette) {
            return NextResponse.json({ error: 'Palette introuvable.' }, { status: 404 });
        }

        return NextResponse.json({ data: palette });
    } catch (error) {
        console.error('PATCH /api/admin/palettes', error);
        return NextResponse.json({ error: 'Impossible de mettre à jour cette palette.' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const id = String(body.id ?? '').trim();

        if (!id) {
            return NextResponse.json({ error: 'Identifiant requis.' }, { status: 400 });
        }

        await connectToDatabase();
        const palette = await Palette.findByIdAndDelete(id);

        if (!palette) {
            return NextResponse.json({ error: 'Palette introuvable.' }, { status: 404 });
        }

        return NextResponse.json({ data: { id } });
    } catch (error) {
        console.error('DELETE /api/admin/palettes', error);
        return NextResponse.json({ error: 'Impossible de supprimer cette palette.' }, { status: 500 });
    }
}
