import { useEffect } from 'react';

export default function Logout() {
  useEffect(() => {
    localStorage.clear();
    window.location.href = '/';
  }, []);

  return null;
}
