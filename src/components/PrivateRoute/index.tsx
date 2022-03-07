import { Navigate, Outlet } from 'react-router-dom';
import { Props } from './types';

function PrivateRoute({ isAuth }: Props) {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
