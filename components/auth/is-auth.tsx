'use client';

import { currUser } from '@/apis/auth/queries';
import { keys } from '@/apis/query-keys';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import LoggedUser from './LoginPageAcces';
import RegisterPageAccess from './RegisterPageAccess';

const isAuth = (Component: any) => {
  const IsAuth = (props: any) => {
    const pathname = usePathname();

    const router = useRouter();

    const { data: user, isLoading } = useQuery({
      queryKey: keys('/api/users/me', 'get').main(),
      queryFn: currUser,
    });

    if (isLoading) return null;

    if (pathname === '/login') {
      if (user) {
        return <LoggedUser />;
      }

      return <Component {...props} />;
    }

    if (pathname === '/register') {
      return <RegisterPageAccess />;
    }

    if (pathname === '/dashboard') {
      if (user) {
        return <Component {...props} />;
      }

      router.push('/login');
    }

    if (pathname === '/dashboard/billing') {
      if (user) {
        return <Component {...props} />;
      }

      router.push('/login');
    }

    if (pathname === '/dashboard/settings') {
      if (user) {
        return <Component {...props} />;
      }

      router.push('/login');
    }

    return <Component {...props} />;
  };

  return IsAuth;
};

export default isAuth;
