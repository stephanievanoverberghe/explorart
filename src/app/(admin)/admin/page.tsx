import Link from 'next/link';

const adminSections = [
    {
        title: 'Articles',
        description: 'Créer, modifier et publier les contenus éditoriaux.',
        href: '/admin/articles',
        cta: 'Gérer les articles',
    },
    {
        title: 'Catégories',
        description: 'Organiser les thématiques et les collections.',
        href: '/admin/categories',
        cta: 'Gérer les catégories',
    },
    {
        title: 'Palettes',
        description: 'Structurer les palettes de couleurs utilisées.',
        href: '/admin/palettes',
        cta: 'Gérer les palettes',
    },
    {
        title: 'Ressources',
        description: 'Mettre à jour les ressources et références.',
        href: '/admin/ressources',
        cta: 'Gérer les ressources',
    },
    {
        title: 'Utilisateurs',
        description: 'Suivre les comptes et les permissions.',
        href: '/admin/utilisateurs',
        cta: 'Gérer les utilisateurs',
    },
    {
        title: 'Réglages',
        description: 'Ajuster les paramètres globaux de la plateforme.',
        href: '/admin/reglages',
        cta: 'Ouvrir les réglages',
    },
];

export default function AdminPage() {
    return (
        <div className="space-y-8">
            <header className="space-y-2">
                <h2 className="font-serif-title text-xl text-main">Tableau de bord</h2>
                <p className="text-sm text-main/60">Accédez rapidement à toutes les sections de l’administration.</p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
                {adminSections.map((section) => (
                    <div key={section.href} className="rounded-3xl border border-perl/60 bg-white px-5 py-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-main">{section.title}</h3>
                        <p className="mt-2 text-sm text-main/60">{section.description}</p>
                        <Link
                            href={section.href}
                            className="mt-4 inline-flex items-center gap-2 rounded-full border border-main px-4 py-2 text-sm font-medium text-main transition hover:bg-main hover:text-white"
                        >
                            {section.cta}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
