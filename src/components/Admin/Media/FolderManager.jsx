import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useMediaFolders } from '@/hooks/useMediaLibrary';

export default function FolderManager({ selectedFolder, onSelectFolder }) {
  const { data: folders = [] } = useMediaFolders();
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate total count
  const totalCount = folders.reduce((sum, f) => sum + f.count, 0);

  return (
    <div className="folder-manager">
      <div className="folder-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>
          <Icon icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-right'} />
          Folders
        </h3>
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
            <button
              key={folder.name}
              className={`folder-item ${selectedFolder === folder.name ? 'active' : ''}`}
              onClick={() => onSelectFolder(folder.name)}
            >
              <Icon icon="mdi:folder" />
              <span>{folder.name}</span>
              <span className="folder-count">{folder.count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
