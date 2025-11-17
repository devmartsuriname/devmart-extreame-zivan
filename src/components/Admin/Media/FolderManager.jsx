import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useMediaFolders, useRenameFolder, useDeleteFolder } from '@/hooks/useMediaLibrary';

export default function FolderManager({ selectedFolder, onSelectFolder }) {
  const { data: folders = [] } = useMediaFolders();
  const [isExpanded, setIsExpanded] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [folderToRename, setFolderToRename] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');

  const renameFolder = useRenameFolder();
  const deleteFolder = useDeleteFolder();

  // Calculate total count
  const totalCount = folders.reduce((sum, f) => sum + f.count, 0);

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    // Just select it - folder will be created when media is added to it
    onSelectFolder(newFolderName.trim());
    setNewFolderName('');
    setCreateModalOpen(false);
  };

  const handleRenameFolder = async () => {
    if (!newFolderName.trim() || !folderToRename) return;
    await renameFolder.mutateAsync({ 
      oldName: folderToRename, 
      newName: newFolderName.trim() 
    });
    if (selectedFolder === folderToRename) {
      onSelectFolder(newFolderName.trim());
    }
    setRenameModalOpen(false);
    setFolderToRename(null);
    setNewFolderName('');
  };

  const handleDeleteFolder = async (folderName) => {
    if (confirm(`Delete folder "${folderName}"? All media will be moved to uncategorized.`)) {
      await deleteFolder.mutateAsync(folderName);
      if (selectedFolder === folderName) {
        onSelectFolder('all');
      }
    }
  };

  const openRenameModal = (folder) => {
    setFolderToRename(folder.name);
    setNewFolderName(folder.name);
    setRenameModalOpen(true);
  };

  return (
    <>
      <div className="folder-manager">
        <div className="folder-header">
          <h3 onClick={() => setIsExpanded(!isExpanded)}>
            <Icon icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-right'} />
            Folders
          </h3>
          <button 
            className="btn-icon" 
            onClick={() => setCreateModalOpen(true)}
            title="Create folder"
          >
            <Icon icon="mdi:folder-plus" />
          </button>
        </div>

        {isExpanded && (
          <div className="folder-list">
            <button
              className={`folder-item ${selectedFolder === 'all' ? 'active' : ''}`}
              onClick={() => onSelectFolder('all')}
            >
              <Icon icon="mdi:folder-multiple" />
              <span>All Media</span>
              <span className="folder-count">{totalCount}</span>
            </button>

            {folders.map(folder => (
              <div key={folder.name} className="folder-item-wrapper">
                <button
                  className={`folder-item ${selectedFolder === folder.name ? 'active' : ''}`}
                  onClick={() => onSelectFolder(folder.name)}
                >
                  <Icon icon="mdi:folder" />
                  <span>{folder.name}</span>
                  <span className="folder-count">{folder.count}</span>
                </button>
                {folder.name !== 'uncategorized' && (
                  <div className="folder-actions">
                    <button 
                      className="btn-icon-sm" 
                      onClick={(e) => { e.stopPropagation(); openRenameModal(folder); }}
                      title="Rename folder"
                    >
                      <Icon icon="mdi:pencil" />
                    </button>
                    <button 
                      className="btn-icon-sm" 
                      onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.name); }}
                      title="Delete folder"
                    >
                      <Icon icon="mdi:delete" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Folder Modal */}
      {createModalOpen && (
        <div className="modal-overlay" onClick={() => setCreateModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Folder</h2>
              <button className="btn-icon" onClick={() => setCreateModalOpen(false)}>
                <Icon icon="mdi:close" />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Folder Name</label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreateFolder}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Folder Modal */}
      {renameModalOpen && (
        <div className="modal-overlay" onClick={() => setRenameModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Rename Folder</h2>
              <button className="btn-icon" onClick={() => setRenameModalOpen(false)}>
                <Icon icon="mdi:close" />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>New Folder Name</label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter new folder name"
                  onKeyDown={(e) => e.key === 'Enter' && handleRenameFolder()}
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setRenameModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleRenameFolder}>
                Rename
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
