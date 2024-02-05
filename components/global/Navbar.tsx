'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/apis/auth';
import { keys } from '@/apis/query-keys';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    isPending: isLogoutPending,
    variables: logoutVariables,
    mutate: logoutMutation,
  } = useMutation({
    mutationKey: keys('/api/users/logout', 'post').main(),
    mutationFn: () => logout(),
    onSuccess: async () => {
      await queryClient.setQueryData(keys('/api/todos', 'get').main(), []);
    },
  });

  return (
    <header className='flex justify-between items-center p-6 shadow-md'>
      <Link className='flex items-center' href='/'>
        <span className='ml-2 text-xl font-semibold'>TO-DO List</span>
      </Link>
      <nav className='space-x-4'>
        <Button variant='ghost'>Home</Button>
        <Button variant='ghost'>About</Button>
        <Button variant='ghost'>Services</Button>
        <Button variant='ghost'>Contact</Button>
      </nav>
      <div className='flex space-x-2'>
        <Button variant='default' onClick={() => router.push('/auth/login')}>
          Login
        </Button>
        <Button variant='outline' onClick={() => logoutMutation()}>
          Logout
        </Button>
      </div>
    </header>
  );
}
