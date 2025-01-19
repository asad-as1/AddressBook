import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookie from 'cookies-js';
import axios from 'axios';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const user = Cookie.get('user'); 
  // console.log(user)
  const BACKEND_URL = import.meta.env.VITE_URL;
  
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}user/profile`, {"token":user})
        // console.log(response)
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.error('Error during authentication check:', error);
        setIsAuthenticated(false);
      }
    };

    if (user) {
      checkAuth();
    } else {
      setIsAuthenticated(false);
    }
  }, [user, BACKEND_URL]);

  if (isAuthenticated === null) {
    const loadingStyle = {
      textAlign: 'center',
      margin: '16px',
      fontSize: '1.25rem',
    };

    return <div style={loadingStyle}>Loading...</div>;
  }

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
