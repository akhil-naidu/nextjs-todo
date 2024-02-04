'use client';

import { Button } from '@/components/ui/button';
import { login } from '@/queries/login';
import { logout } from '@/queries/logout';
import { getAllTodos, addTodo } from '@/queries/todos';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Todo = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isLoginPending,
    variables: loginVariables,
    mutate: loginMutation,
  } = useMutation({
    mutationKey: ['/api/users/login'],
    mutationFn: (userDetails: any) => login(userDetails),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    },
  });

  const {
    isPending: isLogoutPending,
    variables: logoutVariables,
    mutate: logoutMutation,
  } = useMutation({
    mutationKey: ['/api/users/logout'],
    mutationFn: () => logout(),
    onSuccess: async () => {
      await queryClient.setQueryData(['/api/todos'], []);
    },
  });

  const { data: todoData } = useQuery({
    queryKey: ['/api/todos'],
    queryFn: getAllTodos,
  });

  const {
    isPending: isAddTodoPending,
    variables: addTodoVariables,
    mutate: addTodoMutation,
  } = useMutation({
    mutationKey: ['/api/todos', { name: 'addTodo' }],
    mutationFn: (todoData: any) => addTodo(todoData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    },
  });

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <main className='w-full max-w-md mx-auto flex justify-around'>
        <Button
          onClick={() =>
            loginMutation({
              email: 'kaparapu.akhilnaidu@gmail.com',
              password: 'iwillhack',
            })
          }
        >
          Login
        </Button>
        <Button onClick={() => addTodoMutation({ task: 'New Todo' })}>
          AddTodo
        </Button>
        <Button onClick={() => logoutMutation()}>Logout</Button>
      </main>
      <div>
        {isAddTodoPending && (
          <div className='opacity-50 py-2 px-4 bg-red-200 w-60  m-4 text-center rounded-md'>
            {addTodoVariables.task}
          </div>
        )}
        {todoData?.map((todo: any) => {
          return (
            <div
              className='py-2 px-4 bg-gray-200 w-60  m-4 text-center rounded-md'
              key={todo.id}
            >
              {todo.task}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
