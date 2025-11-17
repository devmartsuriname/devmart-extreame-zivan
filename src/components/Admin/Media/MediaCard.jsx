import { useState } from 'react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';

export default function MediaCard({ media, onSelect, onEdit, onDelete, isSelected }) {
  const [imageError, setImageError] = useState(false);

  const isImage = media.mime_type.startsWith('image/');
  const isVideo = media.mime_type.startsWith('video/');
  const isPDF = media.mime_type === 'application/pdf';

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(media.file_url);
    const toast = (await import('sonner')).toast;
    toast.success('URL copied to clipboard');
  };

  return (
    <div className={`media-card ${isSelected ? 'selected' : ''}`} tabIndex={0}>
      {/* Selection Checkbox */}
      {onSelect && (
        <div className="media-card-checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(media.id)}
          />
        </div>
      )}

      {/* Usage Count Badge */}
      {media.usage_count > 0 && (
        <div className="usage-badge">
          <Icon icon="mdi:link-variant" />
          {media.usage_count}
        </div>
      )}

      {/* Thumbnail */}
      <div className="media-card-thumbnail" onClick={() => onEdit?.(media)}>
        {isImage && !imageError ? (
          <img
            src={media.file_url}
            alt={media.alt_text || media.filename}
            onError={() => setImageError(true)}
          />
        ) : isVideo ? (
          <div className="media-placeholder">
            <Icon icon="mdi:video" />
          </div>
        ) : isPDF ? (
          <div className="media-placeholder">
            <Icon icon="mdi:file-pdf-box" />
          </div>
        ) : (
          <div className="media-placeholder">
            <Icon icon="mdi:file" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="media-card-info">
        <div className="media-card-title" title={media.original_filename}>
          {media.original_filename}
        </div>
        <div className="media-card-meta">
          <span>{formatFileSize(media.file_size)}</span>
          {media.width && media.height && (
            <span>{media.width} × {media.height}</span>
          )}
        </div>
        <div className="media-card-date">
          {format(new Date(media.created_at), 'MMM d, yyyy')}
        </div>
      </div>

      {/* Actions */}
      <div className="media-card-actions">
        <button
          className="btn-icon"
          onClick={() => onEdit?.(media)}
          title="Edit details"
        >
          <Icon icon="mdi:pencil" />
        </button>
        <button
          className="btn-icon"
          onClick={copyUrl}
          title="Copy URL"
        >
          <Icon icon="mdi:content-copy" />
        </button>
        <button
          className="btn-icon"
          onClick={() => onDelete?.(media.id)}
          title="Delete"
        >
          <Icon icon="mdi:delete" />
        </button>
      </div>
    </div>
  );
}
