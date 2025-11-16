import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useUpdateMedia, useDeleteMedia } from '@/hooks/useMediaLibrary';
import { useMediaFolders } from '@/hooks/useMediaLibrary';
import { format } from 'date-fns';

export default function MediaDetailModal({ media, isOpen, onClose, onDelete }) {
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [folder, setFolder] = useState('');

  const updateMedia = useUpdateMedia();
  const deleteMedia = useDeleteMedia();
  const { data: folders = [] } = useMediaFolders();

  useEffect(() => {
    if (media) {
      setAltText(media.alt_text || '');
      setCaption(media.caption || '');
      setFolder(media.folder || 'uncategorized');
    }
  }, [media]);

  if (!isOpen || !media) return null;

  const isImage = media.mime_type.startsWith('image/');
  const isVideo = media.mime_type.startsWith('video/');

  const handleSave = async () => {
    await updateMedia.mutateAsync({
      id: media.id,
      updates: {
        alt_text: altText,
        caption: caption,
        folder: folder
      }
    });
    onClose();
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this media file? This action cannot be undone.')) {
      await deleteMedia.mutateAsync(media.id);
      onClose();
      onDelete?.();
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(media.file_url);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Media Details</h2>
          <button className="btn-icon" onClick={onClose}>
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
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-danger" onClick={handleDelete}>
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
