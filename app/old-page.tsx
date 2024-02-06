'use client';

import { keys } from '@/apis/query-keys';
import { addTodo, getAllTodos } from '@/apis/todos';
import TodoCard from '@/components/TodoCard';
import TodoCardSkeleton from '@/components/TodoCardSkeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { isAuthenticated } from '@/lib/auth';
import { Todo } from '@/types/payload-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
const Todo = () => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState<string>('');

  const { data: todoData, isLoading } = useQuery({
    queryKey: keys('/api/todos', 'get').main(),
    queryFn: getAllTodos,
    enabled: Boolean(async () => await isAuthenticated()),
  });

  const {
    isPending: isAddTodoPending,
    variables: addTodoVariables,
    mutate: addTodoMutation,
  } = useMutation({
    mutationKey: keys('/api/todos', 'post').detail(input),
    mutationFn: (todoData: { task: Todo['task'] }) => addTodo(todoData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys('/api/todos', 'get').main(),
      });
    },
  });

  return (
    <div className='flex flex-col items-center pt-[50px] min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-10'>
      <main className='flex gap-4 mb-[20px] h-auto w-full md:md:w-[400px] '>
        <Input
          className='py-6'
          type='text'
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          placeholder='Enter Todo'
          required={true}
        />
        <Button
          className='py-6'
          onClick={() => {
            addTodoMutation({ task: input });
            setInput('');
          }}
        >
          Add Todo
        </Button>
      </main>
      <div>
        {isAddTodoPending && (
          <div className='w-full md:w-[400px] '>
            <Card className='w-full md:w-[400px] px-4 py-4 mb-4 bg-pink-200'>
              <div className='flex justify-between items-center'>
                <h1>{addTodoVariables.task} </h1>
              </div>
            </Card>
          </div>
        )}
        {isLoading ? (
          <TodoCardSkeleton />
        ) : (
          todoData?.map((todo: Todo) => {
            return (
              <div key={todo.id}>
                <TodoCard item={todo} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Todo;
