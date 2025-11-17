import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useMediaList, useMediaFolders } from '@/hooks/useMediaLibrary';
import MediaCard from './MediaCard';
import UploadModal from './UploadModal';

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  allowedTypes = ['image'],
  maxFiles = 1,
  folderFilter = null
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(folderFilter || 'all');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [showUpload, setShowUpload] = useState(false);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);

  const ITEMS_PER_PAGE = 20;

  // Build mime type filter based on file type tabs
  let mimeTypeFilter = null;
  if (fileTypeFilter === 'image') mimeTypeFilter = 'image';
  else if (fileTypeFilter === 'video') mimeTypeFilter = 'video';
  else if (fileTypeFilter === 'document') mimeTypeFilter = 'application';

  // Build query filters
  const queryFilters = {
    search: searchTerm,
    mimeType: mimeTypeFilter,
    folder: selectedFolder !== 'all' ? selectedFolder : null,
    page,
    limit: ITEMS_PER_PAGE
  };

  const { data: mediaData, refetch } = useMediaList(queryFilters);
  const { data: folders = [] } = useMediaFolders();

  const mediaList = mediaData?.data || [];
  const totalCount = mediaData?.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus search input on open
    setTimeout(() => searchInputRef.current?.focus(), 100);

    const handleKeyDown = (e) => {
      // ESC closes modal
      if (e.key === 'Escape') {
        onClose();
      }

      // Tab trap
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, input, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSelectedIds([]);
      setPage(1);
      if (!folderFilter) {
        setSelectedFolder('all');
      }
    }
  }, [isOpen, folderFilter]);

  if (!isOpen) return null;

  const handleToggleSelect = (id) => {
    if (maxFiles === 1) {
      setSelectedIds([id]);
    } else {
      setSelectedIds(prev =>
        prev.includes(id)
          ? prev.filter(i => i !== id)
          : prev.length < maxFiles
            ? [...prev, id]
            : prev
      );
    }
  };

  const handleInsert = () => {
    const selected = mediaList.filter(m => selectedIds.includes(m.id));
    onSelect(selected);
    setSelectedIds([]);
  };

  const handleUploadComplete = () => {
    refetch();
    setShowUpload(false);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div 
          ref={modalRef}
          className="modal-content media-picker-modal" 
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-picker-title"
        >
          <div className="modal-header">
            <h2 id="media-picker-title">Select Media</h2>
            <button className="btn-icon" onClick={onClose} aria-label="Close">
              <Icon icon="mdi:close" />
            </button>
          </div>

          <div className="modal-body media-picker-modal-body">
            {/* Sidebar */}
            <div className="media-picker-sidebar">
              <div className="folder-list">
                <button
                  className={`folder-item ${selectedFolder === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedFolder('all');
                    setPage(1);
                  }}
                >
                  <Icon icon="mdi:folder-multiple-outline" />
                  <span>All Media</span>
                </button>

                {!folderFilter && folders.map(folder => (
                  <button
                    key={folder.name}
                    className={`folder-item ${selectedFolder === folder.name ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedFolder(folder.name);
                      setPage(1);
                    }}
                  >
                    <Icon icon="mdi:folder-outline" />
                    <span>{folder.name || 'uncategorized'}</span>
                    <span className="folder-count">{folder.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="media-picker-main">
              {/* Toolbar */}
              <div className="media-picker-toolbar">
                <div className="search-box">
                  <Icon icon="mdi:magnify" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search media..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowUpload(true)}
                >
                  <Icon icon="mdi:upload" className="icon" />
                  Upload New
                </button>
              </div>

              {/* File Type Tabs */}
              <div className="file-type-tabs">
                <button
                  className={`file-type-tab ${fileTypeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    setFileTypeFilter('all');
                    setPage(1);
                  }}
                >
                  All
                </button>
                <button
                  className={`file-type-tab ${fileTypeFilter === 'image' ? 'active' : ''}`}
                  onClick={() => {
                    setFileTypeFilter('image');
                    setPage(1);
                  }}
                >
                  Images
                </button>
                <button
                  className={`file-type-tab ${fileTypeFilter === 'video' ? 'active' : ''}`}
                  onClick={() => {
                    setFileTypeFilter('video');
                    setPage(1);
                  }}
                >
                  Videos
                </button>
                <button
                  className={`file-type-tab ${fileTypeFilter === 'document' ? 'active' : ''}`}
                  onClick={() => {
                    setFileTypeFilter('document');
                    setPage(1);
                  }}
                >
                  Documents
                </button>

                <div className="view-toggle">
                  <button
                    className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    <Icon icon="mdi:view-grid-outline" />
                  </button>
                  <button
                    className={`btn-icon ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    <Icon icon="mdi:view-list-outline" />
                  </button>
                </div>
              </div>

              {/* Selection Info */}
              {maxFiles > 1 && selectedIds.length > 0 && (
                <div className="selection-info">
                  Selected: {selectedIds.length} / {maxFiles}
                </div>
              )}

              {/* Media Grid */}
              <div className={`media-grid ${viewMode}`}>
                {mediaList.length === 0 ? (
                  <div className="admin-empty-state">
                    <Icon icon="mdi:image-multiple-outline" className="icon" />
                    <h3>No media found</h3>
                    <p>Upload files to get started</p>
                  </div>
                ) : (
                  mediaList.map(media => (
                    <MediaCard
                      key={media.id}
                      media={media}
                      onSelect={handleToggleSelect}
                      isSelected={selectedIds.includes(media.id)}
                    />
                  ))
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="picker-pagination">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <Icon icon="mdi:chevron-left" />
                    Previous
                  </button>

                  <div className="pagination-pages">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                      // Show first, last, current, and pages around current
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            className={`pagination-page ${page === pageNum ? 'active' : ''}`}
                            onClick={() => setPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === page - 2 || pageNum === page + 2) {
                        return <span key={pageNum} className="pagination-ellipsis">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                    <Icon icon="mdi:chevron-right" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleInsert}
              disabled={selectedIds.length === 0}
            >
              Insert {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
            </button>
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onUploadComplete={handleUploadComplete}
        defaultFolder={folderFilter}
      />
    </>
  );
}
