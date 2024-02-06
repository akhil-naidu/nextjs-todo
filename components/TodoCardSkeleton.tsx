import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
function TodoCardSkeleton() {
  return (
    <div className='flex flex-col items-center space-y-4'>
      {Array.from({ length: 4 }, (_, index) => (
        <Card key={index} className='w-full md:w-[400px] px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='w-full md:w-[300px] space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
            </div>
            <Skeleton className='h-8 w-8 rounded-full' />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default TodoCardSkeleton;
