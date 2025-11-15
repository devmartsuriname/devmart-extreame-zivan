import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import BackendLayout from '@/components/Admin/BackendLayout';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    recentUsers: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const breadcrumbs = [
    { label: 'Dashboard', path: null }
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      // Get total users count
      const { count: totalUsers, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (usersError) throw usersError;

      // Get admin/super_admin count
      const { data: adminRoles, error: adminError } = await supabase
        .from('user_roles')
        .select('user_id')
        .in('role', ['admin', 'super_admin']);
      
      if (adminError) throw adminError;
      
      const totalAdmins = new Set(adminRoles?.map(r => r.user_id)).size;

      // Get users created in last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: recentUsers, error: recentError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());
      
      if (recentError) throw recentError;

      setStats({
        totalUsers: totalUsers || 0,
        totalAdmins: totalAdmins || 0,
        recentUsers: recentUsers || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
      </div>
      
      {isLoading ? (
        <div className="admin-loading">
          <div className="spinner" />
          <p>Loading statistics...</p>
        </div>
      ) : (
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-label">Total Users</div>
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-change positive">All registered users</div>
          </div>
          
          <div className="admin-stat-card">
            <div className="stat-label">Administrators</div>
            <div className="stat-value">{stats.totalAdmins}</div>
            <div className="stat-change positive">Admins & Super Admins</div>
          </div>
          
          <div className="admin-stat-card">
            <div className="stat-label">New Users (7 days)</div>
            <div className="stat-value">{stats.recentUsers}</div>
            <div className="stat-change positive">Recent signups</div>
          </div>
          
          <div className="admin-stat-card">
            <div className="stat-label">Pages Module</div>
            <div className="stat-value">0</div>
            <div className="stat-change positive">Coming in Phase 2</div>
          </div>
        </div>
      )}
      
      <div className="admin-card">
        <h2>Welcome to Devmart Admin Panel</h2>
        <p>
          Phase 1 authentication and user management is complete! You can now manage users and their roles.
        </p>
        <p className="text-muted">
          <strong>✅ Phase 1 Complete:</strong> Authentication, user roles, and admin UI foundation<br />
          <strong>🚀 Phase 2 Ready:</strong> Pages Module with dynamic page builder<br />
          <strong>📋 Future Phases:</strong> Content modules (Blog, Portfolio, Services, Forms, etc.)
        </p>
      </div>
    </BackendLayout>
  );
}
