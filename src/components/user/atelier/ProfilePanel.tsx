// src/components/user/atelier/ProfilePanel.tsx
import Link from 'next/link';
import { LogOut, Settings, User, Bell, Palette } from 'lucide-react';
import type { CurrentUser } from '@/types/user';

type ProfilePanelProps = {
    user: CurrentUser | null;
    isLoading: boolean;
};

export function ProfilePanel({ user, isLoading }: ProfilePanelProps) {
    const formKey = user?.id ?? 'guest';
    const displayName = user?.name ?? '';
    const displayEmail = user?.email ?? '';

    return (
        <section className="space-y-6 md:space-y-7" aria-label="Profil et paramètres de ton atelier">
            {/* Header intro */}
            <header className="rounded-3xl border border-perl/50 bg-white/95 px-5 py-4 shadow-sm flex flex-col gap-2">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Profil & paramètres</p>
                <h2 className="font-serif-title text-xl md:text-2xl text-main">Réglages de ton atelier Explor&apos;Art</h2>
                <p className="text-sm text-main/70 max-w-2xl">
                    Personnalise ton espace : ton identité, ton rythme de mails, la façon dont tu aimes explorer… Plus tard, ces réglages seront sauvegardés côté compte.
                </p>
                {!isLoading && !user && (
                    <p className="text-sm text-main/70">
                        Connecte-toi pour retrouver tes informations personnelles.
                        <Link href="/connexion" className="ml-2 text-sage underline underline-offset-2">
                            Se connecter
                        </Link>
                    </p>
                )}
            </header>

            {/* Ligne 1 : Profil + Préférences d’exploration */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)]">
                {/* Profil de base */}
                <article className="rounded-3xl border border-perl/60 bg-white/95 p-5 md:p-6 shadow-sm space-y-4">
                    <header className="flex items-center gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory">
                            <User className="h-4 w-4 text-main/70" />
                        </span>
                        <div className="space-y-0.5">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Profil</p>
                            <h3 className="font-serif-title text-base md:text-lg text-main">Informations de base</h3>
                        </div>
                    </header>

                    <p className="text-sm text-main/70">
                        Ces infos servent à personnaliser ton atelier (nom affiché dans les tableaux de bord, langue, e-mail pour les nouvelles ressources).
                    </p>

                    <form key={formKey} className="space-y-3 pt-1">
                        {/* Nom affiché */}
                        <div className="space-y-1.5">
                            <label className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-main/60">Nom affiché</label>
                            <input
                                type="text"
                                placeholder="Ton prénom ou pseudo"
                                defaultValue={displayName}
                                className="w-full rounded-full border border-perl/60 bg-ivory/60 px-3.5 py-2.5 text-sm text-main outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/18"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-main/60">Adresse e-mail</label>
                            <input
                                type="email"
                                placeholder="toi@exemple.com"
                                defaultValue={displayEmail}
                                className="w-full rounded-full border border-perl/60 bg-ivory/40 px-3.5 py-2.5 text-sm text-main/80 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/18"
                            />
                            <p className="text-[0.75rem] text-main/55">Utilisée uniquement pour ton compte et les e-mails que tu auras choisis dans les préférences.</p>
                        </div>
                    </form>
                </article>

                {/* Préférences de rythme & mails */}
                <article className="rounded-3xl border border-perl/60 bg-white/95 p-5 md:p-6 shadow-sm space-y-4">
                    <header className="flex items-center gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory">
                            <Settings className="h-4 w-4 text-main/70" />
                        </span>
                        <div className="space-y-0.5">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Préférences</p>
                            <h3 className="font-serif-title text-base md:text-lg text-main">Notifications & rythme</h3>
                        </div>
                    </header>

                    <p className="text-sm text-main/70">Choisis le tempo qui te convient. Plus tard, ces paramètres pourront ajuster la fréquence de tes e-mails et suggestions.</p>

                    {/* Rythme d’exploration */}
                    <div className="space-y-1.5 pt-1">
                        <p className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-main/60">Rythme souhaité</p>
                        <div className="flex flex-wrap gap-2">
                            <button type="button" className="inline-flex items-center gap-1.5 rounded-full bg-sage/12 px-3.5 py-1.5 text-[0.8rem] text-sage border border-sage/40">
                                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                                <span>Doucement</span>
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-1.5 text-[0.8rem] text-main/70 border border-perl/50 hover:border-sage/60 hover:bg-sage/5 transition"
                            >
                                <span>Régulier</span>
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-1.5 text-[0.8rem] text-main/70 border border-perl/50 hover:border-sage/60 hover:bg-sage/5 transition"
                            >
                                <span>Intensif (plus tard)</span>
                            </button>
                        </div>
                    </div>

                    {/* Notifications mail (switch visuels) */}
                    <div className="space-y-2 pt-1.5">
                        <div className="flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-main/60">
                            <Bell className="h-3.5 w-3.5 text-main/65" />
                            <span>Notifications e-mail</span>
                        </div>

                        <div className="space-y-1.5 text-[0.85rem] text-main/70">
                            <ToggleRow label="Nouveaux articles" helper="Être prévenue lorsqu’un nouvel article est publié." defaultOn />
                            <ToggleRow label="Nouveaux parcours" helper="Recevoir un e-mail quand une nouvelle mini-formation arrive." />
                            <ToggleRow label="Rappels doux de ton atelier" helper="Un rappel léger pour revenir à tes parcours en cours." />
                        </div>
                    </div>
                </article>
            </section>

            {/* Ligne 2 : Ambiance & zone sensible */}
            <section className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
                {/* Ambiance & confort */}
                <article className="rounded-3xl border border-perl/60 bg-white/95 p-5 md:p-6 shadow-sm space-y-4">
                    <header className="flex items-center gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory">
                            <Palette className="h-4 w-4 text-main/70" />
                        </span>
                        <div className="space-y-0.5">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Ambiance</p>
                            <h3 className="font-serif-title text-base md:text-lg text-main">Confort de lecture</h3>
                        </div>
                    </header>

                    <p className="text-sm text-main/70">Quelques petits réglages pour adapter Explor&apos;Art à ta façon de lire et de te concentrer.</p>

                    <div className="space-y-3 pt-1 text-[0.86rem]">
                        {/* Densité d’interface */}
                        <div className="space-y-1.5">
                            <p className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-main/60">Densité de l’interface</p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-main/6 px-3.5 py-1.5 text-[0.8rem] text-main border border-main/15"
                                >
                                    <span>Aérée</span>
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-1.5 text-[0.8rem] text-main/70 border border-perl/50 hover:border-sage/60 hover:bg-sage/5 transition"
                                >
                                    <span>Standard</span>
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-1.5 text-[0.8rem] text-main/70 border border-perl/50 hover:border-sage/60 hover:bg-sage/5 transition"
                                >
                                    <span>Compact (plus tard)</span>
                                </button>
                            </div>
                        </div>

                        {/* Mode de concentration */}
                        <div className="space-y-1.5">
                            <p className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-main/60">Mode de concentration</p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-1.5 text-[0.8rem] text-main/75 border border-perl/50 hover:border-sage/60 hover:bg-sage/5 transition"
                                >
                                    <span>Animations douces</span>
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-1.5 text-[0.8rem] text-main/70 border border-perl/50 hover:border-sage/60 hover:bg-sage/5 transition"
                                >
                                    <span>Réduire les distractions</span>
                                </button>
                            </div>
                            <p className="text-[0.75rem] text-main/55">Certains modes pourront masquer les éléments non essentiels pendant la lecture (plus tard).</p>
                        </div>
                    </div>
                </article>

                {/* Zone sensible */}
                <article className="rounded-3xl border border-perl/60 bg-white/95 p-5 md:p-6 shadow-sm space-y-4">
                    <header className="space-y-1">
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Zone sensible</p>
                        <h3 className="font-serif-title text-base md:text-lg text-main">Sécurité & session</h3>
                        <p className="text-sm text-main/70">Gère ta session actuelle. La suppression définitive du compte arrivera plus tard.</p>
                    </header>

                    <div className="space-y-3 text-[0.86rem] text-main/70">
                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-perl/70 bg-ivory px-4 py-2.5 font-medium text-main/80 transition hover:border-rose/60 hover:bg-rose/5"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Se déconnecter (plus tard)</span>
                        </button>

                        <div className="rounded-2xl border border-rose/30 bg-rose/5 px-3.5 py-3 space-y-1.5">
                            <p className="text-[0.8rem] font-medium text-rose/85">Suppression de compte</p>
                            <p className="text-[0.78rem] text-main/70">
                                Cette option sera disponible quand la gestion des comptes sera en place. Je pourrais alors supprimer toutes mes données Explor&apos;Art.
                            </p>
                            <button
                                type="button"
                                disabled
                                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full border border-rose/40 bg-white/60 px-3.5 py-1.5 text-[0.78rem] text-rose/70 opacity-70 cursor-not-allowed"
                            >
                                Supprimer mon compte (bientôt)
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    );
}

/* Petit sous-composant pour les lignes de toggles e-mail (sans logique, pur UI) */
type ToggleRowProps = {
    label: string;
    helper: string;
    defaultOn?: boolean;
};

function ToggleRow({ label, helper, defaultOn }: ToggleRowProps) {
    const base = defaultOn ? 'bg-sage' : 'bg-perl/40';
    const knob = defaultOn ? 'translate-x-4 bg-ivory' : 'translate-x-0 bg-white';

    return (
        <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
                <p className="text-[0.86rem] text-main/80">{label}</p>
                <p className="text-[0.75rem] text-main/55">{helper}</p>
            </div>
            {/* faux switch purement visuel pour l’instant */}
            <button type="button" className={`relative mt-1 inline-flex h-5 w-9 items-center rounded-full ${base} shadow-inner transition-colors`}>
                <span className={`absolute left-0.5 h-4 w-4 rounded-full shadow-sm border border-white/70 transition-transform ${knob}`} />
            </button>
        </div>
    );
}
