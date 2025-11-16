import { useState } from 'react';
import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';
import { useMediaList, useBulkDeleteMedia } from '@/hooks/useMediaLibrary';
import MediaCard from '@/components/Admin/Media/MediaCard';
import MediaDetailModal from '@/components/Admin/Media/MediaDetailModal';
import UploadModal from '@/components/Admin/Media/UploadModal';
import FolderManager from '@/components/Admin/Media/FolderManager';

export default function MediaLibrary() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const { data: mediaList = [], isLoading, refetch } = useMediaList({
    search: searchTerm,
    folder: selectedFolder
  });

  const bulkDelete = useBulkDeleteMedia();

  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Media', path: null }
  ];

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
    if (confirm(`Delete ${selectedIds.length} selected files?`)) {
      await bulkDelete.mutateAsync(selectedIds);
      setSelectedIds([]);
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
            onSelectFolder={setSelectedFolder}
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="toolbar-actions">
              {selectedIds.length > 0 && (
                <>
                  <button className="btn btn-sm" onClick={handleSelectAll}>
                    Deselect All ({selectedIds.length})
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleBulkDelete}
                  >
                    <Icon icon="mdi:delete" className="icon" />
                    Delete Selected
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

          {/* Media Grid */}
          <div className="admin-card">
            {isLoading ? (
              <div className="admin-loading">
                <Icon icon="mdi:loading" className="spinning" />
                <p>Loading media...</p>
              </div>
            ) : mediaList.length === 0 ? (
              <div className="admin-empty-state">
                <Icon icon="mdi:image-multiple-outline" className="icon" />
                <h3>
                  {searchTerm || selectedFolder !== 'all'
                    ? 'No media found'
                    : 'No media files yet'}
                </h3>
                <p>
                  {searchTerm || selectedFolder !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Upload files to get started'}
                </p>
                {!searchTerm && selectedFolder === 'all' && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setUploadModalOpen(true)}
                  >
                    <Icon icon="mdi:upload" className="icon" />
                    Upload Files
                  </button>
                )}
              </div>
            ) : (
              <div className={`media-grid ${viewMode}`}>
                {mediaList.map(media => (
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
