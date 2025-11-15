import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';

export default function BlogList() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Blog', path: null }
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Blog</h1>
        <button className="btn btn-primary" disabled>
          <Icon icon="mdi:plus" className="icon" />
          Create New Post
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-empty-state">
          <Icon icon="mdi:post-outline" className="icon" />
          <h3>No blog posts yet</h3>
          <p>This module will be implemented in a future phase.</p>
        </div>
      </div>
    </BackendLayout>
  );
}
