import { useState, useEffect } from 'react';
import { useSetting, useUpdateSetting } from '@/hooks/useSettings';
import { applyBrandingToCSS } from '@/utils/brandingInjection';

export default function BrandingSettings() {
  const { data: branding, isLoading } = useSetting('branding');
  const updateSetting = useUpdateSetting();
  
  const [formData, setFormData] = useState({
    primary: '#121212',
    secondary: '#4f4747',
    accent: '#fd6219'
  });
  
  useEffect(() => {
    if (branding) {
      setFormData({
        primary: branding.primary || '#121212',
        secondary: branding.secondary || '#4f4747',
        accent: branding.accent || '#fd6219'
      });
    }
  }, [branding]);
  
  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    
    // Live preview
    applyBrandingToCSS(updated);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSetting.mutate({
      key: 'branding',
      value: formData
    });
  };
  
  const handleReset = () => {
    const defaults = {
      primary: '#121212',
      secondary: '#4f4747',
      accent: '#fd6219'
    };
    setFormData(defaults);
    applyBrandingToCSS(defaults);
  };
  
  if (isLoading) {
    return <div className="settings-loading">Loading...</div>;
  }
  
  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="branding-notice">
        <p>Changes preview in real-time. Click "Save" to persist.</p>
      </div>
      
      <div className="form-group">
        <label htmlFor="primary">
          Primary Color <span className="required">*</span>
        </label>
        <div className="color-input-group">
          <input
            type="color"
            id="primary"
            value={formData.primary}
            onChange={(e) => handleChange('primary', e.target.value)}
          />
          <input
            type="text"
            value={formData.primary}
            onChange={(e) => handleChange('primary', e.target.value)}
            pattern="^#[0-9A-Fa-f]{6}$"
            placeholder="#121212"
          />
        </div>
        <p className="form-help">Main brand color used throughout the admin interface</p>
      </div>
      
      <div className="form-group">
        <label htmlFor="secondary">Secondary Color</label>
        <div className="color-input-group">
          <input
            type="color"
            id="secondary"
            value={formData.secondary}
            onChange={(e) => handleChange('secondary', e.target.value)}
          />
          <input
            type="text"
            value={formData.secondary}
            onChange={(e) => handleChange('secondary', e.target.value)}
            pattern="^#[0-9A-Fa-f]{6}$"
            placeholder="#4f4747"
          />
        </div>
        <p className="form-help">Supporting color for secondary elements</p>
      </div>
      
      <div className="form-group">
        <label htmlFor="accent">Accent Color</label>
        <div className="color-input-group">
          <input
            type="color"
            id="accent"
            value={formData.accent}
            onChange={(e) => handleChange('accent', e.target.value)}
          />
          <input
            type="text"
            value={formData.accent}
            onChange={(e) => handleChange('accent', e.target.value)}
            pattern="^#[0-9A-Fa-f]{6}$"
            placeholder="#fd6219"
          />
        </div>
        <p className="form-help">Highlight color for call-to-action elements</p>
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Reset to Defaults
        </button>
        <button type="submit" className="btn btn-primary" disabled={updateSetting.isPending}>
          {updateSetting.isPending ? 'Saving...' : 'Save Branding'}
        </button>
      </div>
    </form>
  );
}
