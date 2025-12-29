import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { Article } from '@/lib/models/Article';

const allowedFormats = ['tutorial', 'artwork-analysis', 'artist-story', 'art-history', 'color-guide', 'art-psychology', 'inspiration'];

const slugRegex = /^[a-z0-9-]+$/;

export async function GET() {
    try {
        await connectToDatabase();
        const articles = await Article.find().sort({ createdAt: -1 }).limit(50).lean();
        return NextResponse.json({ data: articles });
    } catch (error) {
        console.error('GET /api/admin/articles', error);
        return NextResponse.json({ error: 'Impossible de récupérer les articles.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const title = String(body.title ?? '').trim();
        const slug = String(body.slug ?? '')
            .trim()
            .toLowerCase();
        const excerpt = String(body.excerpt ?? '').trim();
        const format = String(body.format ?? '').trim();
        const status = String(body.status ?? 'draft').trim();
        const coverImageUrl = String(body.coverImageUrl ?? '').trim();
        const categorySlug = String(body.categorySlug ?? '').trim();

        if (!title || !slug || !format) {
            return NextResponse.json({ error: 'Titre, slug et format sont requis.' }, { status: 400 });
        }

        if (!slugRegex.test(slug)) {
            return NextResponse.json({ error: 'Le slug doit contenir uniquement des minuscules, chiffres ou tirets.' }, { status: 400 });
        }

        if (!allowedFormats.includes(format)) {
            return NextResponse.json({ error: 'Le format sélectionné est invalide.' }, { status: 400 });
        }

        if (!['draft', 'published'].includes(status)) {
            return NextResponse.json({ error: 'Le statut est invalide.' }, { status: 400 });
        }

        await connectToDatabase();

        const existing = await Article.findOne({ slug });
        if (existing) {
            return NextResponse.json({ error: 'Un article avec ce slug existe déjà.' }, { status: 409 });
        }

        const article = await Article.create({
            title,
            slug,
            excerpt,
            format,
            status,
            coverImageUrl,
            categorySlug,
        });

        return NextResponse.json({ data: article }, { status: 201 });
    } catch (error) {
        console.error('POST /api/admin/articles', error);
        return NextResponse.json({ error: 'Impossible de créer cet article.' }, { status: 500 });
    }
}
