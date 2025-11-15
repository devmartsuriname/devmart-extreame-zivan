import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useTheme } from '../../contexts/ThemeContext';

export default function Layout2() {
  const { theme } = useTheme();
  console.log('🏗️ Layout2 rendering with theme:', theme);
  
  return (
    <div className={theme === 'dark' ? 'cs_dark' : ''}>
      <Header
        logoUrl={theme === 'dark' ? '/images/logo_white.svg' : '/images/logo.svg'}
        colorVariant="cs_color_1"
        actionBtnText="Getting Started"
        actionBtnUrl="/contact"
      />
      <Outlet />
      <Footer />
    </div>
  );
}
