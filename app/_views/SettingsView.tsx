'use client';

import { useQueryClient } from '@tanstack/react-query';

import { keys } from '@/apis/query-keys';
import { DashboardHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { UserNameForm } from '@/components/user-name-form';
import { User } from '@/types/payload-types';

const SettingsView: React.FC = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<User>(
    keys('/api/users/me', 'get').main()
  );

  return (
    <DashboardShell>
      <DashboardHeader
        heading='Settings'
        text='Manage account and website settings.'
      />
      <div className='grid gap-10'>
        <UserNameForm
          user={{ id: user?.id, name: user?.email }}
          className={''}
        />
      </div>
    </DashboardShell>
  );
};

export default SettingsView;
