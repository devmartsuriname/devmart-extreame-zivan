import { useState, useEffect } from 'react';
import { useSetting, useUpdateSetting } from '@/hooks/useSettings';

export default function IdentitySettings() {
  const { data: identity, isLoading } = useSetting('site_identity');
  const updateSetting = useUpdateSetting();
  
  const [formData, setFormData] = useState({
    site_name: '',
    site_description: ''
  });
  
  useEffect(() => {
    if (identity) {
      setFormData({
        site_name: identity.site_name || '',
        site_description: identity.site_description || ''
      });
    }
  }, [identity]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateSetting.mutate({
      key: 'site_identity',
      value: formData
    });
  };
  
  if (isLoading) {
    return <div className="settings-loading">Loading...</div>;
  }
  
  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="form-group">
        <label htmlFor="site_name">
          Site Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="site_name"
          value={formData.site_name}
          onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
          required
          placeholder="Enter your site name"
        />
        <p className="form-help">This name will appear in the browser tab and search results</p>
      </div>
      
      <div className="form-group">
        <label htmlFor="site_description">Site Description</label>
        <textarea
          id="site_description"
          value={formData.site_description}
          onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
          rows={4}
          placeholder="Enter a brief description of your site"
        />
        <p className="form-help">Used for SEO meta descriptions</p>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={updateSetting.isPending}>
          {updateSetting.isPending ? 'Saving...' : 'Save Identity Settings'}
        </button>
      </div>
    </form>
  );
}
