'use client';

import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = isAuthenticated();

    useEffect(() => {
      if (!auth) {
        return redirect('/');
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
