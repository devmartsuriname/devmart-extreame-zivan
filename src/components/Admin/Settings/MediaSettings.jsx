import { useState, useEffect } from 'react';
import { useSetting, useUpdateSetting } from '@/hooks/useSettings';
import MediaPicker from '@/components/Admin/Media/MediaPicker';

export default function MediaSettings() {
  const { data: media, isLoading } = useSetting('media');
  const updateSetting = useUpdateSetting();
  
  const [formData, setFormData] = useState({
    logo_light: '',
    logo_dark: '',
    favicon: '',
    og_default: ''
  });
  
  useEffect(() => {
    if (media) {
      setFormData({
        logo_light: media.logo_light || '',
        logo_dark: media.logo_dark || '',
        favicon: media.favicon || '',
        og_default: media.og_default || ''
      });
    }
  }, [media]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSetting.mutate({
      key: 'media',
      value: formData
    });
  };
  
  if (isLoading) {
    return <div className="settings-loading">Loading...</div>;
  }
  
  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="form-group">
        <MediaPicker
          label="Light Mode Logo"
          description="Logo displayed in light theme (recommended: SVG or PNG with transparent background)"
          value={formData.logo_light}
          onChange={(url) => setFormData({ ...formData, logo_light: url })}
          allowedTypes={['image']}
          maxFiles={1}
          folderFilter="logos"
          usageKey="settings:logo_light"
        />
      </div>
      
      <div className="form-group">
        <MediaPicker
          label="Dark Mode Logo"
          description="Logo displayed in dark theme (recommended: SVG or PNG with transparent background)"
          value={formData.logo_dark}
          onChange={(url) => setFormData({ ...formData, logo_dark: url })}
          allowedTypes={['image']}
          maxFiles={1}
          folderFilter="logos"
          usageKey="settings:logo_dark"
        />
      </div>
      
      <div className="form-group">
        <MediaPicker
          label="Favicon"
          description="Small icon displayed in browser tabs (recommended: 32x32 or 64x64 PNG/ICO)"
          value={formData.favicon}
          onChange={(url) => setFormData({ ...formData, favicon: url })}
          allowedTypes={['image']}
          maxFiles={1}
          folderFilter="logos"
          usageKey="settings:favicon"
        />
      </div>
      
      <div className="form-group">
        <MediaPicker
          label="Default Open Graph Image"
          description="Default image for social media sharing when no page-specific image is set (recommended: 1200x630 PNG/JPG)"
          value={formData.og_default}
          onChange={(url) => setFormData({ ...formData, og_default: url })}
          allowedTypes={['image']}
          maxFiles={1}
          folderFilter="logos"
          usageKey="settings:og_default"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={updateSetting.isPending}>
          {updateSetting.isPending ? 'Saving...' : 'Save Media Settings'}
        </button>
      </div>
    </form>
  );
}
