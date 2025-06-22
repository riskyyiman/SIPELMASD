import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // "admin", "petugas", "user", etc.

  if (!token) {
    return <Navigate to="/signin" />;
  }

  if (!allowedRoles.includes(role || '')) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
