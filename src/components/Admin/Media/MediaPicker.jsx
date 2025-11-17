import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import MediaPickerModal from './MediaPickerModal';
import { useTrackMediaUsage, useUntrackMediaUsage } from '@/hooks/useMediaLibrary';

export default function MediaPicker({
  value,
  onChange,
  allowedTypes = ['image'],
  maxFiles = 1,
  label = 'Select Media',
  required = false,
  folderFilter = null,
  usageKey = null,
  description = null
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const trackUsage = useTrackMediaUsage();
  const untrackUsage = useUntrackMediaUsage();

  const handleSelect = async (newMedia) => {
    if (!newMedia || newMedia.length === 0) return;

    try {
      setIsTracking(true);

      // Handle single select
      if (maxFiles === 1) {
        const media = newMedia[0];
        
        // Untrack previous media if it exists and usageKey is provided
        if (usageKey && selectedMedia?.id && selectedMedia.id !== media.id) {
          await untrackUsage.mutateAsync({
            mediaId: selectedMedia.id,
            usedIn: usageKey
          });
        }

        // Track new media if usageKey is provided
        if (usageKey && media.id) {
          await trackUsage.mutateAsync({
            mediaId: media.id,
            usedIn: usageKey
          });
        }

        setSelectedMedia({ id: media.id, url: media.file_url, filename: media.filename });
        onChange(media.file_url);
      } 
      // Handle multi-select
      else {
        const currentIds = selectedMedia ? (Array.isArray(selectedMedia) ? selectedMedia.map(m => m.id) : []) : [];
        const newIds = newMedia.map(m => m.id);

        // Untrack removed media
        if (usageKey) {
          const removedIds = currentIds.filter(id => !newIds.includes(id));
          for (const id of removedIds) {
            await untrackUsage.mutateAsync({ mediaId: id, usedIn: usageKey });
          }

          // Track newly added media
          const addedIds = newIds.filter(id => !currentIds.includes(id));
          for (const id of addedIds) {
            await trackUsage.mutateAsync({ mediaId: id, usedIn: usageKey });
          }
        }

        const mediaObjects = newMedia.map(m => ({ id: m.id, url: m.file_url, filename: m.filename }));
        setSelectedMedia(mediaObjects);
        onChange(newMedia.map(m => m.file_url));
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error tracking media usage:', error);
    } finally {
      setIsTracking(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsTracking(true);

      // Untrack media if usageKey is provided
      if (usageKey) {
        if (maxFiles === 1 && selectedMedia?.id) {
          await untrackUsage.mutateAsync({
            mediaId: selectedMedia.id,
            usedIn: usageKey
          });
        } else if (Array.isArray(selectedMedia)) {
          for (const media of selectedMedia) {
            await untrackUsage.mutateAsync({
              mediaId: media.id,
              usedIn: usageKey
            });
          }
        }
      }

      setSelectedMedia(null);
      onChange(maxFiles === 1 ? '' : []);
    } catch (error) {
      console.error('Error untracking media:', error);
    } finally {
      setIsTracking(false);
    }
  };

  const isImage = (url) => {
    return url && (
      url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ||
      url.includes('image')
    );
  };

  const renderPreview = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return (
        <div className="media-picker-empty" onClick={() => setIsModalOpen(true)}>
          <Icon icon="mdi:image-plus" />
          <span>Click to select</span>
        </div>
      );
    }

    if (maxFiles === 1) {
      return (
        <div className="media-picker-preview">
          {isImage(value) ? (
            <img src={value} alt="Selected media" />
          ) : (
            <div className="media-picker-file">
              <Icon icon="mdi:file" />
            </div>
          )}
          <div className="media-picker-overlay">
            <button
              className="btn-icon"
              onClick={() => setIsModalOpen(true)}
              title="Change"
            >
              <Icon icon="mdi:pencil" />
            </button>
            <button
              className="btn-icon"
              onClick={handleRemove}
              title="Remove"
            >
              <Icon icon="mdi:delete" />
            </button>
          </div>
        </div>
      );
    }

    // Multiple files
    return (
      <div className="media-picker-grid">
        {value.map((url, index) => (
          <div key={index} className="media-picker-preview-small">
            {isImage(url) ? (
              <img src={url} alt={`Selected ${index + 1}`} />
            ) : (
              <Icon icon="mdi:file" />
            )}
          </div>
        ))}
        <button
          className="media-picker-add-more"
          onClick={() => setIsModalOpen(true)}
        >
          <Icon icon="mdi:plus" />
        </button>
      </div>
    );
  };

  return (
    <div className="media-picker">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      {description && (
        <p className="form-description">{description}</p>
      )}

      {isTracking ? (
        <div className="media-picker-loading">
          <Icon icon="mdi:loading" className="spin" />
          <span>Updating...</span>
        </div>
      ) : (
        renderPreview()
      )}

      <MediaPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        allowedTypes={allowedTypes}
        maxFiles={maxFiles}
        folderFilter={folderFilter}
      />
    </div>
  );
}
