import React, { useState } from 'react';

const SearchDuesFees = () => {
  const [selectedFeeGroup, setSelectedFeeGroup] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Options Data
  const feeGroups = ['Select All', 'Admission Fees', 'January Fees', 'February Fees', 
                    'March Fees', 'April Fees', 'May Fees', 'June Fees', 'July Fees', 
                    'August Fees', 'September Fees', 'October Fees', 'November Fees', 
                    'December Fees'];

  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sections = ['A', 'B', 'C', 'D'];

  // Comprehensive Demo Data
  const students = [
    {
      class: 'Class 1-B',
      admissionNo: 980867,
      name: 'Vinni Khatri',
      feeGroups: ['Admission Fees', 'April Fees', 'May Fees', 'June Fees'],
      amount: 5300.00,
      paid: 1200.00,
      discount: 300.00,
      fine: 50.00,
      balance: 3750.00
    },
    {
      class: 'Class 2-A',
      admissionNo: 120945,
      name: 'Rahul Sharma',
      feeGroups: ['Admission Fees', 'January Fees', 'February Fees'],
      amount: 4200.00,
      paid: 4200.00,
      discount: 200.00,
      fine: 0.00,
      balance: 0.00
    },
    {
      class: 'Class 3-C',
      admissionNo: 450231,
      name: 'Priya Patel',
      feeGroups: ['July Fees', 'August Fees', 'September Fees'],
      amount: 3800.00,
      paid: 2500.00,
      discount: 0.00,
      fine: 100.00,
      balance: 1400.00
    },
    {
      class: 'Class 4-D',
      admissionNo: 670512,
      name: 'Aarav Gupta',
      feeGroups: ['Admission Fees', 'March Fees', 'April Fees', 'May Fees'],
      amount: 4900.00,
      paid: 3000.00,
      discount: 500.00,
      fine: 75.00,
      balance: 1475.00
    },
    {
      class: 'Class 5-A',
      admissionNo: 890345,
      name: 'Ananya Singh',
      feeGroups: ['October Fees', 'November Fees', 'December Fees'],
      amount: 4100.00,
      paid: 4100.00,
      discount: 0.00,
      fine: 0.00,
      balance: 0.00
    }
  ];

  // Filter students
  const filteredStudents = students.filter(student => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      student.name.toLowerCase().includes(searchLower) ||
      student.admissionNo.toString().includes(searchQuery) ||
      student.class.toLowerCase().includes(searchLower);

    const matchesClass = !selectedClass || student.class.includes(selectedClass);
    const sectionPart = student.class.split('-')[1];
    const matchesSection = !selectedSection || sectionPart === selectedSection;
    const matchesFeeGroup = !selectedFeeGroup || 
      (selectedFeeGroup === 'Select All' ? true : 
      student.feeGroups.includes(selectedFeeGroup));

    return matchesSearch && matchesClass && matchesSection && matchesFeeGroup;
  });

  // Styles
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem',
      backgroundColor: '#e8c897',
      minHeight: '100vh',
    },
    header: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '2rem',
      textAlign: 'center',
      letterSpacing: '-0.5px'
    },
    filtersContainer: {
      display: 'flex',
      gap: '1.5rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      minWidth: '200px'
    },
    filterLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#64748b'
    },
    select: {
      padding: '0.625rem 1rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      backgroundColor: 'white',
      fontSize: '0.875rem',
      color: '#1e293b',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      ':hover': { borderColor: '#94a3b8' },
      ':focus': {
        outline: 'none',
        borderColor: '#6366f1',
        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.1)'
      }
    },
    searchContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      maxWidth: '500px',
      position: 'relative'
    },
    searchInput: {
      flex: 1,
      padding: '0.875rem 1.25rem 0.875rem 2.5rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '0.875rem',
      color: '#1e293b',
      transition: 'all 0.2s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#6366f1',
        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.1)'
      }
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748b',
      zIndex: 2
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    },
    tableHeader: {
      backgroundColor: '#6366f1',
      color: 'white',
      padding: '1rem 1.25rem',
      textAlign: 'left',
      fontWeight: '500',
      fontSize: '0.875rem'
    },
    tableRow: {
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#f8fafc'
      }
    },
    tableCell: {
      padding: '1rem 1.25rem',
      fontSize: '0.875rem',
      color: '#334155',
      borderBottom: '1px solid #f1f5f9'
    },
    feeGroupList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      maxHeight: '120px',
      overflowY: 'auto',
      '::-webkit-scrollbar': {
        width: '6px'
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f5f9'
      },
      '::-webkit-scrollbar-thumb': {
        background: '#cbd5e1',
        borderRadius: '4px'
      }
    },
    feeGroupItem: {
      padding: '0.25rem 0',
      fontSize: '0.75rem',
      color: '#475569'
    },
    actionButton: {
      background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.75rem',
      transition: 'all 0.2s ease',
      ':hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 4px rgba(99, 102, 241, 0.2)'
      }
    },
    recordsCount: {
      marginTop: '1.5rem',
      color: '#64748b',
      fontSize: '0.875rem',
      textAlign: 'center',
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Student Dues Management System</h1>
      
      <div style={styles.filtersContainer}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Fee Group</label>
          <select 
            style={styles.select}
            value={selectedFeeGroup}
            onChange={(e) => setSelectedFeeGroup(e.target.value)}
          >
            {feeGroups.map((group, index) => (
              <option key={index} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Class</label>
          <select
            style={styles.select}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Section</label>
          <select
            style={styles.select}
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">All Sections</option>
            {sections.map((section, index) => (
              <option key={index} value={section}>{section}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.searchContainer}>
        <svg style={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Search students..."
          style={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Class</th>
            <th style={styles.tableHeader}>Admission No</th>
            <th style={styles.tableHeader}>Student Name</th>
            <th style={styles.tableHeader}>Fee Groups</th>
            <th style={styles.tableHeader}>Amount (₹)</th>
            <th style={styles.tableHeader}>Paid (₹)</th>
            <th style={styles.tableHeader}>Discount (₹)</th>
            <th style={styles.tableHeader}>Fine (₹)</th>
            <th style={styles.tableHeader}>Balance (₹)</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableCell}>{student.class}</td>
              <td style={styles.tableCell}>{student.admissionNo}</td>
              <td style={styles.tableCell}>{student.name}</td>
              <td style={styles.tableCell}>
                <ul style={styles.feeGroupList}>
                  {student.feeGroups.map((group, idx) => (
                    <li key={idx} style={styles.feeGroupItem}>• {group}</li>
                  ))}
                </ul>
              </td>
              <td style={styles.tableCell}>{student.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              <td style={styles.tableCell}>{student.paid.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              <td style={styles.tableCell}>{student.discount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              <td style={styles.tableCell}>{student.fine.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              <td style={styles.tableCell}>{student.balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              <td style={styles.tableCell}>
                <button 
                  style={styles.actionButton}
                  onClick={() => console.log(`Initiate payment for ₹{student.name}`)}
                >
                  Add Payment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.recordsCount}>
        Showing {filteredStudents.length} of {students.length} records
      </div>
    </div>
  );
};

export default SearchDuesFees;