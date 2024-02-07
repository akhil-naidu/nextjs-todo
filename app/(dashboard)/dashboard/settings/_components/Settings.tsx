'use client';

import SettingsView from '@/app/_views/SettingsView';
import isAuth from '@/components/auth/is-auth';

const Settings = () => {
  return <SettingsView />;
};

export default isAuth(Settings);
