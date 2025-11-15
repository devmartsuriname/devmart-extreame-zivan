import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';

export default function PortfolioList() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Portfolio', path: null }
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Portfolio</h1>
        <button className="btn btn-primary" disabled>
          <Icon icon="mdi:plus" className="icon" />
          Create New Item
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-empty-state">
          <Icon icon="mdi:briefcase-outline" className="icon" />
          <h3>No portfolio items yet</h3>
          <p>This module will be implemented in a future phase.</p>
        </div>
      </div>
    </BackendLayout>
  );
}
