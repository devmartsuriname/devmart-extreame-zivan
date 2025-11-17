import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { useMediaFolders } from '@/hooks/useMediaLibrary';

export default function UploadModal({ isOpen, onClose, onUploadComplete }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('uncategorized');
  const [newFolderName, setNewFolderName] = useState('');
  const [tags, setTags] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const { uploadFiles, uploading, progress } = useMediaUpload();
  const { data: folders = [] } = useMediaFolders();

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const folderToUse = newFolderName.trim() || selectedFolder;
    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
    const result = await uploadFiles(selectedFiles, folderToUse, tagsArray);

    if (result.uploadedFiles.length > 0) {
      onUploadComplete?.();
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setSelectedFolder('uncategorized');
    setNewFolderName('');
    setTags('');
    onClose();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload Files</h2>
          <button className="btn-icon" onClick={handleClose} disabled={uploading}>
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div className="modal-body">
          {/* Drag & Drop Zone */}
          <div
            className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon icon="mdi:cloud-upload-outline" className="upload-icon" />
            <p className="upload-text">Drag & drop files here or click to browse</p>
            <p className="upload-hint">Max 50MB per file • Images, Videos, PDFs</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,application/pdf"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </div>

          {/* Folder Selection */}
          <div className="form-row">
            <div className="form-group">
              <label>Select Folder</label>
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                disabled={uploading || newFolderName.trim()}
              >
                <option value="uncategorized">Uncategorized</option>
                {folders.map(folder => (
                  <option key={folder.name} value={folder.name}>
                    {folder.name} ({folder.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Or Create New Folder</label>
              <input
                type="text"
                placeholder="New folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                disabled={uploading}
              />
            </div>
          </div>

          {/* Tags Input */}
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. hero, homepage, banner"
              disabled={uploading}
            />
            <small className="form-hint">Separate multiple tags with commas</small>
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="upload-files-list">
              <h4>Selected Files ({selectedFiles.length})</h4>
              {selectedFiles.map((file, index) => (
                <div key={index} className="upload-file-item">
                  <div className="file-info">
                    <Icon
                      icon={
                        file.type.startsWith('image/') ? 'mdi:image' :
                        file.type.startsWith('video/') ? 'mdi:video' :
                        'mdi:file-document'
                      }
                      className="file-icon"
                    />
                    <div className="file-details">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{formatFileSize(file.size)}</span>
                    </div>
                  </div>

                  {uploading && progress[file.name] !== undefined ? (
                    <div className="upload-progress">
                      <div
                        className="progress-bar"
                        style={{ width: `${progress[file.name]}%` }}
                      />
                    </div>
                  ) : (
                    <button
                      className="btn-icon"
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                    >
                      <Icon icon="mdi:close" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClose} disabled={uploading}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
          >
            {uploading ? (
              <>
                <Icon icon="mdi:loading" className="icon spinning" />
                Uploading...
              </>
            ) : (
              <>
                <Icon icon="mdi:upload" className="icon" />
                Upload {selectedFiles.length} File(s)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
