import React, { useState } from 'react';

const AddFeesGroup = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Class 1 General', description: 'General fees for Class 1 students' },
    { id: 2, name: 'Class 1 Lump Sum', description: 'One-time payment package' },
    // ... other initial groups
  ]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Name is required');
    
    if (editingId) {
      setGroups(groups.map(g => 
        g.id === editingId ? { ...g, ...formData } : g
      ));
    } else {
      setGroups([...groups, { id: Date.now(), ...formData }]);
    }
    
    setFormData({ name: '', description: '' });
    setEditingId(null);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: "#e8c897",
    },
    header: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '2rem',
      color: '#1e293b',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    formContainer: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem'
    },
    inputGroup: {
      marginBottom: '1.5rem',
      position: 'relative'
    },
    label: {
      display: 'block',
      marginBottom: '0.75rem',
      fontWeight: '600',
      color: '#475569',
      fontSize: '0.9rem'
    },
    input: {
      width: '100%',
      padding: '0.875rem 1rem',
      borderRadius: '8px',
      border: '2px solid #e2e8f0',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#6366f1',
        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
      }
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '0.875rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      ':hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)'
      }
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden'
    },
    searchContainer: {
      padding: '1.5rem',
      borderBottom: '1px solid #f1f5f9'
    },
    searchInput: {
      width: '100%',
      padding: '0.875rem 1rem',
      borderRadius: '8px',
      border: '2px solid #e2e8f0',
      fontSize: '0.9rem',
      paddingLeft: '2.5rem',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\'%3e%3cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\' /%3e%3c/svg%3e")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '1rem center',
      backgroundSize: '1rem',
      ':focus': {
        outline: 'none',
        borderColor: '#6366f1',
        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
      }
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      backgroundColor: '#f8fafc',
      padding: '1rem',
      textAlign: 'left',
      color: '#64748b',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    tableRow: {
      borderBottom: '1px solid #f1f5f9',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#f8fafc'
      }
    },
    tableCell: {
      padding: '1.25rem 1rem',
      color: '#1e293b',
      fontSize: '0.9rem'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      marginRight: '0.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
        Manage Fee Groups
      </h1>
      
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Group Name *</label>
            <input
              style={styles.input}
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="Enter group name"
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <input
              style={styles.input}
              type="text"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Add description (optional)"
            />
          </div>
          
          <div style={styles.buttonGroup}>
            <button style={styles.primaryButton} type="submit">
              {editingId ? 'Update Group' : 'Create New Group'}
            </button>
            {editingId && (
              <button 
                style={styles.secondaryButton}
                type="button"
                onClick={() => {
                  setFormData({ name: '', description: '' });
                  setEditingId(null);
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search fee groups..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Group Name</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map(group => (
              <tr key={group.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{group.name}</td>
                <td style={styles.tableCell}>{group.description || '-'}</td>
                <td style={styles.tableCell}>
                  <button
                    style={{...styles.actionButton, backgroundColor: '#e0f2fe', color: '#0369a1'}}
                    onClick={() => {
                      setFormData({ name: group.name, description: group.description });
                      setEditingId(group.id);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    style={{...styles.actionButton, backgroundColor: '#fee2e2', color: '#dc2626'}}
                    onClick={() => setGroups(groups.filter(g => g.id !== group.id))}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={styles.recordsCount}>
          Showing {filteredGroups.length} of {groups.length} groups
        </div>
      </div>
    </div>
  );
};

export default AddFeesGroup;