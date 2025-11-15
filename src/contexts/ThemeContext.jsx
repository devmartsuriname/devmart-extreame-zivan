import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem('devmart-theme');
    console.log('🎨 Initial theme from localStorage:', stored);
    if (stored) return stored;
    
    // Fallback to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('🎨 System preference - prefers dark:', prefersDark);
    if (prefersDark) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    console.log('🎨 Theme changed to:', theme);
    localStorage.setItem('devmart-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log('🎨 Toggle theme called - current theme:', theme);
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      console.log('🎨 New theme will be:', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
