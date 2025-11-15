import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useTheme } from '../../contexts/ThemeContext';

export default function Layout3() {
  const { theme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'cs_dark' : ''}>
      <Header
        logoUrl={theme === 'dark' ? '/images/logo_white.svg' : '/images/logo.svg'}
        cart
        actionBtnText="Getting Started"
        actionBtnUrl="/contact"
      />
      <Outlet />
      <Footer />
    </div>
  );
}
