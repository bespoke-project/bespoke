import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const checkUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.id) {
        setIsLoggedIn(true);
        setUserData(response.data);
        console.log('User data with favorites:', response.data);
      } else {
        setIsLoggedIn(false);
        setUserData({});
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      setIsLoggedIn(false);
      setUserData({});
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      checkUser();
    }
  }, []);

  const values = {
    isLoggedIn,
    userData,
    setIsLoggedIn,
    setUserData,
    checkUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
