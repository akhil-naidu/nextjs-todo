import { Metadata } from 'next';

import Login from './_components/Login';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return <Login />;
}
