import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useReduxSelector } from '../hooks/useReduxSelector';
import ChannelPage from '../pages/channelPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from '../components/PrivateRoute';
import { auth } from '../utils/firebase';

import { isInfo } from '../store/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { useReduxDispatch } from '../hooks/useReduxDispath';

export default function MainRoutes() {
  const dispatch = useReduxDispatch();
  const { isAuth } = useReduxSelector(state => state.user);

  // useEffect(() => {
  //   onAuthStateChanged(auth, user => {
  //     if (user) {
  //       const userId = user.uid;
  //       const userEmail = user.email;
  //       dispatch(isInfo({ id: userId, email: userEmail }));
  //     }
  //   });
  // }, [auth]);

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
