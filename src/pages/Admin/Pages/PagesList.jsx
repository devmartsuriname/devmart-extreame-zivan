import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';

export default function PagesList() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Pages', path: null }
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Pages</h1>
        <button className="btn btn-primary" disabled>
          <Icon icon="mdi:plus" className="icon" />
          Create New Page
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-empty-state">
          <Icon icon="mdi:file-document-outline" className="icon" />
          <h3>No pages yet</h3>
          <p>The dynamic page builder will be implemented in Phase 5.</p>
          <p className="text-muted">
            This module will allow you to create and manage custom pages using a drag-and-drop builder.
          </p>
        </div>
      </div>
    </BackendLayout>
  );
}
