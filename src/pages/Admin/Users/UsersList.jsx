import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';

export default function UsersList() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Users', path: null }
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Users & Roles</h1>
        <button className="btn btn-primary" disabled>
          <Icon icon="mdi:plus" className="icon" />
          Add User
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-empty-state">
          <Icon icon="mdi:account-multiple-outline" className="icon" />
          <h3>User management coming soon</h3>
          <p>User management will be implemented in Phase 4.</p>
          <p className="text-muted">
            This module will allow super admins to manage users and assign roles.
          </p>
        </div>
      </div>
    </BackendLayout>
  );
}
