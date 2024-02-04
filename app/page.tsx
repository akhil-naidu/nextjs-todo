'use client';

import { Button } from '@/components/ui/button';
import { login } from '@/queries/login';
import { logout } from '@/queries/logout';
import { todos } from '@/queries/todos';

export default function Todo() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <header className='mb-10'>
        <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100'>
          Todo App
        </h1>
      </header>
      <main className='w-full max-w-md mx-auto flex justify-around'>
        <Button
          onClick={() =>
            login({
              email: 'kaparapu.akhilnaidu@gmail.com',
              password: 'iwillhack',
            })
          }
        >
          Login
        </Button>
        <Button onClick={() => todos()}>Log Todos</Button>
        <Button onClick={() => logout()}>Logout</Button>
      </main>
    </div>
  );
}
