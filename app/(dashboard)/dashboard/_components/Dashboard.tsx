'use client';

import TodoView from '@/app/_views/TodoView';
import isAuth from '@/components/auth/is-auth';

const Dashboard = () => {
  return <TodoView />;
};

export default isAuth(Dashboard);
