import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const FocusManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Reset focus to top of page on route change
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};
