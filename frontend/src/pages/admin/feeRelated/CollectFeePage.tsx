import React, { useState } from 'react';

const CollectFeePage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [students] = useState([
    {
      admissionNo: 1205,
      name: 'Hazel',
      fatherName: 'Lister',
      dob: '06/19/2019',
      mobile: '6595048420'
    },
    {
      admissionNo: 5482,
      name: 'Mayer',
      fatherName: 'Medison',
      dob: '06/13/2019',
      mobile: '5360648401'
    },
    {
      admissionNo: 980867,
      name: 'Vinni Kharri',
      fatherName: 'Suresh',
      dob: '01/07/2019',
      mobile: '89089795'
    }
  ]);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchKeyword) ||
    student.admissionNo.toString().includes(searchKeyword) ||
    student.fatherName.toLowerCase().includes(searchKeyword)
  );

  // Styling
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem',
      backgroundColor: '#e8c897',
      minHeight: '100vh',
    },
    header: {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    filters: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '2rem',
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    select: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '2px solid #e0e0e0',
      backgroundColor: '#f8f9fa',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
    },
    searchBar: {
      position: 'relative',
      marginBottom: '2rem',
    },
    searchInput: {
      width: '100%',
      padding: '0.8rem 1.5rem 0.8rem 3rem',
      borderRadius: '30px',
      border: '2px solid #e0e0e0',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#95a5a6',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    tableHeader: {
      backgroundColor: '#4a90e2',
      color: 'white',
      padding: '1rem',
      textAlign: 'left',
      fontWeight: '500',
    },
    tableCell: {
      padding: '1rem',
      borderBottom: '1px solidrgb(234, 200, 115)',
      color: '#2c3e50',
    },
    actionButton: {
      background: 'linear-gradient(135deg,rgb(64, 230, 64) 0%, #63b4ff 100%)',
      color: 'white',
      border: 'none',
      padding: '0.6rem 1.2rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
    },
    recordsCount: {
      marginTop: '1.5rem',
      color: '#95a5a6',
      fontSize: '0.9rem',
      textAlign: 'center',
      padding: '0.8rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Student Fee Collection</h1>
      
      <div style={styles.filters}>
        <div>
          <select style={styles.select} defaultValue="Class 1">
            <option>Class 1</option>
          </select>
        </div>
        <div>
          <select style={styles.select} defaultValue="B">
            <option>B</option>
          </select>
        </div>
      </div>

      <div style={styles.searchBar}>
        <svg style={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Search students..."
          style={styles.searchInput}
          value={searchKeyword}
          onChange={handleSearch}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Class</th>
            <th style={styles.tableHeader}>Section</th>
            <th style={styles.tableHeader}>Admission No</th>
            <th style={styles.tableHeader}>Student Name</th>
            <th style={styles.tableHeader}>Father Name</th>
            <th style={styles.tableHeader}>Date of Birth</th>
            <th style={styles.tableHeader}>Mobile No.</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>Class 1</td>
              <td style={styles.tableCell}>B</td>
              <td style={styles.tableCell}>{student.admissionNo}</td>
              <td style={styles.tableCell}>{student.name}</td>
              <td style={styles.tableCell}>{student.fatherName}</td>
              <td style={styles.tableCell}>{student.dob}</td>
              <td style={styles.tableCell}>{student.mobile}</td>
              <td style={styles.tableCell}>
                <button 
                  style={styles.actionButton}
                  onClick={() => console.log(`Collect fee for ${student.name}`)}
                >
                  Collect Fee
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.recordsCount}>
        Showing {filteredStudents.length} of {filteredStudents.length} records
      </div>
    </div>
  );
};

export default CollectFeePage;