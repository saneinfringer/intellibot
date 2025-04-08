import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
      localStorage.removeItem('user'); // Clean up corrupted value
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <div className="text-xl font-semibold">🧠 IntelliBot</div>
      <div className="flex gap-4">
        {!user && (
          <>
            <Link to="/" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}
        {user?.role === 'user' && (
          <Link to="/chatbot" className="hover:text-gray-300">Chatbot</Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className="hover:text-gray-300">Admin</Link>
        )}
        {user && (
          <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
