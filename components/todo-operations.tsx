'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { keys } from '@/apis/query-keys';
import { deleteTodo, editTodo } from '@/apis/todos/mutations';
import { Icons } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Todo } from '@/types/payload-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function deletePost(postId: string) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });

  if (!response?.ok) {
    toast({
      title: 'Something went wrong.',
      description: 'Your todo was not deleted. Please try again.',
      variant: 'destructive',
    });
  }

  return true;
}

export function TodoOperations({ todo }: { todo: any }) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  const [editInput, setEditInput] = React.useState('');
  const [showEditAlert, setShowEditAlert] = React.useState<boolean>(false);
  const [isEditLoading, setIsEditLoading] = React.useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    isPending: isDeleteTodoPending,
    variables: deleteTodoVariables,
    mutate: deleteTodoMutation,
  } = useMutation({
    mutationKey: keys(`/api/todos/${todo.id}`, 'delete').detail(todo.id),
    mutationFn: (id: Todo['id']) => deleteTodo(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys('/api/todos', 'get').main(),
      });
    },
    onError: async () => {
      toast({
        title: 'Something went wrong.',
        description: 'Your todo was not deleted. Please try again.',
        variant: 'destructive',
      });
    },
    onSettled: async () => {
      setIsDeleteLoading(false);
      setShowDeleteAlert(false);
    },
  });

  const {
    isPending: isEditTodoPending,
    variables: editTodoVariables,
    mutate: editTodoMutation,
  } = useMutation({
    mutationKey: keys(`/api/todos/${todo.id}`, 'patch').detail(todo.id),
    mutationFn: (obj: { id: Todo['id']; task: Todo['task'] }) =>
      editTodo(obj.id, { task: obj.task }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys('/api/todos', 'get').main(),
      });
    },
    onError: async () => {
      toast({
        title: 'Something went wrong.',
        description: 'Your todo was not saved. Please try again.',
        variant: 'destructive',
      });
    },
    onSettled: async () => {
      setEditInput('');
      setIsEditLoading(false);
      setShowEditAlert(false);
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted'>
          <Icons.ellipsis className='h-4 w-4' />
          <span className='sr-only'>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <Link
              className='flex w-full'
              href={''}
              onClick={() => {
                setShowEditAlert(true);
                setEditInput(todo.task);
              }}
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex cursor-pointer items-center text-destructive focus:text-destructive'
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this todo?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsDeleteLoading(true);
                deleteTodoMutation(todo.id);
              }}
              className='bg-red-600 focus:ring-red-600'
            >
              {isDeleteLoading ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Icons.trash className='mr-2 h-4 w-4' />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showEditAlert} onOpenChange={setShowEditAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Edit todo
              <Input
                className='py-6'
                type='text'
                onChange={(e) => {
                  setEditInput(e.target.value);
                }}
                value={editInput}
                placeholder='Enter new todo'
                required={true}
              />
            </AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to your Todo here. Click save when done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsEditLoading(true);
                editTodoMutation({
                  id: todo.id,
                  task: editInput,
                });
              }}
              className='bg-cyan-600 focus:ring-cyan-600'
            >
              {isEditLoading ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Icons.save className='mr-2 h-4 w-4' />
              )}
              <span>Save</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
