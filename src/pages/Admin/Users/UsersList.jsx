import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import BackendLayout from '@/components/Admin/BackendLayout';
import { Icon } from '@iconify/react';

export default function UsersList() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const usersPerPage = 10;
  
  const breadcrumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Users', path: null }
  ];

  const availableRoles = ['super_admin', 'admin', 'editor', 'viewer'];

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine data
      const usersWithRoles = profiles.map(profile => ({
        ...profile,
        roles: userRoles
          ?.filter(ur => ur.user_id === profile.id)
          .map(ur => ur.role) || []
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setSelectedRoles(user.roles || []);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setSelectedRoles([]);
  };

  const toggleRole = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const updateUserRoles = async () => {
    if (!selectedUser) return;
    
    // Prevent removing own super_admin role
    if (selectedUser.id === currentUser.id && 
        selectedUser.roles.includes('super_admin') && 
        !selectedRoles.includes('super_admin')) {
      alert('You cannot remove your own super admin role');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const currentRoleNames = selectedUser.roles || [];
      
      // Find roles to add
      const rolesToAdd = selectedRoles.filter(r => !currentRoleNames.includes(r));
      
      // Find roles to remove
      const rolesToRemove = currentRoleNames.filter(r => !selectedRoles.includes(r));
      
      // Delete removed roles
      if (rolesToRemove.length > 0) {
        const { error: deleteError } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', selectedUser.id)
          .in('role', rolesToRemove);
        
        if (deleteError) throw deleteError;
      }
      
      // Insert new roles
      if (rolesToAdd.length > 0) {
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert(rolesToAdd.map(role => ({ 
            user_id: selectedUser.id, 
            role 
          })));
        
        if (insertError) throw insertError;
      }
      
      // Refresh list
      await fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error updating roles:', error);
      alert('Failed to update roles. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatRoleName = (role) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <BackendLayout breadcrumbs={breadcrumbs}>
      <div className="admin-page-header">
        <h1>Users & Roles</h1>
      </div>
      
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-search">
            <Icon icon="mdi:magnify" className="icon" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="admin-loading-inline">
            <div className="spinner" />
            <p>Loading users...</p>
          </div>
        ) : currentUsers.length === 0 ? (
          <div className="admin-empty-state">
            <Icon icon="mdi:account-multiple-outline" className="icon" />
            <h3>No users found</h3>
            <p>
              {searchQuery 
                ? 'Try a different search term' 
                : 'No users have been registered yet'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt={user.full_name || 'User'} />
                            ) : (
                              <Icon icon="mdi:account-circle" />
                            )}
                          </div>
                          <span>{user.full_name || 'No name'}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <div className="role-badges">
                          {user.roles.length === 0 ? (
                            <span className="badge badge-muted">No roles</span>
                          ) : (
                            user.roles.map(role => (
                              <span 
                                key={role} 
                                className={`badge ${role === 'super_admin' ? 'badge-accent' : 'badge-primary'}`}
                              >
                                {formatRoleName(role)}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={() => openRoleModal(user)}
                        >
                          <Icon icon="mdi:shield-account" className="icon" />
                          Edit Roles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {totalPages > 1 && (
              <div className="admin-pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-secondary"
                >
                  <Icon icon="mdi:chevron-left" />
                  Previous
                </button>
                
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-secondary"
                >
                  Next
                  <Icon icon="mdi:chevron-right" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Role Assignment Modal */}
      {modalOpen && selectedUser && (
        <>
          <div className="admin-modal-overlay" onClick={closeModal} />
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>Edit User Roles</h2>
              <button onClick={closeModal} className="admin-modal-close">
                <Icon icon="mdi:close" />
              </button>
            </div>
            
            <div className="admin-modal-body">
              <div className="user-info-card">
                <div className="user-avatar large">
                  {selectedUser.avatar_url ? (
                    <img src={selectedUser.avatar_url} alt={selectedUser.full_name || 'User'} />
                  ) : (
                    <Icon icon="mdi:account-circle" />
                  )}
                </div>
                <div>
                  <h3>{selectedUser.full_name || 'No name'}</h3>
                  <p>{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="role-checkboxes">
                <p className="section-label">Assign Roles</p>
                {availableRoles.map(role => (
                  <label key={role} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => toggleRole(role)}
                      disabled={
                        role === 'super_admin' && 
                        selectedUser.id === currentUser.id && 
                        selectedUser.roles.includes('super_admin')
                      }
                    />
                    <span>{formatRoleName(role)}</span>
                    {role === 'super_admin' && selectedUser.id === currentUser.id && (
                      <span className="role-note">(Cannot remove your own)</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="admin-modal-footer">
              <button 
                onClick={closeModal} 
                className="btn btn-secondary"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                onClick={updateUserRoles} 
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Icon icon="mdi:loading" className="icon spinning" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:check" className="icon" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </BackendLayout>
  );
}
