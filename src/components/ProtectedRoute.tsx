
import { useAuth, UserType } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: UserType[];
}

export function ProtectedRoute({ children, allowedTypes }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedTypes && user && !allowedTypes.includes(user.type)) {
    // Redirect to appropriate dashboard based on user type
    switch (user.type) {
      case 'admin':
        return <Navigate to="/dashboard-admin" replace />;
      case 'proprietario':
        return <Navigate to="/dashboard-proprietario" replace />;
      case 'visitante':
        return <Navigate to="/dashboard-visitante" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}
