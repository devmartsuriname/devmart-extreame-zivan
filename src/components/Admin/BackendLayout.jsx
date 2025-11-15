import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

export default function BackendLayout({ children, breadcrumbs = [] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className="admin-main">
        <AdminTopBar 
          breadcrumbs={breadcrumbs} 
          onMenuClick={toggleSidebar}
        />
        
        <div className="admin-content">
          {children}
        </div>
      </div>
      
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}
    </div>
  );
}
