import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useUpdateMedia, useDeleteMedia, useMediaFolders, useMediaUsage } from '@/hooks/useMediaLibrary';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function MediaDetailModal({ media, isOpen, onClose, onDelete }) {
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [folder, setFolder] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const updateMedia = useUpdateMedia();
  const deleteMedia = useDeleteMedia();
  const { data: folders = [] } = useMediaFolders();
  const { data: usageData = [] } = useMediaUsage(media?.id);

  useEffect(() => {
    if (media) {
      setAltText(media.alt_text || '');
      setCaption(media.caption || '');
      setFolder(media.folder || 'uncategorized');
      setTags(media.tags || []);
    }
  }, [media]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTab = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      modalRef.current.addEventListener('keydown', handleTab);
      closeButtonRef.current?.focus();

      return () => {
        modalRef.current?.removeEventListener('keydown', handleTab);
      };
    }
  }, [isOpen]);

  if (!isOpen || !media) return null;

  const validateTag = (tag) => {
    return /^[a-z0-9-]+$/.test(tag);
  };

  const isImage = media.mime_type.startsWith('image/');
  const isVideo = media.mime_type.startsWith('video/');
  const canDelete = !media.usage_count || media.usage_count === 0;

  const handleSave = async () => {
    await updateMedia.mutateAsync({
      id: media.id,
      updates: {
        alt_text: altText,
        caption: caption,
        folder: folder,
        tags: tags
      }
    });
    onClose();
  };

  const handleDelete = async () => {
    if (!canDelete) {
      toast.error('Cannot delete media that is currently in use');
      return;
    }
    if (confirm('Are you sure you want to delete this media file? This action cannot be undone.')) {
      await deleteMedia.mutateAsync(media.id);
      onClose();
      onDelete?.();
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(media.file_url);
    toast.success('URL copied to clipboard');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (!trimmedTag) return;
    
    if (!validateTag(trimmedTag)) {
      toast.error('Tags can only contain lowercase letters, numbers, and hyphens');
      return;
    }
    
    if (!tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div ref={modalRef} className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Media Details</h2>
          <button ref={closeButtonRef} className="btn-icon" onClick={onClose}>
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div className="modal-body media-detail-body">
          {/* Preview */}
          <div className="media-preview">
            {isImage ? (
              <img src={media.file_url} alt={media.alt_text || media.filename} />
            ) : isVideo ? (
              <video controls src={media.file_url} />
            ) : (
              <div className="media-placeholder-large">
                <Icon icon="mdi:file" />
                <p>{media.original_filename}</p>
              </div>
            )}
          </div>

          {/* Details Form */}
          <div className="media-details">
            <div className="form-group">
              <label>Filename</label>
              <input type="text" value={media.original_filename} disabled />
            </div>

            <div className="form-group">
              <label>Alt Text</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe this image for accessibility"
              />
            </div>

            <div className="form-group">
              <label>Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Optional caption"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Folder</label>
              <select value={folder} onChange={(e) => setFolder(e.target.value)}>
                <option value="uncategorized">Uncategorized</option>
                {folders.map(f => (
                  <option key={f.name} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Tags</label>
              <div className="tags-input-wrapper">
                <div className="tags-list">
                  {tags.map(tag => (
                    <span key={tag} className="tag-chip">
                      {tag}
                      <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))}>
                        <Icon icon="mdi:close" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="tag-input-row">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const newTag = tagInput.trim();
                        if (newTag && !tags.includes(newTag)) {
                          setTags([...tags, newTag]);
                          setTagInput('');
                        }
                      }
                    }}
                    placeholder="Add a tag and press Enter"
                  />
                  <button 
                    type="button" 
                    className="btn btn-sm" 
                    onClick={() => {
                      const newTag = tagInput.trim();
                      if (newTag && !tags.includes(newTag)) {
                        setTags([...tags, newTag]);
                        setTagInput('');
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="media-info-grid">
              <div className="info-item">
                <label>File Size</label>
                <span>{formatFileSize(media.file_size)}</span>
              </div>

              <div className="info-item">
                <label>Type</label>
                <span>{media.mime_type}</span>
              </div>

              {media.width && media.height && (
                <div className="info-item">
                  <label>Dimensions</label>
                  <span>{media.width} × {media.height}</span>
                </div>
              )}

              <div className="info-item">
                <label>Uploaded</label>
                <span>{format(new Date(media.created_at), 'MMM d, yyyy h:mm a')}</span>
              </div>

              <div className="info-item">
                <label>URL</label>
                <div className="url-copy">
                  <input type="text" value={media.file_url} readOnly />
                  <button className="btn-icon" onClick={copyUrl} title="Copy URL">
                    <Icon icon="mdi:content-copy" />
                  </button>
                </div>
              </div>
            </div>

            {/* Usage Panel */}
            {usageData.length > 0 && (
              <div className="usage-panel">
                <h4>
                  <Icon icon="mdi:link-variant" />
                  Used In ({usageData.length})
                </h4>
                <div className="usage-list">
                  {usageData.map(usage => (
                    <div key={usage.id} className="usage-item">
                      <Icon icon="mdi:link" />
                      <span>{usage.used_in}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delete Warning */}
            {!canDelete && (
              <div className="delete-warning">
                <Icon icon="mdi:alert" />
                <span>This media is currently in use and cannot be deleted.</span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="btn btn-danger" 
            onClick={handleDelete}
            disabled={!canDelete}
            title={!canDelete ? 'Cannot delete media in use' : 'Delete media'}
          >
            <Icon icon="mdi:delete" className="icon" />
            Delete
          </button>
          <div style={{ flex: 1 }} />
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={updateMedia.isPending}
          >
            {updateMedia.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
