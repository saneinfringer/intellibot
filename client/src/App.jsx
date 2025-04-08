import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Chatbot from './pages/Chatbot';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Add both "/" and "/login" paths for Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/chatbot"
          element={
            <PrivateRoute role="user">
              <Chatbot />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <Admin />
            </PrivateRoute>
          }
        />

        {/* Optional fallback for unmatched routes */}
        <Route path="*" element={<h1 className="text-center mt-10 text-red-500">404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
