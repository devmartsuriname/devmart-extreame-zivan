import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useMediaList } from '@/hooks/useMediaLibrary';
import MediaCard from './MediaCard';
import UploadModal from './UploadModal';

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  allowedTypes = ['image'],
  maxFiles = 1
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  // Build mime type filter
  const mimeTypeFilter = allowedTypes.includes('image') ? 'image' :
                         allowedTypes.includes('video') ? 'video' :
                         allowedTypes.includes('document') ? 'application' : null;

  const { data: mediaList = [], refetch } = useMediaList({
    search: searchTerm,
    mimeType: mimeTypeFilter
  });

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
        <div className="modal-content modal-xl" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Select Media</h2>
            <button className="btn-icon" onClick={onClose}>
              <Icon icon="mdi:close" />
            </button>
          </div>

          <div className="modal-body">
            {/* Toolbar */}
            <div className="media-picker-toolbar">
              <div className="search-box">
                <Icon icon="mdi:magnify" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => setShowUpload(true)}
              >
                <Icon icon="mdi:upload" className="icon" />
                Upload New
              </button>
            </div>

            {/* Selection Info */}
            {maxFiles > 1 && (
              <div className="selection-info">
                Selected: {selectedIds.length} / {maxFiles}
              </div>
            )}

            {/* Media Grid */}
            <div className="media-grid">
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
      />
    </>
  );
}
