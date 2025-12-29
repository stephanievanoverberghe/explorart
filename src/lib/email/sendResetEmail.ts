// src/lib/email/sendResetEmail.ts
interface SendResetEmailParams {
    to: string;
    resetUrl: string;
}

const RESEND_API_URL = 'https://api.resend.com/emails';

export async function sendResetEmail({ to, resetUrl }: SendResetEmailParams): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !from) {
        throw new Error('RESEND_API_KEY or RESEND_FROM_EMAIL is not configured');
    }

    const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from,
            to,
            subject: 'Réinitialisation de mot de passe',
            html: `
                <p>Vous avez demandé une réinitialisation de mot de passe.</p>
                <p>Pour choisir un nouveau mot de passe, cliquez sur le lien ci-dessous :</p>
                <p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p>
                <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.</p>
            `,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Resend API error: ${response.status} ${errorBody}`);
    }
}
