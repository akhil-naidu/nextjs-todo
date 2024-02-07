import Link from 'next/link';

import { TodoOperations } from '@/components/todo-operations';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import { Todo } from '@/types/payload-types';

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className='flex items-center justify-between p-4'>
      <div className='grid gap-1'>
        <Link href={``} className='font-semibold hover:underline'>
          {todo.task}
        </Link>
        <div>
          <p className='text-sm text-muted-foreground'>
            {formatDate(todo.createdAt?.toString())}
          </p>
        </div>
      </div>
      <TodoOperations todo={{ id: todo.id, task: todo.task }} />
    </div>
  );
}

TodoItem.Skeleton = function TodoItemSkeleton() {
  return (
    <div className='p-4'>
      <div className='space-y-3'>
        <Skeleton className='h-5 w-2/5' />
        <Skeleton className='h-4 w-4/5' />
      </div>
    </div>
  );
};
