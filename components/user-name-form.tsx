'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function UserNameForm({
  user,
  className,
  ...props
}: {
  user: any;
  className: string;
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  return (
    <form
      className={cn(className)}
      {...props}
      onSubmit={(e: React.FormEvent) => e.preventDefault()}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='name'>
              Name
            </Label>
            <Input
              id='name'
              className='w-[400px]'
              size={32}
              defaultValue={user.name}
            />
            {/* {errors?.name && (
              <p className='px-1 text-xs text-red-600'>{errors.name.message}</p>
            )} */}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type='submit'
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
