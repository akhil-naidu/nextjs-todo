import { DashboardHeader } from '@/components/header';
import { PostCreateButton } from '@/components/post-create-button';
import { DashboardShell } from '@/components/shell';
import { PostItem } from '@/components/todo-item';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading='Todos' text='Create and manage todos.'>
        <PostCreateButton />
      </DashboardHeader>
      <div className='divide-border-200 divide-y rounded-md border'>
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
