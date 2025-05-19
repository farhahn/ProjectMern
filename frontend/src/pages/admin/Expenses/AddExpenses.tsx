import React, { useState } from 'react';
import { Save, Delete, Edit, AttachFile } from '@mui/icons-material';

const AddExpenses = () => {
  const [expenses, setExpenses] = useState([
    // Sample data matching the image
    { id: 1, name: 'Online Exam Preparation', description: 'Online Exam Preparation', invoiceNumber: '89074', date: '2025-03-30', expenseHead: 'Miscellaneous', amount: 150.00 },
    { id: 2, name: 'CBSE Books Publisher', description: 'CBSE Books Publisher', invoiceNumber: '7342', date: '2025-03-25', expenseHead: 'Stationery Purchase', amount: 150.00 },
    // Add other sample entries here
  ]);

  const [formData, setFormData] = useState({
    expenseHead: '',
    name: '',
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    attachedFile: null
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  const expenseHeads = [
    'Miscellaneous',
    'Stationery Purchase',
    'Electricity Bill',
    'Telephone Bill',
    'Flower',
    'Educational Trip'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.expenseHead || !formData.name || !formData.date || !formData.amount) {
      alert('Please fill required fields');
      return;
    }

    if (editingId) {
      setExpenses(expenses.map(exp => 
        exp.id === editingId ? { ...formData, id: editingId } : exp
      ));
    } else {
      setExpenses([...expenses, {
        id: expenses.length + 1,
        ...formData
      }]);
    }

    setFormData({
      expenseHead: '',
      name: '',
      invoiceNumber: '',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      description: '',
      attachedFile: null
    });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleEdit = (expense) => {
    setFormData(expense);
    setEditingId(expense.id);
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, attachedFile: e.target.files[0] });
  };

  const filteredExpenses = expenses.filter(expense =>
    Object.values(expense).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    formSection: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '30px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px',
      marginBottom: '20px'
    },
    inputGroup: {
      marginBottom: '15px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    },
    inputField: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      width: '100%',
      boxSizing: 'border-box'
    },
    fileUpload: {
      border: '2px dashed #3498db',
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      margin: '15px 0'
    },
    saveButton: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '12px 30px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      margin: '20px auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    tableHeader: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '15px',
      textAlign: 'left'
    },
    tableRow: {
      borderBottom: '1px solid #ddd',
      '&:hover': {
        backgroundColor: '#f5f5f5'
      }
    },
    tableCell: {
      padding: '15px',
      textAlign: 'left'
    },
    actionCell: {
      display: 'flex',
      gap: '10px'
    },
    searchInput: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      marginBottom: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.formSection}>
        <h2 style={styles.sectionTitle}>Add New Expense</h2>
        
        <div style={styles.inputGroup}>
          <div>
            <label>Expense Head *</label>
            <select
              style={styles.inputField}
              value={formData.expenseHead}
              onChange={e => setFormData({...formData, expenseHead: e.target.value})}
              required
            >
              <option value="">Select</option>
              {expenseHeads.map(head => (
                <option key={head} value={head}>{head}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Name *</label>
            <input
              type="text"
              style={styles.inputField}
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <div>
            <label>Invoice Number</label>
            <input
              type="text"
              style={styles.inputField}
              value={formData.invoiceNumber}
              onChange={e => setFormData({...formData, invoiceNumber: e.target.value})}
            />
          </div>

          <div>
            <label>Date *</label>
            <input
              type="date"
              style={styles.inputField}
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div>
            <label>Amount (₹) *</label>
            <input
              type="number"
              style={styles.inputField}
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>
        </div>

        <div style={styles.fileUpload}>
          <input
            type="file"
            id="fileUpload"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <label htmlFor="fileUpload">
            <AttachFile /> {formData.attachedFile?.name || 'Drag and drop a file here or click'}
          </label>
        </div>

        <div>
          <label>Description</label>
          <textarea
            style={{...styles.inputField, minHeight: '100px'}}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <button type="submit" style={styles.saveButton}>
          <Save /> {editingId ? 'Update Expense' : 'Save Expense'}
        </button>
      </form>

      <div style={styles.formSection}>
        <h2 style={styles.sectionTitle}>Expense List</h2>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Invoice Number</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Expense Head</th>
              <th style={styles.tableHeader}>Amount (₹)</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(expense => (
              <tr key={expense.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{expense.name}</td>
                <td style={styles.tableCell}>{expense.description}</td>
                <td style={styles.tableCell}>{expense.invoiceNumber}</td>
                <td style={styles.tableCell}>{new Date(expense.date).toLocaleDateString()}</td>
                <td style={styles.tableCell}>{expense.expenseHead}</td>
                <td style={styles.tableCell}>₹{expense.amount.toFixed(2)}</td>
                <td style={styles.tableCell}>
                  <div style={styles.actionCell}>
                    <button onClick={() => handleEdit(expense)}>
                      <Edit color="primary" />
                    </button>
                    <button onClick={() => handleDelete(expense.id)}>
                      <Delete color="error" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddExpenses;