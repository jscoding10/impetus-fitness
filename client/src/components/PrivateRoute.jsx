import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

// Private route
export default function PrivateRoute() {
  // Current user from Redux
  const { currentUser } = useSelector((state) => state.user);
  // Redirect to sign in if try to access something in private route only authenticated user should see
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}  