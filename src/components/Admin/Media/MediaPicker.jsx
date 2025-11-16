import { useState } from 'react';
import { Icon } from '@iconify/react';
import MediaPickerModal from './MediaPickerModal';

export default function MediaPicker({
  value,
  onChange,
  allowedTypes = ['image'],
  maxFiles = 1,
  label = 'Select Media',
  required = false
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (selectedMedia) => {
    if (maxFiles === 1) {
      onChange(selectedMedia[0]?.file_url || '');
    } else {
      onChange(selectedMedia.map(m => m.file_url));
    }
    setIsModalOpen(false);
  };

  const handleRemove = () => {
    onChange(maxFiles === 1 ? '' : []);
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

      {renderPreview()}

      <MediaPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        allowedTypes={allowedTypes}
        maxFiles={maxFiles}
      />
    </div>
  );
}
