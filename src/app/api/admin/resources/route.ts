import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';
import { Resource } from '@/lib/models/Resource';

export async function GET() {
    try {
        await connectToDatabase();
        const resources = await Resource.find().sort({ createdAt: -1 }).limit(50).lean();
        return NextResponse.json({ data: resources });
    } catch (error) {
        console.error('GET /api/admin/resources', error);
        return NextResponse.json({ error: 'Impossible de récupérer les ressources.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const title = String(body.title ?? '').trim();
        const description = String(body.description ?? '').trim();
        const fileUrl = String(body.fileUrl ?? '').trim();
        const type = String(body.type ?? 'download').trim();

        if (!title || !fileUrl) {
            return NextResponse.json({ error: 'Titre et URL de fichier sont requis.' }, { status: 400 });
        }

        await connectToDatabase();

        const resource = await Resource.create({
            title,
            description,
            fileUrl,
            type,
        });

        return NextResponse.json({ data: resource }, { status: 201 });
    } catch (error) {
        console.error('POST /api/admin/resources', error);
        return NextResponse.json({ error: 'Impossible de créer cette ressource.' }, { status: 500 });
    }
}
