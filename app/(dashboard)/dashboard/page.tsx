import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { DashboardHeader } from '@/components/header';
import { PostCreateButton } from '@/components/post-create-button';
import { PostItem } from '@/components/post-item';
import { DashboardShell } from '@/components/shell';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const posts = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
      author: 'John Doe',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the content of the second post.',
      author: 'Jane Smith',
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Third Post',
      content: 'This is the content of the third post.',
      author: 'Alice Johnson',
      createdAt: new Date(),
    },
    {
      id: 4,
      title: 'Fourth Post',
      content: 'This is the content of the fourth post.',
      author: 'Bob Brown',
      createdAt: new Date(),
    },
    {
      id: 5,
      title: 'Fifth Post',
      content: 'This is the content of the fifth post.',
      author: 'Emma Wilson',
      createdAt: new Date(),
    },
  ];

  return (
    <DashboardShell>
      <DashboardHeader heading='Posts' text='Create and manage posts.'>
        <PostCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className='divide-y divide-border rounded-md border'>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name='post' />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant='outline' />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
