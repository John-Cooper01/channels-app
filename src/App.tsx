import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes';
import MainAppBar from './components/AppBar';

function App() {
  return (
    <Router>
      <MainAppBar />
      <MainRoutes />
    </Router>
  );
}

export default App;
