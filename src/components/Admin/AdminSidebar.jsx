import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const navItems = [
  { label: 'Dashboard', icon: 'mdi:view-dashboard', path: '/admin/dashboard' },
  { label: 'Pages', icon: 'mdi:file-document', path: '/admin/pages' },
  { label: 'Blog', icon: 'mdi:post', path: '/admin/blog' },
  { label: 'Portfolio', icon: 'mdi:briefcase', path: '/admin/portfolio' },
  { label: 'Services', icon: 'mdi:cog-outline', path: '/admin/services' },
  { label: 'Team', icon: 'mdi:account-group', path: '/admin/team' },
  { label: 'FAQs', icon: 'mdi:help-circle', path: '/admin/faqs' },
  { label: 'Media', icon: 'mdi:image-multiple', path: '/admin/media' },
  { label: 'Navigation', icon: 'mdi:menu', path: '/admin/navigation' },
  { label: 'Settings', icon: 'mdi:cog', path: '/admin/settings' },
  { label: 'Forms', icon: 'mdi:email-outline', path: '/admin/forms' },
  { label: 'Users', icon: 'mdi:account-multiple', path: '/admin/users', adminOnly: true },
];

export default function AdminSidebar({ isOpen, onClose }) {
  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="admin-sidebar-logo">
        <NavLink to="/admin/dashboard" onClick={onClose}>
          Devmart
        </NavLink>
      </div>
      
      <nav className="admin-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `admin-nav-item ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <Icon icon={item.icon} className="icon" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="admin-sidebar-footer">
        Devmart Admin v1.0
      </div>
    </aside>
  );
}
