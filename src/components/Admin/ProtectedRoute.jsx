import { Outlet } from 'react-router-dom';

// Placeholder component - authentication logic will be added in Phase 4
export default function ProtectedRoute() {
  // TODO: Phase 4 - Add authentication check
  // TODO: Phase 4 - Check user roles if requiredRole prop is provided
  // TODO: Phase 4 - Redirect to /admin/auth/login if not authenticated
  
  return <Outlet />;
}
