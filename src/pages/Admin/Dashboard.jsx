import BackendLayout from '@/components/Admin/BackendLayout';

export default function Dashboard() {
  const breadcrumbs = [
    { label: 'Dashboard', path: null }
  ];

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
      </div>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-label">Total Pages</div>
          <div className="stat-value">0</div>
          <div className="stat-change positive">Coming in Phase 5</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-label">Blog Posts</div>
          <div className="stat-value">0</div>
          <div className="stat-change positive">Coming in Phase 5</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-label">Portfolio Items</div>
          <div className="stat-value">0</div>
          <div className="stat-change positive">Coming in Phase 5</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-label">Form Submissions</div>
          <div className="stat-value">0</div>
          <div className="stat-change positive">Coming in Phase 6</div>
        </div>
      </div>
      
      <div className="admin-card">
        <h2>Welcome to Devmart Admin Panel</h2>
        <p>
          This is the admin dashboard. Content management features will be implemented in future phases according to the development roadmap.
        </p>
        <p className="text-muted">
          Phase 3 (Current): Admin UI Shell - Layout and navigation structure<br />
          Phase 4 (Next): Authentication and user management<br />
          Phase 5: Pages Module and dynamic page builder<br />
          Phase 6+: Content modules (Blog, Portfolio, Services, etc.)
        </p>
      </div>
    </BackendLayout>
  );
}
