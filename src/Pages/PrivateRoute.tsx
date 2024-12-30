import { useEffect } from 'react';
import { getAuthToken, isAuthenticated } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    
    if (!token) {
      window.location.replace("http://localhost:5173/login");
    }
  }, [navigate]);
  return isAuthenticated() ? children : null;
};

export default PrivateRoute;