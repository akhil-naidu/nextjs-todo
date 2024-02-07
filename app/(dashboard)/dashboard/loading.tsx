import { DashboardHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { TodoCreateButton } from '@/components/todo-create-button';
import { TodoItem } from '@/components/todo-item';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading='Todos' text='Create and manage todos.'>
        <TodoCreateButton />
      </DashboardHeader>
      <div className='divide-border-200 divide-y rounded-md border'>
        <TodoItem.Skeleton />
        <TodoItem.Skeleton />
        <TodoItem.Skeleton />
        <TodoItem.Skeleton />
        <TodoItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
