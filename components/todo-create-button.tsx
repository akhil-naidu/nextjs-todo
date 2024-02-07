'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { keys } from '@/apis/query-keys';
import { addTodo } from '@/apis/todos';
import { Icons } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Todo } from '@/types/payload-types';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface TodoCreateButtonProps extends ButtonProps {}

export function TodoCreateButton({
  className,
  variant,
  ...props
}: TodoCreateButtonProps) {
  const router = useRouter();
  const [isCreateLoading, setIsCreateLoading] = React.useState<boolean>(false);

  const [input, setInput] = React.useState('');
  const [showCreateAlert, setShowCreateAlert] = React.useState(false);

  const queryClient = useQueryClient();

  const {
    isPending: isAddTodoPending,
    variables: addTodoVariables,
    mutate: addTodoMutation,
  } = useMutation({
    mutationKey: keys('/api/todos', 'post').detail(input),
    mutationFn: (todo: { task: Todo['task'] }) => addTodo(todo),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys('/api/todos', 'get').main(),
      });
    },
    onError: async () => {
      toast({
        title: 'Something went wrong.',
        description: 'Your todo was not created. Please try again.',
        variant: 'destructive',
      });
    },
    onSettled: async () => {
      setInput('');
      setIsCreateLoading(false);
      setShowCreateAlert(false);
    },
  });

  return (
    <>
      <button
        onClick={() => setShowCreateAlert(true)}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      >
        <Icons.add className='mr-2 h-4 w-4' />
        New todo
      </button>
      <AlertDialog open={showCreateAlert} onOpenChange={setShowCreateAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Add a New Task
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
            </AlertDialogTitle>
            <AlertDialogDescription>
              Enter your new Todo here. Click create when done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsCreateLoading(true);
                addTodoMutation({ task: input });
              }}
              className={cn(
                buttonVariants({ variant }),
                {
                  'cursor-not-allowed opacity-60': isCreateLoading,
                },
                className
              )}
              disabled={isCreateLoading}
            >
              {isCreateLoading ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Icons.add className='mr-2 h-4 w-4' />
              )}
              <span>Create</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
