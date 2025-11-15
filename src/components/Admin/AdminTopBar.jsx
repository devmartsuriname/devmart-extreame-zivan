import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import AdminBreadcrumbs from './AdminBreadcrumbs';

export default function AdminTopBar({ breadcrumbs = [], onMenuClick }) {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/auth/login');
  };

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button 
          className="admin-menu-btn" 
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Icon icon="mdi:menu" />
        </button>
        
        {breadcrumbs.length > 0 && (
          <AdminBreadcrumbs breadcrumbs={breadcrumbs} />
        )}
      </div>
      
      <div className="admin-topbar-right">
        <button 
          className="btn btn-secondary"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          <Icon 
            icon={theme === 'dark' ? 'mdi:white-balance-sunny' : 'mdi:weather-night'} 
            className="icon" 
          />
        </button>
        
        <div className="admin-user-menu">
          <button 
            className="admin-user-btn" 
            onClick={toggleUserMenu}
            aria-label="User menu"
          >
            {profile?.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt={profile.full_name || 'User'} 
                className="user-avatar"
              />
            ) : (
              <Icon icon="mdi:account-circle" className="icon" />
            )}
            <span className="user-name">
              {profile?.full_name || profile?.email || 'User'}
            </span>
            <Icon icon="mdi:chevron-down" />
          </button>
          
          {userMenuOpen && (
            <>
              <div 
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999
                }}
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="admin-user-dropdown">
                <button onClick={handleLogout}>
                  <Icon icon="mdi:logout" className="icon" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
