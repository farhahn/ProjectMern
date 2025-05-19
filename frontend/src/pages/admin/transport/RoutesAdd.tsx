import React, { useState } from 'react';

const RoutesAdd = () => {
  // Sample data for routes
  const [routes, setRoutes] = useState([
    { id: 1, title: 'Brooklyn Central' },
    { id: 2, title: 'Brooklyn East' },
    { id: 3, title: 'Brooklyn West' },
    { id: 4, title: 'Brooklyn South' },
    { id: 5, title: 'Brooklyn North' },
    { id: 6, title: 'Railway Station' },
    { id: 7, title: 'High Court' },
    { id: 8, title: 'Vijay Nagar' },
    { id: 9, title: 'Civil Line' },
    { id: 10, title: 'Dindayal Chowk' },
    { id: 11, title: 'Ranital' },
  ]);

  // State for new route, search, and edit mode
  const [newRouteTitle, setNewRouteTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Handle new route input change
  const handleRouteTitleChange = (e) => {
    setNewRouteTitle(e.target.value);
  };

  // Handle save new route
  const handleSaveRoute = () => {
    if (newRouteTitle.trim()) {
      const newRoute = { id: Date.now(), title: newRouteTitle.trim() };
      setRoutes([...routes, newRoute]);
      setFilteredRoutes([...routes, newRoute]);
      setNewRouteTitle('');
      alert('Route added successfully!');
    } else {
      alert('Please enter a route title!');
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = routes.filter(route =>
      route.title.toLowerCase().includes(term)
    );
    setFilteredRoutes(filtered);
  };

  // Handle delete route
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      const updatedRoutes = routes.filter(route => route.id !== id);
      setRoutes(updatedRoutes);
      setFilteredRoutes(updatedRoutes);
      alert('Route deleted successfully!');
    }
  };

  // Handle edit mode
  const handleEdit = (index, title) => {
    setEditIndex(index);
    setEditTitle(title);
  };

  // Handle save edited route
  const handleSaveEdit = (id) => {
    if (editTitle.trim()) {
      const updatedRoutes = routes.map(route =>
        route.id === id ? { ...route, title: editTitle.trim() } : route
      );
      setRoutes(updatedRoutes);
      setFilteredRoutes(updatedRoutes);
      setEditIndex(null);
      setEditTitle('');
      alert('Route updated successfully!');
    } else {
      alert('Please enter a route title!');
    }
  };

  // Handle export (placeholder)
  const handleExport = () => {
    alert('Export functionality triggered!');
    // Add actual export logic here (e.g., CSV download)
  };

  // Handle print (placeholder)
  const handlePrint = () => {
    window.print();
    alert('Print functionality triggered!');
  };

  // Handle settings (placeholder)
  const handleSettings = () => {
    alert('Settings functionality triggered!');
    // Add actual settings logic here
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.createSection}>
          <h3 style={styles.sectionTitle}>Create Route</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Route Title *</label>
            <input
              type="text"
              value={newRouteTitle}
              onChange={handleRouteTitleChange}
              style={styles.input}
              placeholder="Enter route title"
            />
          </div>
          <button style={styles.saveButton} onClick={handleSaveRoute}>
            Save
          </button>
        </div>

        <div style={styles.listSection}>
          <h3 style={styles.sectionTitle}>Route List</h3>
          <div style={styles.header}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              style={styles.searchInput}
            />
            <div style={styles.iconGroup}>
              <span
                style={styles.icon}
                onClick={handleExport}
                title="Export"
              >
                📤
              </span>
              <span
                style={styles.icon}
                onClick={handlePrint}
                title="Print"
              >
                🖨️
              </span>
              <span
                style={styles.icon}
                onClick={handleSettings}
                title="Settings"
              >
                ⚙️
              </span>
            </div>
          </div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.headerCell}>Route Title</th>
                <th style={styles.headerCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((route, index) => (
                <tr key={route.id} style={styles.row}>
                  <td style={styles.cell}>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        style={styles.editInput}
                      />
                    ) : (
                      route.title
                    )}
                  </td>
                  <td style={styles.cell}>
                    {editIndex === index ? (
                      <span
                        style={styles.actionIcon}
                        onClick={() => handleSaveEdit(route.id)}
                        title="Save"
                      >
                        ✅
                      </span>
                    ) : (
                      <>
                        <span
                          style={styles.actionIcon}
                          onClick={() => handleEdit(index, route.title)}
                          title="Edit"
                        >
                          ✏️
                        </span>
                        <span
                          style={styles.actionIcon}
                          onClick={() => handleDelete(route.id)}
                          title="Delete"
                        >
                          ❌
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.footer}>
            <span>Records: 1 to {filteredRoutes.length} of {routes.length}</span>
            <div style={styles.pagination}>
              <button style={styles.paginationButton}>1</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: '20px auto',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  wrapper: {
    display: 'flex',
    gap: '20px',
  },
  createSection: {
    flex: '1',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  listSection: {
    flex: '2',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    color: '#333',
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    color: '#666',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  editInput: {
    width: '90%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  saveButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  saveButtonHover: {
    backgroundColor: '#5a6268',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  searchInput: {
    padding: '8px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  iconGroup: {
    display: 'flex',
    gap: '10px',
  },
  icon: {
    cursor: 'pointer',
    fontSize: '16px',
    color: '#666',
    transition: 'color 0.3s',
  },
  iconHover: {
    color: '#000',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    backgroundColor: '#f8f9fa',
  },
  headerCell: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
  },
  row: {
    borderBottom: '1px solid #dee2e6',
  },
  cell: {
    padding: '10px',
    textAlign: 'left',
  },
  actionIcon: {
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '16px',
    color: '#666',
    transition: 'color 0.3s',
  },
  actionIconHover: {
    color: '#e74c3c',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
    color: '#666',
  },
  pagination: {
    display: 'flex',
    gap: '5px',
  },
  paginationButton: {
    padding: '5px 10px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default RoutesAdd;