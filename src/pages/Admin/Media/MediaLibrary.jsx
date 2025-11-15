import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';

export default function MediaLibrary() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Media', path: null }
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Media Library</h1>
        <button className="btn btn-primary" disabled>
          <Icon icon="mdi:upload" className="icon" />
          Upload Files
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-empty-state">
          <Icon icon="mdi:image-multiple-outline" className="icon" />
          <h3>No media files yet</h3>
          <p>This module will be implemented in a future phase.</p>
        </div>
      </div>
    </BackendLayout>
  );
}
