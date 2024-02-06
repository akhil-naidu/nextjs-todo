import SettingsView from '@/app/_views/SettingsView';

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
  return <SettingsView />;
}
