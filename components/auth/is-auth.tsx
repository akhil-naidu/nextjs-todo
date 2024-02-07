'use client';

import { currUser } from '@/apis/auth/queries';
import { keys } from '@/apis/query-keys';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const isAuth = (Component: any) => {
  const IsAuth = (props: any) => {
    const pathname = usePathname();

    const { data: user, isLoading } = useQuery({
      queryKey: keys('/api/users/me', 'get').main(),
      queryFn: currUser,
    });

    if (isLoading) return null;

    if (pathname === '/login') {
      if (user) {
        return (
          <div>
            <h1>Already Logged in</h1>
            <Link href='/dashboard'>Go to dashboard</Link>
          </div>
        );
      }

      return <Component {...props} />;
    }

    if (pathname === '/register') {
      return <Component {...props} />;
    }

    return <Component {...props} />;
  };

  return IsAuth;
};

export default isAuth;
