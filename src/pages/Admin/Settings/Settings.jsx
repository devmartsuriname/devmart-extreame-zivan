import { useState } from 'react';
import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';
import IdentitySettings from '@/components/Admin/Settings/IdentitySettings';
import BrandingSettings from '@/components/Admin/Settings/BrandingSettings';
import MediaSettings from '@/components/Admin/Settings/MediaSettings';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('identity');
  
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Settings', path: null }
  ];
  
  const tabs = [
    { id: 'identity', label: 'Site Identity', icon: 'mdi:information-outline' },
    { id: 'branding', label: 'Branding', icon: 'mdi:palette-outline' },
    { id: 'media', label: 'Logos & Media', icon: 'mdi:image-outline' }
  ];
  
  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Settings</h1>
        <p>Manage your site identity, branding, and media assets</p>
      </div>
      
      <div className="admin-card">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="settings-content">
          {activeTab === 'identity' && <IdentitySettings />}
          {activeTab === 'branding' && <BrandingSettings />}
          {activeTab === 'media' && <MediaSettings />}
        </div>
      </div>
    </BackendLayout>
  );
}
