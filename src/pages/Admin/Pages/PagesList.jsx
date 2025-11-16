import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';

export default function PagesList() {
  const navigate = useNavigate();
  const { user, isAdmin, isSuperAdmin } = useAuth();
  
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Pages', path: null }
  ];
  
  const pagesPerPage = 10;
  
  const canCreate = isAdmin() || isSuperAdmin();
  const canEdit = isAdmin() || isSuperAdmin();
  const canDelete = isSuperAdmin();
  const canDuplicate = isAdmin() || isSuperAdmin();
  
  useEffect(() => {
    fetchPages();
  }, []);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);
  
  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredPages = pages.filter(page => {
    const matchesSearch = 
      page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || page.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const indexOfLastPage = currentPage * pagesPerPage;
  const indexOfFirstPage = indexOfLastPage - pagesPerPage;
  const currentPages = filteredPages.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(filteredPages.length / pagesPerPage);
  
  const handleCreatePage = () => {
    navigate('/admin/pages/new');
  };
  
  const handleEditPage = (pageId) => {
    navigate(`/admin/pages/${pageId}/edit`);
  };
  
  const handleDuplicatePage = async (page) => {
    try {
      const { data: newPage, error: pageError } = await supabase
        .from('pages')
        .insert({
          title: `${page.title} (Copy)`,
          slug: `${page.slug}-copy-${Date.now()}`,
          meta_description: page.meta_description,
          meta_keywords: page.meta_keywords,
          seo_image: page.seo_image,
          layout: page.layout,
          status: 'draft',
          created_by: user.id
        })
        .select()
        .single();
      
      if (pageError) throw pageError;
      
      const { data: sections } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', page.id);
      
      if (sections && sections.length > 0) {
        const newSections = sections.map(section => ({
          page_id: newPage.id,
          block_type: section.block_type,
          block_props: section.block_props,
          order_index: section.order_index,
          is_active: section.is_active
        }));
        
        await supabase.from('page_sections').insert(newSections);
      }
      
      fetchPages();
    } catch (error) {
      console.error('Error duplicating page:', error);
    }
  };
  
  const handleDeletePage = async () => {
    if (!selectedPage) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({ status: 'archived' })
        .eq('id', selectedPage.id);
      
      if (error) throw error;
      
      fetchPages();
      setDeleteModal(false);
      setSelectedPage(null);
    } catch (error) {
      console.error('Error deleting page:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const confirmDelete = (page) => {
    setSelectedPage(page);
    setDeleteModal(true);
  };
  
  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { class: 'badge-muted', icon: 'mdi:file-document-outline', label: 'Draft' },
      published: { class: 'badge-accent', icon: 'mdi:check-circle', label: 'Published' },
      archived: { class: 'badge-primary', icon: 'mdi:archive', label: 'Archived' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <span className={`badge ${config.class}`}>
        <Icon icon={config.icon} className="icon" />
        {config.label}
      </span>
    );
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };
  
  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Pages</h1>
        {canCreate && (
          <button className="btn btn-primary" onClick={handleCreatePage}>
            <Icon icon="mdi:plus" className="icon" />
            Create New Page
          </button>
        )}
      </div>
      
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-search">
            <Icon icon="mdi:magnify" className="icon" />
            <input
              type="text"
              placeholder="Search by title or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="admin-filters">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        
        {isLoading && (
          <div className="admin-loading-inline">
            <div className="spinner"></div>
            <p>Loading pages...</p>
          </div>
        )}
        
        {!isLoading && filteredPages.length === 0 && (
          <div className="admin-empty-state">
            <Icon icon="mdi:file-document-outline" className="icon" />
            <h3>
              {searchQuery || statusFilter !== 'all' 
                ? 'No pages found' 
                : 'No pages yet'}
            </h3>
            <p>
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filter.'
                : 'Create your first dynamic page using the button above.'}
            </p>
            {!searchQuery && statusFilter === 'all' && canCreate && (
              <button className="btn btn-primary" onClick={handleCreatePage}>
                <Icon icon="mdi:plus" className="icon" />
                Create New Page
              </button>
            )}
          </div>
        )}
        
        {!isLoading && currentPages.length > 0 && (
          <>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Layout</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPages.map(page => (
                    <tr key={page.id}>
                      <td>
                        <strong>{page.title}</strong>
                      </td>
                      <td>
                        <code className="slug-code">/{page.slug}</code>
                      </td>
                      <td>{getStatusBadge(page.status)}</td>
                      <td>{page.layout || 'Layout'}</td>
                      <td>{formatDate(page.updated_at)}</td>
                      <td>
                        <div className="admin-actions">
                          {canEdit && (
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => handleEditPage(page.id)}
                              title="Edit"
                            >
                              <Icon icon="mdi:pencil" />
                            </button>
                          )}
                          {canDuplicate && (
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => handleDuplicatePage(page)}
                              title="Duplicate"
                            >
                              <Icon icon="mdi:content-copy" />
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => confirmDelete(page)}
                              title="Delete"
                            >
                              <Icon icon="mdi:delete" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredPages.length > pagesPerPage && (
              <div className="admin-pagination">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <Icon icon="mdi:chevron-left" />
                  Previous
                </button>
                
                <div className="pagination-info">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <Icon icon="mdi:chevron-right" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {deleteModal && (
        <>
          <div className="admin-modal-overlay" onClick={() => setDeleteModal(false)} />
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>Confirm Delete</h2>
              <button 
                className="admin-modal-close"
                onClick={() => setDeleteModal(false)}
              >
                <Icon icon="mdi:close" className="icon" />
              </button>
            </div>
            <div className="admin-modal-body">
              <p>
                Are you sure you want to archive the page 
                <strong> "{selectedPage?.title}"</strong>?
              </p>
              <p className="text-muted">
                This will change the status to "archived" and hide it from public view.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleDeletePage}
                disabled={isDeleting}
              >
                {isDeleting ? 'Archiving...' : 'Archive Page'}
              </button>
            </div>
          </div>
        </>
      )}
    </BackendLayout>
  );
}
