import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';

export default function FormsInbox() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Forms', path: null }
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Form Submissions</h1>
      </div>
      
      <div className="admin-card">
        <div className="admin-empty-state">
          <Icon icon="mdi:email-outline" className="icon" />
          <h3>No form submissions yet</h3>
          <p>This module will be implemented in a future phase.</p>
        </div>
      </div>
    </BackendLayout>
  );
}
