import { useState } from 'react';
import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';
import { useMediaList, useMediaTags, useBulkDeleteMedia, useUpdateMedia } from '@/hooks/useMediaLibrary';
import MediaCard from '@/components/Admin/Media/MediaCard';
import MediaDetailModal from '@/components/Admin/Media/MediaDetailModal';
import UploadModal from '@/components/Admin/Media/UploadModal';
import FolderManager from '@/components/Admin/Media/FolderManager';
import { toast } from 'sonner';

export default function MediaLibrary() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [fileTypeFilter, setFileTypeFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [bulkMoveFolder, setBulkMoveFolder] = useState('');

  const itemsPerPage = 20;

  const { data: mediaResponse, isLoading, refetch } = useMediaList({
    search: searchTerm,
    folder: selectedFolder,
    tags: selectedTags,
    mimeType: fileTypeFilter,
    page: currentPage,
    limit: itemsPerPage
  });

  // Handle both old and new response format
  const mediaList = mediaResponse?.data || mediaResponse || [];
  const totalCount = mediaResponse?.count || mediaList.length;

  const { data: availableTags = [] } = useMediaTags();
  const bulkDelete = useBulkDeleteMedia();
  const updateMedia = useUpdateMedia();

  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Media', path: null }
  ];

  // Pagination
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const paginatedMedia = mediaList;

  const handleToggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === mediaList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mediaList.map(m => m.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    
    const hasUsedMedia = mediaList
      .filter(m => selectedIds.includes(m.id))
      .some(m => m.usage_count > 0);

    if (hasUsedMedia) {
      toast.error('Cannot delete: Some selected media is currently in use');
      return;
    }

    if (confirm(`Delete ${selectedIds.length} selected files?`)) {
      await bulkDelete.mutateAsync(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleBulkMove = async () => {
    if (selectedIds.length === 0 || !bulkMoveFolder) return;

    try {
      const updates = selectedIds.map(id =>
        updateMedia.mutateAsync({ id, updates: { folder: bulkMoveFolder } })
      );
      await Promise.all(updates);
      setSelectedIds([]);
      setBulkMoveFolder('');
      toast.success(`Moved ${selectedIds.length} files to ${bulkMoveFolder}`);
      refetch();
    } catch (error) {
      toast.error('Failed to move files');
    }
  };

  const handleEdit = (media) => {
    setSelectedMedia(media);
    setDetailModalOpen(true);
  };

  const handleUploadComplete = () => {
    refetch();
    setUploadModalOpen(false);
  };

  const toggleTag = (tagName) => {
    setSelectedTags(prev =>
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
    setCurrentPage(1);
  };

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Media Library</h1>
        <button className="btn btn-primary" onClick={() => setUploadModalOpen(true)}>
          <Icon icon="mdi:upload" className="icon" />
          Upload Files
        </button>
      </div>

      <div className="media-library-layout">
        {/* Sidebar */}
        <aside className="media-sidebar">
          <FolderManager
            selectedFolder={selectedFolder}
            onSelectFolder={(folder) => {
              setSelectedFolder(folder);
              setCurrentPage(1);
            }}
          />
        </aside>

        {/* Main Content */}
        <div className="media-main">
          {/* Toolbar */}
          <div className="media-toolbar">
            <div className="search-box">
              <Icon icon="mdi:magnify" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <select
              className="filter-select"
              value={fileTypeFilter}
              onChange={(e) => {
                setFileTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="application/pdf">PDFs</option>
              <option value="application/zip">Archives</option>
            </select>

            <div className="toolbar-actions">
              {selectedIds.length > 0 && (
                <>
                  <button className="btn btn-sm" onClick={handleSelectAll}>
                    {selectedIds.length === mediaList.length ? 'Deselect All' : `Selected (${selectedIds.length})`}
                  </button>
                  <select
                    className="filter-select"
                    value={bulkMoveFolder}
                    onChange={(e) => setBulkMoveFolder(e.target.value)}
                  >
                    <option value="">Move to folder...</option>
                    <option value="uncategorized">Uncategorized</option>
                  </select>
                  {bulkMoveFolder && (
                    <button className="btn btn-sm btn-primary" onClick={handleBulkMove}>
                      <Icon icon="mdi:folder-move" className="icon" />
                      Move
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleBulkDelete}
                  >
                    <Icon icon="mdi:delete" className="icon" />
                    Delete
                  </button>
                </>
              )}

              <div className="view-toggle">
                <button
                  className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <Icon icon="mdi:view-grid" />
                </button>
                <button
                  className={`btn-icon ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <Icon icon="mdi:view-list" />
                </button>
              </div>
            </div>
          </div>

          {/* Tag Filters */}
          {availableTags.length > 0 && (
            <div className="filter-tags">
              {availableTags.map(tag => (
                <button
                  key={tag.name}
                  className={`tag-pill ${selectedTags.includes(tag.name) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag.name)}
                >
                  {tag.name} ({tag.count})
                </button>
              ))}
            </div>
          )}

          {/* Media Grid */}
          <div className="admin-card">
            {isLoading ? (
              <div className="media-grid">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="media-card-skeleton">
                    <div className="skeleton-thumbnail" />
                    <div className="skeleton-text" />
                    <div className="skeleton-text short" />
                  </div>
                ))}
              </div>
            ) : mediaList.length === 0 ? (
              <div className="admin-empty-state">
                <Icon icon="mdi:image-multiple-outline" className="icon" />
                <h3>
                  {searchTerm || selectedFolder !== 'all' || selectedTags.length > 0 || fileTypeFilter
                    ? 'No media matches your filters'
                    : 'No media files yet'}
                </h3>
                <p>
                  {searchTerm || selectedFolder !== 'all' || selectedTags.length > 0 || fileTypeFilter
                    ? 'Try adjusting your search or filter criteria'
                    : 'Upload your first file to build your media library'}
                </p>
                {(searchTerm || selectedFolder !== 'all' || selectedTags.length > 0 || fileTypeFilter) ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTags([]);
                      setFileTypeFilter('');
                      setSelectedFolder('all');
                      setCurrentPage(1);
                    }}
                  >
                    <Icon icon="mdi:filter-off" className="icon" />
                    Clear All Filters
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setUploadModalOpen(true)}
                  >
                    <Icon icon="mdi:upload" className="icon" />
                    Upload Your First File
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className={`media-grid ${viewMode}`}>
                  {paginatedMedia.map(media => (
                    <MediaCard
                      key={media.id}
                      media={media}
                      onSelect={handleToggleSelect}
                      onEdit={handleEdit}
                      onDelete={(id) => {
                        if (confirm('Delete this file?')) {
                          bulkDelete.mutate([id]);
                        }
                      }}
                      isSelected={selectedIds.includes(media.id)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="btn btn-sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <Icon icon="mdi:chevron-left" />
                      Previous
                    </button>
                    <span className="pagination-info">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="btn btn-sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
        </div>
      </div>

      {/* Modals */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <MediaDetailModal
        media={selectedMedia}
        isOpen={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedMedia(null);
        }}
        onDelete={() => {
          refetch();
          setDetailModalOpen(false);
          setSelectedMedia(null);
        }}
      />
    </BackendLayout>
  );
}
