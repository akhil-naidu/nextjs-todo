'use client';

import { keys } from '@/apis/query-keys';
import { deleteTodo, editTodo } from '@/apis/todos/mutations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function TodoCard({
  item,
  addTodoVariables,
  isAddTodoPending,
}: {
  item: any;
  addTodoVariables: any;
  isAddTodoPending: any;
}) {
  const queryClient = useQueryClient();
  const {
    isPending: isDeleteTodoPending,
    variables: DeleteTodoVariables,
    mutate: deleteTodoMutation,
  } = useMutation({
    mutationKey: keys(`/api/todos/`, 'delete').detail(item.id),
    mutationFn: (todoData: any) => deleteTodo(todoData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys('/api/todos', 'get').main(),
      });
    },
  });

  const {
    isPending: isEditTodoPending,
    variables: EditTodoVariables,
    mutate: EditTodoMutation,
  } = useMutation({
    mutationKey: keys(`/api/users/todos/`, 'patch').main(),
    mutationFn: (obj: any) => editTodo(obj.id, { task: obj.task }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys('/api/todos', 'get').main(),
      });
    },
  });

  const [input, setInput] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<Boolean>(false);

  return (
    <div className='w-full md:w-[400px] '>
      <Card className='w-full md:w-[400px] px-4 py-4 mb-4 bg-gray-200'>
        <div className='flex justify-between items-center'>
          <h1>{item.task}</h1>
          <Popover>
            <PopoverTrigger asChild>
              <div className='cursor-pointer'>
                <BsThreeDotsVertical size={18} />
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-45 bg-gray-100'>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <div className='grid grid-cols-1 items-center gap-4'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant='outline'
                          onClick={() => setIsDialogOpen(true)}
                        >
                          <FaEdit size={18} className='text-yellow-400 mr-2' />
                          Edit Todo
                        </Button>
                      </DialogTrigger>
                      {isDialogOpen && (
                        <DialogContent className='sm:max-w-[425px]'>
                          <DialogHeader>
                            <DialogTitle>Edit Todo</DialogTitle>
                            <DialogDescription>
                              Make changes to your Todo here. Click save when
                              done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <Label htmlFor='name' className='text-right'>
                                Todo
                              </Label>
                              <Input
                                placeholder={item.task}
                                id='name'
                                className='col-span-3'
                                onChange={(e) => {
                                  setInput(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type='submit'
                              onClick={() => {
                                EditTodoMutation({
                                  id: item.id,
                                  task: input,
                                });
                                setIsDialogOpen(false); // Close the dialog
                              }}
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                    <Button
                      onClick={() => {
                        deleteTodoMutation(item.id);
                      }}
                    >
                      <FaEdit size={18} className='text-red-400 mr-2' /> Delete
                      Todo
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>
    </div>
  );
}
