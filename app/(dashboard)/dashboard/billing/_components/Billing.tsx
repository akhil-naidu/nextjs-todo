'use client';

import BillingView from '@/app/_views/BillingView';
import isAuth from '@/components/auth/is-auth';

const Billing = () => {
  return <BillingView />;
};

export default isAuth(Billing);
