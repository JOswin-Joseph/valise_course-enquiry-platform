import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../common/Loader';

/**
 * ProtectedRoute component guards routes based on authentication and role
 * Redirects unauthenticated users to login
 * Redirects users with wrong role to their respective dashboard
 */
const ProtectedRoute = ({ children, requireRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if specific role is required
  if (requireRole && user?.role !== requireRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
