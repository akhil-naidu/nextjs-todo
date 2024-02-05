'use server';

import { cookies } from 'next/headers';

export async function isAuthenticated() {
    const cookiesList = cookies()
    const hasCookie = cookiesList.has('payload-token');

    return hasCookie;
}