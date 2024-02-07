import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

import { createUser } from '@/apis/auth/mutations';
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

const RegisterView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const {
    isPending: isSignupPending,
    variables: signupVariables,
    mutate: signupMutation,
  } = useMutation({
    mutationKey: keys('/api/users/login', 'post').main(),
    mutationFn: (userDetails: any) => createUser(userDetails),
    onSuccess: async () => {
      router.push('/login');
      setEmail('');
      setPassword('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation({
      email,
      password,
    });
  };

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Sign Up</CardTitle>
        <CardDescription>
          Enter your username and password to create your account
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
              Sign Up
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          Already have an account?
          <Link className='underline' href='/login'>
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterView;
