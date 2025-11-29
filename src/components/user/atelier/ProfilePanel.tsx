// src/components/user/atelier/ProfilePanel.tsx
import { Settings, User } from 'lucide-react';

export function ProfilePanel() {
    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-main/60">Profil & paramètres</p>
                <h2 className="font-serif-title text-xl md:text-2xl text-main">Réglages de ton atelier</h2>
                <p className="text-sm text-main/70 max-w-2xl">Plus tard, tu pourras personnaliser ton expérience : avatar, préférences d’e-mails, rythme des rappels, etc.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-perl/60 bg-white/95 p-5 shadow-sm space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-3 py-1 text-[0.75rem] text-main/70">
                        <User className="h-4 w-4 text-main/70" />
                        <span>Profil</span>
                    </div>
                    <h3 className="font-serif-title text-base md:text-lg text-main">Informations de base</h3>
                    <p className="text-sm text-main/70">
                        Zone réservée aux infos de compte (nom, e-mail, préférences de langue…). Pour l’instant, tout ça sera géré côté back plus tard.
                    </p>
                </div>

                <div className="rounded-3xl border border-perl/60 bg-white/95 p-5 shadow-sm space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-ivory px-3 py-1 text-[0.75rem] text-main/70">
                        <Settings className="h-4 w-4 text-main/70" />
                        <span>Préférences</span>
                    </div>
                    <h3 className="font-serif-title text-base md:text-lg text-main">Notifications & rythme</h3>
                    <p className="text-sm text-main/70">
                        Ici, tu pourras choisir si tu veux être prévenue des nouveaux articles, des nouveaux parcours ou des mises à jour de ton atelier.
                    </p>
                </div>
            </div>
        </section>
    );
}
