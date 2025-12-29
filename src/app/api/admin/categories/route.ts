import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { Category } from '@/lib/models/Category';

const slugRegex = /^[a-z0-9-]+$/;
const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export async function GET() {
    try {
        await connectToDatabase();
        const categories = await Category.find().sort({ createdAt: -1 }).limit(50).lean();
        return NextResponse.json({ data: categories });
    } catch (error) {
        console.error('GET /api/admin/categories', error);
        return NextResponse.json({ error: 'Impossible de récupérer les catégories.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const name = String(body.name ?? '').trim();
        const slug = String(body.slug ?? '')
            .trim()
            .toLowerCase();
        const description = String(body.description ?? '').trim();
        const color = String(body.color ?? '').trim();

        if (!name || !slug) {
            return NextResponse.json({ error: 'Nom et slug sont requis.' }, { status: 400 });
        }

        if (!slugRegex.test(slug)) {
            return NextResponse.json({ error: 'Le slug doit contenir uniquement des minuscules, chiffres ou tirets.' }, { status: 400 });
        }

        if (color && !hexRegex.test(color)) {
            return NextResponse.json({ error: 'La couleur doit être un code hexadécimal.' }, { status: 400 });
        }

        await connectToDatabase();

        const existing = await Category.findOne({ slug });
        if (existing) {
            return NextResponse.json({ error: 'Une catégorie avec ce slug existe déjà.' }, { status: 409 });
        }

        const category = await Category.create({
            name,
            slug,
            description,
            color,
        });

        return NextResponse.json({ data: category }, { status: 201 });
    } catch (error) {
        console.error('POST /api/admin/categories', error);
        return NextResponse.json({ error: 'Impossible de créer cette catégorie.' }, { status: 500 });
    }
}
