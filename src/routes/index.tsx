import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChannelPage from '../pages/channelPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChannelPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
