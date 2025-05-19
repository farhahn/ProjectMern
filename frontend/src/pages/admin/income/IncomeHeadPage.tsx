import React, { useState } from 'react';

const IncomeHeadPage = () => {
  const [incomeHeads, setIncomeHeads] = useState([
    { id: 1, name: 'Donation', description: 'Charity donations' },
    { id: 2, name: 'Rent', description: 'Property rental income' },
    { id: 3, name: 'Miscellaneous', description: 'Other income sources' },
    { id: 4, name: 'Book Sale', description: 'Book selling income' },
    { id: 5, name: 'Uniform Sale', description: 'Uniform sales income' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newHead, setNewHead] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const filteredHeads = incomeHeads.filter(head =>
    head.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    head.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newHead || !newDescription) return;

    if (editingId) {
      setIncomeHeads(incomeHeads.map(head =>
        head.id === editingId ? { ...head, name: newHead, description: newDescription } : head
      ));
      setEditingId(null);
    } else {
      setIncomeHeads([...incomeHeads, {
        id: incomeHeads.length + 1,
        name: newHead,
        description: newDescription
      }]);
    }

    setNewHead('');
    setNewDescription('');
  };

  const handleDelete = (id) => {
    setIncomeHeads(incomeHeads.filter(head => head.id !== id));
  };

  const handleEdit = (head) => {
    setNewHead(head.name);
    setNewDescription(head.description);
    setEditingId(head.id);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Income Head *</label>
          <input
            type="text"
            value={newHead}
            onChange={(e) => setNewHead(e.target.value)}
            style={styles.input}
            placeholder="Chef des revenus"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            style={styles.input}
            placeholder="Description"
          />
        </div>
        <button type="submit" style={styles.button}>
          {editingId ? 'Update' : 'Search'}
        </button>
      </form>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <div style={styles.headerCell}>Income Head</div>
          <div style={styles.headerCell}>Description</div>
          <div style={styles.headerCell}>Action</div>
        </div>
        {filteredHeads.map(head => (
          <div key={head.id} style={styles.tableRow}>
            <div style={styles.cell}>{head.name}</div>
            <div style={styles.cell}>{head.description}</div>
            <div style={styles.cell}>
              <button onClick={() => handleEdit(head)} style={styles.actionButton}>
                Edit
              </button>
              <button onClick={() => handleDelete(head.id)} style={{ ...styles.actionButton, ...styles.deleteButton }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.recordCount}>
        Records: 1 to {filteredHeads.length} of {filteredHeads.length}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
  },
  form: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  table: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  tableRow: {
    display: 'flex',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    padding: '0 10px',
  },
  cell: {
    flex: 1,
    padding: '0 10px',
  },
  actionButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  recordCount: {
    marginTop: '10px',
    color: '#666',
    textAlign: 'right',
  },
};

export default IncomeHeadPage;