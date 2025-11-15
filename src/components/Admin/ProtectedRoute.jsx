import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Icon } from '@iconify/react';

export default function ProtectedRoute({ requiredRole = null }) {
  const { isAuthenticated, isLoading, hasRole, isSuperAdmin } = useAuth();
  const location = useLocation();

  // Show loading during auth check
  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/auth/login" state={{ from: location }} replace />;
  }

  // Check role if required
  if (requiredRole) {
    // Super admins bypass all role checks
    if (!isSuperAdmin() && !hasRole(requiredRole)) {
      return (
        <div className="admin-unauthorized">
          <Icon icon="mdi:lock" className="icon" />
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <Link to="/admin/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      );
    }
  }

  return <Outlet />;
}
