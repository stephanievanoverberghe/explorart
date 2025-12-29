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

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const id = String(body.id ?? '').trim();
        const title = String(body.title ?? '').trim();
        const description = String(body.description ?? '').trim();
        const fileUrl = String(body.fileUrl ?? '').trim();
        const type = String(body.type ?? 'download').trim();

        if (!id) {
            return NextResponse.json({ error: 'Identifiant requis.' }, { status: 400 });
        }

        if (!title || !fileUrl) {
            return NextResponse.json({ error: 'Titre et URL de fichier sont requis.' }, { status: 400 });
        }

        await connectToDatabase();

        const resource = await Resource.findByIdAndUpdate(
            id,
            {
                title,
                description,
                fileUrl,
                type,
            },
            { new: true }
        );

        if (!resource) {
            return NextResponse.json({ error: 'Ressource introuvable.' }, { status: 404 });
        }

        return NextResponse.json({ data: resource });
    } catch (error) {
        console.error('PATCH /api/admin/resources', error);
        return NextResponse.json({ error: 'Impossible de mettre à jour cette ressource.' }, { status: 500 });
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
        const resource = await Resource.findByIdAndDelete(id);

        if (!resource) {
            return NextResponse.json({ error: 'Ressource introuvable.' }, { status: 404 });
        }

        return NextResponse.json({ data: { id } });
    } catch (error) {
        console.error('DELETE /api/admin/resources', error);
        return NextResponse.json({ error: 'Impossible de supprimer cette ressource.' }, { status: 500 });
    }
}
