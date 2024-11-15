import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('userData')) || null
  );

  const checkUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        setUserData(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
      } else {
        setUserData(null);
        localStorage.removeItem('userData');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setUserData(null);
      localStorage.removeItem('userData');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, null, {
        withCredentials: true,
      });
      setUserData(null);
      localStorage.removeItem('userData');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    if (userData) {
      checkUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, checkUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
