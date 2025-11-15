import { useState } from 'react';
import { Icon } from '@iconify/react';
import AdminBreadcrumbs from './AdminBreadcrumbs';

export default function AdminTopBar({ breadcrumbs = [], onMenuClick }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    // TODO: Implement logout in Phase 4
    console.log('Logout clicked - to be implemented in Phase 4');
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
          onClick={() => document.body.classList.toggle('cs_dark')}
          title="Toggle theme"
        >
          <Icon icon="mdi:theme-light-dark" className="icon" />
        </button>
        
        <div className="admin-user-menu">
          <button 
            className="admin-user-btn" 
            onClick={toggleUserMenu}
            aria-label="User menu"
          >
            <Icon icon="mdi:account-circle" className="icon" />
            <span className="user-name">Admin User</span>
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
