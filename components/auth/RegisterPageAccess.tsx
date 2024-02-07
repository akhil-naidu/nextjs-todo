import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Icons } from '../icons';

const RegisterPageAccess = () => {
  const router = useRouter();

  return (
    <main className='p-6 flex justify-center items-center min-h-screen'>
      <Card className='mx-auto min-w-96 max-w-md'>
        <CardHeader className='space-y-1'>
          <Icons.warning className='mr-4 h-12 w-12 text-red-600 flex self-center' />
          <CardTitle className='text-2xl font-bold flex justify-center'>
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button className='w-full' onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterPageAccess;
