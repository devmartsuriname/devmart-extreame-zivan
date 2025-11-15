import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';

export default function NavigationManager() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Navigation', path: null }
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Navigation Manager</h1>
        <button className="btn btn-primary" disabled>
          <Icon icon="mdi:plus" className="icon" />
          Add Menu Item
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-empty-state">
          <Icon icon="mdi:menu" className="icon" />
          <h3>Navigation manager coming soon</h3>
          <p>This module will be implemented in a future phase.</p>
        </div>
      </div>
    </BackendLayout>
  );
}
