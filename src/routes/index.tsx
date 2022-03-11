import { Routes, Route } from 'react-router-dom';
import { useReduxSelector } from '../hooks/useReduxSelector';
import ChannelPage from '../pages/channelPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from '../components/PrivateRoute';

export default function MainRoutes() {
  const { isAuth } = useReduxSelector(state => state.user);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastrar" element={<RegisterPage />} />

      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={<ChannelPage />} />
      </Route>
    </Routes>
  );
}
