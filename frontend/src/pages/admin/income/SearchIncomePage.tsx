import React, { useState, useMemo } from 'react';

const SearchIncomePage = () => {
  const [searchType, setSearchType] = useState('Last 12 Months');
  const [searchQuery, setSearchQuery] = useState('');

  const [data] = useState([
    {
      Name: 'Online classes',
      InvoiceNumber: '475',
      IncomeHead: 'Miscellaneous',
      Date: '06/15/2024',
      Amount: 200.00,
    },
    {
      Name: 'Extra curricular activities',
      InvoiceNumber: '45352',
      IncomeHead: 'Miscellaneous',
      Date: '06/25/2024',
      Amount: 200.00,
    },
  ]);

  const filteredData = useMemo(() => {
    let result = [...data];
    const currentDate = new Date();

    if (searchType.includes('Months')) {
      const monthsAgo = new Date();
      const monthsCount = parseInt(searchType.split(' ')[1]);
      monthsAgo.setMonth(currentDate.getMonth() - monthsCount);

      result = result.filter(entry => {
        const [month, day, year] = entry.Date.split('/').map(Number);
        const entryDate = new Date(year, month - 1, day);
        return entryDate >= monthsAgo;
      });
    } else if (searchType === 'Search') {
      const query = searchQuery.toLowerCase();
      result = result.filter(entry => 
        entry.Name.toLowerCase().includes(query) ||
        entry.InvoiceNumber.toLowerCase().includes(query)
      );
    } else if (searchType === 'Search By Income') {
      const query = searchQuery.toLowerCase();
      result = result.filter(entry => 
        entry.IncomeHead.toLowerCase().includes(query) ||
        entry.Amount.toString().includes(searchQuery)
      );
    }

    return result;
  }, [data, searchType, searchQuery]);

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    searchSection: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      marginBottom: '20px',
    },
    dropdown: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      width: '250px',
    },
    searchInput: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      flexGrow: 1,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    thTd: {
      border: '1px solid #ddd',
      padding: '14px',
      textAlign: 'left',
    },
    th: {
      backgroundColor: '#f5f5f5',
    },
    detailsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '20px',
    },
    detailBox: {
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '6px',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      marginTop: 0,
      color: '#333',
      fontSize: '18px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchSection}>
        <select 
          style={styles.dropdown}
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option>Last 12 Months</option>
          <option>Last 6 Months</option>
          <option>Last 3 Months</option>
          <option>Search</option>
          <option>Search By Income</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={searchType.includes('Months')}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{...styles.thTd, ...styles.th}}>Name</th>
            <th style={{...styles.thTd, ...styles.th}}>Invoice Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry, index) => (
            <tr key={index}>
              <td style={styles.thTd}>{entry.Name}</td>
              <td style={styles.thTd}>{entry.InvoiceNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.detailsSection}>
        <div style={styles.detailBox}>
          <h3 style={styles.heading}>Income Head</h3>
          {filteredData.map((entry, index) => (
            <div key={index}>{entry.IncomeHead}</div>
          ))}
        </div>
        <div style={styles.detailBox}>
          <h3 style={styles.heading}>Date</h3>
          {filteredData.map((entry, index) => (
            <div key={index}>{entry.Date}</div>
          ))}
        </div>
        <div style={styles.detailBox}>
          <h3 style={styles.heading}>Amount (₹)</h3>
          {filteredData.map((entry, index) => (
            <div key={index}>₹{entry.Amount.toFixed(2)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchIncomePage;
