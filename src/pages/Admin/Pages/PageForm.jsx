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
import { Button } from '@/components/ui/button';
import BlockSelector from '@/components/Admin/Pages/BlockSelector';
import PageCanvas from '@/components/Admin/Pages/PageCanvas';
import PropsEditor from '@/components/Admin/Pages/PropsEditor';

const pageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().min(1, 'Slug is required').max(200, 'Slug must be less than 200 characters')
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
    title: '', slug: '', meta_description: '', meta_keywords: '', seo_image: '', layout: 'Layout', status: 'draft'
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [slugTouched, setSlugTouched] = useState(false);
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

  useEffect(() => { if (mode === 'edit' && id) fetchPageData(); }, [id, mode]);
  useEffect(() => {
    if (!slugTouched && formData.title && mode === 'create') {
      setFormData(prev => ({ ...prev, slug: formData.title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').substring(0, 200) }));
    }
  }, [formData.title, slugTouched, mode]);

  const fetchPageData = async () => {
    try {
      const { data, error } = await supabase.from('pages').select('*').eq('id', id).single();
      if (error) throw error;
      setFormData({ title: data.title, slug: data.slug, meta_description: data.meta_description || '', meta_keywords: data.meta_keywords || '', seo_image: data.seo_image || '', layout: data.layout || 'Layout', status: data.status });
      setSlugTouched(true);
    } catch (err) { toast.error('Failed to load page'); navigate('/admin/pages'); } finally { setIsLoading(false); }
  };

  const checkSlugUniqueness = async (slug) => {
    const { data, error } = await supabase.from('pages').select('id').eq('slug', slug);
    if (error) throw error;
    if (mode === 'edit' && data.length === 1 && data[0].id === id) return true;
    return data.length === 0;
  };

  const handleSave = async () => {
    try {
      setIsSaving(true); setErrors({});
      const validated = pageSchema.parse(formData);
      const isUnique = await checkSlugUniqueness(validated.slug);
      if (!isUnique) { setErrors({ slug: 'This slug is already in use' }); setIsSaving(false); return; }
      
      if (mode === 'create') {
        const { data, error } = await supabase.from('pages').insert({ ...validated, created_by: user.id }).select().single();
        if (error) throw error;
        toast.success('Page created successfully!');
        navigate(`/admin/pages/${data.id}/edit`);
        return;
      } else {
        const { error } = await supabase.from('pages').update(validated).eq('id', id);
        if (error) throw error;
        toast.success('Page updated successfully!');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach(error => { fieldErrors[error.path[0]] = error.message; });
        setErrors(fieldErrors);
      } else { toast.error('Failed to save page'); }
    } finally { setIsSaving(false); }
  };

  const handleBlockAdded = () => { setCanvasKey(prev => prev + 1); setShowBlockSelector(false); };
  const handleEditSection = (section) => { setSelectedSection(section); setShowPropsEditor(true); };
  const handleSectionSaved = () => { setCanvasKey(prev => prev + 1); setShowPropsEditor(false); setSelectedSection(null); };
  const handlePreview = () => id ? window.open(`/${formData.slug}?preview=true`, '_blank') : toast.error('Save the page first');

  if (isLoading) return <BackendLayout breadcrumbs={breadcrumbs}><div className="admin-loading"><div className="spinner" /><p>Loading...</p></div></BackendLayout>;

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <div>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/admin/pages')} style={{marginBottom:'12px'}}>
            <Icon icon="mdi:arrow-left" />Back to Pages
          </button>
          <h1>{mode === 'create' ? 'Create New Page' : 'Edit Page'}</h1>
        </div>
      </div>

      <div className="admin-card">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
            <TabsList>
              <TabsTrigger value="basic"><Icon icon="mdi:information-outline" className="w-4 h-4 mr-2" />Basic Info</TabsTrigger>
              <TabsTrigger value="content" disabled={!id}><Icon icon="mdi:view-dashboard-outline" className="w-4 h-4 mr-2" />Content Builder</TabsTrigger>
            </TabsList>
            {mode === 'edit' && <Button onClick={handlePreview} variant="outline"><Icon icon="mdi:eye-outline" className="w-4 h-4 mr-2" />Preview</Button>}
          </div>

          <TabsContent value="basic">
            <div className="admin-form">
              <div className="form-group">
                <label htmlFor="title">Title <span className="required">*</span></label>
                <input type="text" id="title" className={`form-control ${errors.title?'is-invalid':''}`} value={formData.title} onChange={(e)=>setFormData(p=>({...p,title:e.target.value}))} placeholder="Enter page title" />
                {errors.title&&<div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="slug">URL Slug <span className="required">*</span></label>
                <div className="slug-preview">/{formData.slug||'your-page-slug'}</div>
                <input type="text" id="slug" className={`form-control ${errors.slug?'is-invalid':''}`} value={formData.slug} onChange={(e)=>{setSlugTouched(true);setFormData(p=>({...p,slug:e.target.value}))}} placeholder="page-slug" />
                {errors.slug&&<div className="invalid-feedback">{errors.slug}</div>}
                <small className="form-text">Auto-generated from title</small>
              </div>
              <div className="form-group">
                <label htmlFor="meta_description">Meta Description</label>
                <textarea id="meta_description" className={`form-control ${errors.meta_description?'is-invalid':''}`} value={formData.meta_description} onChange={(e)=>setFormData(p=>({...p,meta_description:e.target.value}))} rows="3" placeholder="Brief description" />
                {errors.meta_description&&<div className="invalid-feedback">{errors.meta_description}</div>}
                <small className="form-text">{formData.meta_description.length}/500</small>
              </div>
              <div className="form-group">
                <label htmlFor="meta_keywords">Meta Keywords</label>
                <input type="text" id="meta_keywords" className={`form-control ${errors.meta_keywords?'is-invalid':''}`} value={formData.meta_keywords} onChange={(e)=>setFormData(p=>({...p,meta_keywords:e.target.value}))} placeholder="keyword1, keyword2" />
                {errors.meta_keywords&&<div className="invalid-feedback">{errors.meta_keywords}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="seo_image">SEO Image URL</label>
                <input type="url" id="seo_image" className={`form-control ${errors.seo_image?'is-invalid':''}`} value={formData.seo_image} onChange={(e)=>setFormData(p=>({...p,seo_image:e.target.value}))} placeholder="https://..." />
                {errors.seo_image&&<div className="invalid-feedback">{errors.seo_image}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="layout">Layout Template <span className="required">*</span></label>
                <select id="layout" className={`form-control ${errors.layout?'is-invalid':''}`} value={formData.layout} onChange={(e)=>setFormData(p=>({...p,layout:e.target.value}))}>
                  <option value="Layout">Layout (Default)</option>
                  <option value="Layout2">Layout2</option>
                  <option value="Layout3">Layout3</option>
                </select>
                {errors.layout&&<div className="invalid-feedback">{errors.layout}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="status">Status <span className="required">*</span></label>
                <select id="status" className={`form-control ${errors.status?'is-invalid':''}`} value={formData.status} onChange={(e)=>setFormData(p=>({...p,status:e.target.value}))}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                {errors.status&&<div className="invalid-feedback">{errors.status}</div>}
              </div>
              <div className="form-actions" style={{marginTop:'24px'}}>
                <button type="button" className="btn btn-secondary" onClick={()=>navigate('/admin/pages')}><Icon icon="mdi:close" />Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                  {isSaving?<><Icon icon="mdi:loading" className="animate-spin" />Saving...</>:<><Icon icon="mdi:content-save" />{mode==='create'?'Create Page':'Save Changes'}</>}
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Page Sections</h3>
                  <p className="text-sm text-muted-foreground mt-1">Build your page by adding and arranging UI blocks</p>
                </div>
                <Button onClick={()=>setShowBlockSelector(true)}><Icon icon="mdi:plus" className="w-4 h-4 mr-2" />Add Section</Button>
              </div>
              <PageCanvas key={canvasKey} pageId={id} onEditSection={handleEditSection} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showBlockSelector} onOpenChange={setShowBlockSelector}>
        <DialogContent className="max-w-6xl h-[80vh] p-0">
          <BlockSelector pageId={id} onBlockAdded={handleBlockAdded} onClose={()=>setShowBlockSelector(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showPropsEditor} onOpenChange={setShowPropsEditor}>
        <DialogContent className="max-w-2xl h-[80vh] p-0">
          <PropsEditor section={selectedSection} onClose={()=>{setShowPropsEditor(false);setSelectedSection(null)}} onSave={handleSectionSaved} />
        </DialogContent>
      </Dialog>
    </BackendLayout>
  );
}
