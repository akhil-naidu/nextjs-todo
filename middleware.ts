import { isAuthenticated } from '@/lib/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = [''];

export const middleware = async (req: NextRequest) => {
  const auth = await isAuthenticated();

  if (!auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
};
