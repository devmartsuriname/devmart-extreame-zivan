import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';

export default function Settings() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Settings', path: null }
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Settings</h1>
      </div>
      
      <div className="admin-card">
        <div className="admin-empty-state">
          <Icon icon="mdi:cog-outline" className="icon" />
          <h3>Settings coming soon</h3>
          <p>Site settings, SMTP configuration, and other options will be implemented in a future phase.</p>
        </div>
      </div>
    </BackendLayout>
  );
}
