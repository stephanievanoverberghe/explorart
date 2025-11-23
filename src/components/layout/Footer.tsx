import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-perl/40 bg-ivory/60">
            <div className="container-page py-8 grid gap-6 md:grid-cols-[2fr,1fr,1fr] text-sm">
                <div>
                    <p className="font-serif-title text-lg mb-2">Explor&apos;Art</p>
                    <p className="text-main/70 max-w-md">Un espace lumineux pour apprendre, comprendre et ressentir l’art autrement.</p>
                </div>

                <div>
                    <p className="font-medium mb-2">Découvrir</p>
                    <ul className="space-y-1 text-main/75">
                        <li>
                            <Link href="/commencer-ici">Commencer ici</Link>
                        </li>
                        <li>
                            <Link href="/articles">Articles</Link>
                        </li>
                        <li>
                            <Link href="/categories">Thèmes</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-medium mb-2">Site</p>
                    <ul className="space-y-1 text-main/75">
                        <li>
                            <Link href="/a-propos">À propos</Link>
                        </li>
                        <li>
                            <Link href="/legal/mentions-legales">Mentions légales</Link>
                        </li>
                        <li>
                            <Link href="/legal/politique-de-confidentialite">Confidentialité</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-perl/40">
                <div className="container-page py-4 text-xs text-main/60 flex flex-col md:flex-row justify-between">
                    <span>© {new Date().getFullYear()} Explor&apos;Art</span>
                    <span>Créé avec douceur et pédagogie</span>
                </div>
            </div>
        </footer>
    );
}
