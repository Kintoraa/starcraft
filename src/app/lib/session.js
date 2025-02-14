import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { cache } from 'react';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

}

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.error('Failed to verify session:', error);
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}



export const verifySession = cache(async () => {
    try {

        const cookieStore = await cookies();
        const cookie = cookieStore.get('session')?.value;


        if (!cookie) {
            return { isAuth: false };
        }


        const session = await decrypt(cookie);


        if (!session?.userId) {
            return { isAuth: false };
        }


        return { isAuth: true, userId: session.userId };
    } catch (err) {
        console.log('Erreur lors de la vérification de la session:', err.message);
        return { isAuth: false };
    }
});