'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/apis/auth';
import { keys } from '@/apis/query-keys';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/user-avatar';
import { dashboardConfig } from '@/config/dashboard';

export function UserAccountNav({ user }: { user: any }) {
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
      await queryClient.invalidateQueries({
        queryKey: keys('/api/users/me', 'get').main(),
      });
      router.push('/login');
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className='h-8 w-8'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}
            {user.email && (
              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {dashboardConfig.userAccountNav.map((navItem) => {
          return (
            <DropdownMenuItem asChild key={navItem.title}>
              <Link href={navItem.href!}>{navItem.title}</Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(event: Event) => {
            event.preventDefault();
            logoutMutation();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
