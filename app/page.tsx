import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function todo() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <header className='mb-10'>
        <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100'>
          Todo App
        </h1>
      </header>
      <main className='w-full max-w-md mx-auto'>
        <form className='flex items-center w-full mb-4'>
          <Input
            className='flex-grow mr-2'
            placeholder='Add a new task...'
            type='text'
          />
          <Button type='submit'>Add</Button>
        </form>
        <ul className='space-y-2'>
          <li className='flex items-center justify-between p-2 rounded-md bg-white shadow-sm dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
            <div className='flex items-center space-x-2'>
              <Checkbox id='todo1' />
              <Label
                className='text-gray-800 dark:text-gray-100'
                htmlFor='todo1'
              >
                Buy groceries
              </Label>
            </div>
            <Button size='icon' variant='ghost'>
              <TrashIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
            </Button>
          </li>
          <li className='flex items-center justify-between p-2 rounded-md bg-white shadow-sm dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
            <div className='flex items-center space-x-2'>
              <Checkbox id='todo2' />
              <Label
                className='text-gray-800 dark:text-gray-100'
                htmlFor='todo2'
              >
                Finish report
              </Label>
            </div>
            <Button size='icon' variant='ghost'>
              <TrashIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
            </Button>
          </li>
          <li className='flex items-center justify-between p-2 rounded-md bg-white shadow-sm dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
            <div className='flex items-center space-x-2'>
              <Checkbox id='todo3' />
              <Label
                className='text-gray-800 dark:text-gray-100'
                htmlFor='todo3'
              >
                Call mom
              </Label>
            </div>
            <Button size='icon' variant='ghost'>
              <TrashIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
            </Button>
          </li>
        </ul>
        <Button className='mt-4 w-full' variant='outline'>
          Delete completed
        </Button>
      </main>
    </div>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
    </svg>
  );
}
