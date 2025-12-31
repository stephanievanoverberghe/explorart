import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import { connectToDatabase } from '@/lib/db/connect';
import { Course } from '@/lib/models/Course';

type Context = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, context: Context) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json({ error: 'Identifiant requis.' }, { status: 400 });
        }

        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });
        }

        await connectToDatabase();

        const deleted = await Course.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ error: 'Cours introuvable.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Cours supprimé.' });
    } catch (error) {
        console.error('DELETE /api/admin/courses/:id', error);
        return NextResponse.json({ error: 'Impossible de supprimer ce cours.' }, { status: 500 });
    }
}
