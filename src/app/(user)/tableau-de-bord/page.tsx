// src/app/(user)/tableau-de-bord/page.tsx

import { AtelierShell } from '@/components/user/atelier/AtelierShell';

export default function TableauDeBordPage() {
    // Server component qui délègue tout au client component
    return <AtelierShell />;
}
