import Cookies from 'js-cookie';

export const getAuthToken = (): string | null => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');

    if (urlToken) {
      Cookies.set('auth_token', urlToken, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        domain: window.location.hostname,
        path: '/'
      });
      localStorage.setItem('token', urlToken);
      window.history.replaceState({}, document.title, window.location.pathname);
      return urlToken;
    }

    const cookieToken = Cookies.get('auth_token');
    const localToken = localStorage.getItem('token');
    return cookieToken || localToken || null;
  } catch (error) {
    console.error('Auth token error:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const getUserInfo = () => {
  const userInfo = Cookies.get('user_info');
  return userInfo ? JSON.parse(userInfo) : null;
};

export const logout = () => {
  Cookies.remove('auth_token', { path: '/' });
  Cookies.remove('user_info', { path: '/' });
  window.location.href = process.env.REACT_APP_LOGIN_URL || 'https://erc-remys-projects-e871eb29.vercel.app/login';
};