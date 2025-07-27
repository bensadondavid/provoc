import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthCheck() {
  const navigate = useNavigate();
  const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000';

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${urlBack}/users/protected`, {
          method: 'GET',
          credentials: 'include'
        });
        if (!res.ok) {
          return navigate('/login');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        navigate('/login');
      }
    };

    check();
  }, [navigate, urlBack]);
}