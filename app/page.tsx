'use client';

import { Button } from '@/components/ui/button';
import { login, logout } from '@/apis/auth';
import { getAllTodos, addTodo } from '@/apis/todos';
import { keys } from '@/apis/query-keys';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Todo = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isLoginPending,
    variables: loginVariables,
    mutate: loginMutation,
  } = useMutation({
    mutationKey: keys('/api/users/login', 'post').main(),
    mutationFn: (userDetails: any) => login(userDetails),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys('/api/todos', 'get').main(),
      });
    },
  });

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

  const { data: todoData } = useQuery({
    queryKey: keys('/api/todos', 'get').main(),
    queryFn: getAllTodos,
  });

  const {
    isPending: isAddTodoPending,
    variables: addTodoVariables,
    mutate: addTodoMutation,
  } = useMutation({
    mutationKey: keys('/api/users/todos', 'post').main(),
    mutationFn: (todoData: any) => addTodo(todoData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys('/api/todos', 'get').main(),
      });
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
        <Button onClick={() => addTodoMutation({ task: 'akhil' })}>
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
