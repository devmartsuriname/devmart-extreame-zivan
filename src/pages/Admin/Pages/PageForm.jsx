import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import BlockSelector from '@/components/Admin/Pages/BlockSelector';
import PageCanvas from '@/components/Admin/Pages/PageCanvas';
import PropsEditor from '@/components/Admin/Pages/PropsEditor';

const pageSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
    .refine(val => !val.startsWith('-') && !val.endsWith('-'), 'Slug cannot start or end with a hyphen'),
  meta_description: z.string().max(500, 'Meta description must be less than 500 characters').optional(),
  meta_keywords: z.string().max(500, 'Meta keywords must be less than 500 characters').optional(),
  seo_image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  layout: z.enum(['Layout', 'Layout2', 'Layout3']),
  status: z.enum(['draft', 'published', 'archived'])
});

export default function PageForm({ mode = 'create' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    meta_description: '',
    meta_keywords: '',
    seo_image: '',
    layout: 'Layout',
    status: 'draft'
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [slugTouched, setSlugTouched] = useState(false);
  
  // Page Builder states
  const [activeTab, setActiveTab] = useState('basic');
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [showPropsEditor, setShowPropsEditor] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [canvasKey, setCanvasKey] = useState(0);

  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Pages', path: '/admin/pages' },
    { label: mode === 'create' ? 'Create Page' : 'Edit Page', path: null }
  ];

  useEffect(() => {
    if (mode === 'edit' && id) {
      fetchPageData();
    }
  }, [id, mode]);

  useEffect(() => {
    if (!slugTouched && formData.title && mode === 'create') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }));
    }
  }, [formData.title, slugTouched, mode]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 200);
  };

  const fetchPageData = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      setFormData({
        title: data.title,
        slug: data.slug,
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords || '',
        seo_image: data.seo_image || '',
        layout: data.layout || 'Layout',
        status: data.status
      });
      setSlugTouched(true);
    } catch (err) {
      toast.error('Failed to load page');
      navigate('/admin/pages');
    } finally {
      setIsLoading(false);
    }
  };

  const checkSlugUniqueness = async (slug) => {
    const { data, error } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', slug);
    
    if (error) throw error;
    
    if (mode === 'edit' && data.length === 1 && data[0].id === id) {
      return true;
    }
    
    return data.length === 0;
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setErrors({});
      
      const validated = pageSchema.parse(formData);
      
      const isUnique = await checkSlugUniqueness(validated.slug);
      if (!isUnique) {
        setErrors({ slug: 'This slug is already in use' });
        setIsSaving(false);
        return;
      }
      
      if (mode === 'create') {
        const { data, error } = await supabase
          .from('pages')
          .insert({
            ...validated,
            created_by: user.id
          })
          .select()
          .single();
        
        if (error) throw error;
        
        toast.success('Page created successfully!');
        navigate(`/admin/pages/${data.id}/edit`);
      } else {
        const { error } = await supabase
          .from('pages')
          .update(validated)
          .eq('id', id);
        
        if (error) throw error;
        
        toast.success('Page updated successfully!');
      }
      
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach(error => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error('Failed to save page');
        console.error('Save error:', err);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <BackendLayout breadcrumbs={breadcrumbs}>
        <div className="admin-loading">
          <div className="spinner" />
          <p>Loading page...</p>
        </div>
      </BackendLayout>
    );
  }

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/admin/pages')}
            style={{ marginBottom: '12px' }}
          >
            <Icon icon="mdi:arrow-left" />
            Back to Pages
          </button>
          <h1>{mode === 'create' ? 'Create New Page' : 'Edit Page'}</h1>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-form">
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              value={formData.title}
              onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
              placeholder="Enter page title"
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          {/* Slug Field */}
          <div className="form-group">
            <label htmlFor="slug">
              URL Slug <span className="required">*</span>
            </label>
            <div className="slug-preview">/{formData.slug || 'your-page-slug'}</div>
            <input
              type="text"
              id="slug"
              className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
              value={formData.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setFormData(prev => ({...prev, slug: e.target.value}));
              }}
              placeholder="page-slug"
            />
            {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
            <small className="form-text">
              Auto-generated from title. Only lowercase, numbers, and hyphens allowed.
            </small>
          </div>

          {/* Meta Description */}
          <div className="form-group">
            <label htmlFor="meta_description">Meta Description</label>
            <textarea
              id="meta_description"
              className="form-control"
              rows="3"
              value={formData.meta_description}
              onChange={(e) => setFormData(prev => ({...prev, meta_description: e.target.value}))}
              placeholder="Brief description for search engines (recommended 150-160 characters)"
              maxLength="500"
            />
            <small className="form-text">
              {formData.meta_description.length}/500 characters
            </small>
          </div>

          {/* Meta Keywords */}
          <div className="form-group">
            <label htmlFor="meta_keywords">Meta Keywords</label>
            <input
              type="text"
              id="meta_keywords"
              className="form-control"
              value={formData.meta_keywords}
              onChange={(e) => setFormData(prev => ({...prev, meta_keywords: e.target.value}))}
              placeholder="keyword1, keyword2, keyword3"
            />
            <small className="form-text">
              Comma-separated keywords for SEO
            </small>
          </div>

          {/* SEO Image */}
          <div className="form-group">
            <label htmlFor="seo_image">SEO Image URL</label>
            <input
              type="url"
              id="seo_image"
              className={`form-control ${errors.seo_image ? 'is-invalid' : ''}`}
              value={formData.seo_image}
              onChange={(e) => setFormData(prev => ({...prev, seo_image: e.target.value}))}
              placeholder="https://example.com/image.jpg"
            />
            {errors.seo_image && <div className="invalid-feedback">{errors.seo_image}</div>}
            <small className="form-text">
              Open Graph image for social sharing
            </small>
          </div>

          {/* Layout Selector */}
          <div className="form-group">
            <label htmlFor="layout">Layout</label>
            <select
              id="layout"
              className="form-control"
              value={formData.layout}
              onChange={(e) => setFormData(prev => ({...prev, layout: e.target.value}))}
            >
              <option value="Layout">Layout (Default)</option>
              <option value="Layout2">Layout 2</option>
              <option value="Layout3">Layout 3</option>
            </select>
            <small className="form-text">
              Choose the layout wrapper for this page
            </small>
          </div>

          {/* Status Toggle */}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <div className="status-toggle">
              <label className="status-option">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={(e) => setFormData(prev => ({...prev, status: e.target.value}))}
                />
                <span className="status-label">
                  <Icon icon="mdi:file-document-outline" />
                  Draft
                </span>
              </label>
              <label className="status-option">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={(e) => setFormData(prev => ({...prev, status: e.target.value}))}
                />
                <span className="status-label">
                  <Icon icon="mdi:check-circle" />
                  Published
                </span>
              </label>
            </div>
            <small className="form-text">
              Draft pages are only visible to admins
            </small>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/admin/pages')}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="spinner-sm" />
                  Saving...
                </>
              ) : (
                <>
                  <Icon icon="mdi:content-save" />
                  {mode === 'create' ? 'Create Page' : 'Save Changes'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </BackendLayout>
  );
}
