import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

function sanitizeFileName(name: string) {
    return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || typeof file === 'string') {
            return NextResponse.json({ error: 'Fichier manquant.' }, { status: 400 });
        }

        const blob = file as Blob & { name?: string };
        const originalName = blob.name ?? 'upload';
        const ext = path.extname(originalName) || '.bin';
        const baseName = sanitizeFileName(path.basename(originalName, ext));
        const fileName = `${Date.now()}-${baseName}${ext}`;

        await mkdir(uploadDir, { recursive: true });

        const arrayBuffer = await blob.arrayBuffer();
        await writeFile(path.join(uploadDir, fileName), Buffer.from(arrayBuffer));

        return NextResponse.json({ url: `/uploads/${fileName}` }, { status: 201 });
    } catch (error) {
        console.error('POST /api/admin/media', error);
        return NextResponse.json({ error: 'Impossible de téléverser ce fichier.' }, { status: 500 });
    }
}
