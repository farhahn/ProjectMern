import React, { useState } from 'react';

const FeesMaster = () => {
  const [formData, setFormData] = useState({
    feesGroup: '',
    feesType: '',
    dueDate: '',
    amount: '',
    fineType: 'None',
    percentage: '',
    fixAmount: ''
  });
  const [feesMasters, setFeesMasters] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Dropdown Options
  const feesGroups = [
    'Class 1 General',
    'Class 1 Lump Sum',
    'Class 1 Installment',
    'Class 4 Discount',
    'Class 4 March Fees',
    'Class 4 Exam Fees',
    'Class 4 Transport Fees',
    'Class 5 General',
    'Class 5 Lab Fees'
  ];

  const feesTypes = [
    'Admission Fees',
    'Monthly Fees',
    'Exam Fees',
    'Transport Fees',
    'Lab Fees',
    'Library Fees',
    'Sports Fees',
    'Development Fees'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.feesGroup || !formData.feesType || !formData.dueDate || !formData.amount) {
      alert('Please fill all required fields');
      return;
    }

    const newMaster = {
      ...formData,
      feesCode: `${formData.feesType.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
      perDay: 'No',
      fineAmount: formData.fineType === 'Percentage' ? formData.percentage : 
                 formData.fineType === 'Fix Amount' ? formData.fixAmount : 0
    };

    if (editingIndex !== null) {
      // Update existing entry
      const updatedMasters = [...feesMasters];
      updatedMasters[editingIndex] = newMaster;
      setFeesMasters(updatedMasters);
      setEditingIndex(null);
    } else {
      // Add new entry
      setFeesMasters([...feesMasters, newMaster]);
    }

    // Reset form
    setFormData({
      feesGroup: '',
      feesType: '',
      dueDate: '',
      amount: '',
      fineType: 'None',
      percentage: '',
      fixAmount: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(feesMasters[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedMasters = feesMasters.filter((_, i) => i !== index);
    setFeesMasters(updatedMasters);
  };

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem',
      backgroundColor: '#e8c897',
      minHeight: '100vh'
    },
    header: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#2d3748'
    },
    formContainer: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4a5568'
    },
    input: {
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#4299e1',
        boxShadow: '0 0 0 2px rgba(66,153,225,0.2)'
      }
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    tableHeader: {
      backgroundColor: '#4299e1',
      color: 'white',
      padding: '0.75rem',
      textAlign: 'left',
      fontSize: '0.875rem'
    },
    tableCell: {
      padding: '0.75rem',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '0.875rem',
      color: '#2d3748'
    },
    actionButton: {
      backgroundColor: '#48bb78',
      color: 'white',
      border: 'none',
      padding: '0.375rem 0.75rem',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '0 0.25rem',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#38a169'
      }
    },
    deleteButton: {
      backgroundColor: '#f56565',
      ':hover': {
        backgroundColor: '#e53e3e'
      }
    },
    recordsCount: {
      marginTop: '1rem',
      color: '#718096',
      fontSize: '0.875rem'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Add Fees Master : 2024-25</h1>
      
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Fees Group *</label>
              <select 
                style={styles.input}
                value={formData.feesGroup}
                onChange={(e) => setFormData({...formData, feesGroup: e.target.value})}
                required
              >
                <option value="">Select</option>
                {feesGroups.map((group, index) => (
                  <option key={index} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Fees Type *</label>
              <select 
                style={styles.input}
                value={formData.feesType}
                onChange={(e) => setFormData({...formData, feesType: e.target.value})}
                required
              >
                <option value="">Select</option>
                {feesTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Due Date *</label>
              <input
                type="date"
                style={styles.input}
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Amount ($) *</label>
              <input
                type="number"
                style={styles.input}
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
              />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Fine Type *</label>
              <select
                style={styles.input}
                value={formData.fineType}
                onChange={(e) => setFormData({...formData, fineType: e.target.value})}
              >
                <option value="None">None</option>
                <option value="Percentage">Percentage</option>
                <option value="Fix Amount">Fix Amount</option>
              </select>
            </div>

            {formData.fineType === 'Percentage' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Percentage (%) *</label>
                <input
                  type="number"
                  style={styles.input}
                  value={formData.percentage}
                  onChange={(e) => setFormData({...formData, percentage: e.target.value})}
                  required
                />
              </div>
            )}

            {formData.fineType === 'Fix Amount' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Fix Amount ($) *</label>
                <input
                  type="number"
                  style={styles.input}
                  value={formData.fixAmount}
                  onChange={(e) => setFormData({...formData, fixAmount: e.target.value})}
                  required
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            style={{...styles.actionButton, width: '100px'}}
          >
            {editingIndex !== null ? 'Update' : 'Save'}
          </button>
        </form>
      </div>

      <h2 style={styles.header}>Fees Master List : 2024-25</h2>
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Fees Group</th>
            <th style={styles.tableHeader}>Fees Code</th>
            <th style={styles.tableHeader}>Amount</th>
            <th style={styles.tableHeader}>Fine Type</th>
            <th style={styles.tableHeader}>Due Date</th>
            <th style={styles.tableHeader}>Per Day</th>
            <th style={styles.tableHeader}>Fine Amount</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {feesMasters.map((master, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{master.feesGroup}</td>
              <td style={styles.tableCell}>{master.feesCode}</td>
              <td style={styles.tableCell}>${parseFloat(master.amount).toFixed(2)}</td>
              <td style={styles.tableCell}>{master.fineType}</td>
              <td style={styles.tableCell}>
                {new Date(master.dueDate).toLocaleDateString('en-GB')}
              </td>
              <td style={styles.tableCell}>{master.perDay}</td>
              <td style={styles.tableCell}>
                {master.fineAmount ? `$${parseFloat(master.fineAmount).toFixed(2)}` : '-'}
              </td>
              <td style={styles.tableCell}>
                <button 
                  style={styles.actionButton}
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button 
                  style={{...styles.actionButton, ...styles.deleteButton}}
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.recordsCount}>
        Showing {feesMasters.length} records
      </div>
    </div>
  );
};

export default FeesMaster;