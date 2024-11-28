import { useEffect } from 'react';
import { getAuthToken, isAuthenticated } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    
    if (!token) {
      window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
    }
  }, [navigate]);
  return isAuthenticated() ? children : null;
};

export default PrivateRoute;