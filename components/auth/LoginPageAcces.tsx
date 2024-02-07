import { logout } from '@/apis/auth';
import { keys } from '@/apis/query-keys';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const LoggedUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
    <main className='p-6 flex justify-center items-center min-h-screen'>
      <Card className='mx-auto max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>
            Already logged in
          </CardTitle>
          <CardDescription>
            To log in with another user, you should{' '}
            <span
              className='underline cursor-pointer'
              onClick={() => logoutMutation()}
            >
              log out
            </span>{' '}
            first.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex gap-2'>
          <Button
            className='w-full'
            onClick={() => router.push('/')}
            variant='outline'
          >
            Back to Home
          </Button>
          <Button className='w-full' onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoggedUser;
