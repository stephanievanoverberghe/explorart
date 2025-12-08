// src/app/(user)/tableau-de-bord/cours/page.tsx
import { redirect } from 'next/navigation';

export default function TableauDeBordCoursPage() {
    // On centralise tout dans l'Atelier, onglet "parcours"
    redirect('/tableau-de-bord?tab=journeys');
}
