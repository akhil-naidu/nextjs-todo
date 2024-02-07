'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

import { login } from '@/apis/auth';
import { keys } from '@/apis/query-keys';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    isPending: isLoginPending,
    variables: loginVariables,
    mutate: loginMutation,
  } = useMutation({
    mutationKey: keys('/api/users/login', 'post').main(),
    mutationFn: (userDetails: any) => login(userDetails),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys('/api/todos', 'get').main(),
      });
      router.push('/dashboard');
      setEmail('');
      setPassword('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation({
      email,
      password,
    });
  };

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Login</CardTitle>
        <CardDescription>
          Enter your username and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='John@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className='w-full' type='submit'>
              Login
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?
          <Link className='underline' href='/register'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginView;
