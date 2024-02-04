'use client';

import { Button } from '@/components/ui/button';
import { login } from '@/queries/login';
import { logout } from '@/queries/logout';
import { todos } from '@/queries/todos';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Todo = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationKey: ['/api/users/login'],
    mutationFn: (userDetails: any) => login(userDetails),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ['/api/users/logout'],
    mutationFn: () => logout(),
    onSuccess: async () => {
      await queryClient.setQueryData(['/api/todos'], []);
    },
  });

  const { data: todoData } = useQuery({
    queryKey: ['/api/todos'],
    queryFn: todos,
  });

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <main className='w-full max-w-md mx-auto flex justify-around'>
        <Button
          onClick={() =>
            loginMutation.mutate({
              email: 'kaparapu.akhilnaidu@gmail.com',
              password: 'iwillhack',
            })
          }
        >
          Login
        </Button>
        <Button onClick={() => todos()}>Log Todos</Button>
        <Button onClick={() => logoutMutation.mutate()}>Logout</Button>
      </main>
      <div>
        {todoData?.map((todo: any) => {
          return <div key={todo.id}>{todo.task}</div>;
        })}
      </div>
    </div>
  );
};

export default Todo;
