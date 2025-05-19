import React, { useState, useEffect } from 'react';
import { Search, Add, DateRange, ArrowDropDown } from '@mui/icons-material';

const SearchExpensesPage = () => {
  const [searchType, setSearchType] = useState('last6months');
  const [searchQuery, setSearchQuery] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  // Sample expenses data (replace with your actual data source)
  const sampleExpenses = [
    // Add your expense data here
  ];

  const timeFilters = [
    { value: 'today', label: 'Today' },
    { value: 'thisweek', label: 'This Week' },
    { value: 'lastweek', label: 'Last Week' },
    { value: 'thismonth', label: 'This Month' },
    { value: 'lastmonth', label: 'Last Month' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'last12months', label: 'Last 12 Months' },
    { value: 'custom', label: 'Custom Date' },
    { value: 'byExpense', label: 'Search by Expense' }
  ];

  const getDateRange = (filter) => {
    const today = new Date();
    switch(filter) {
      case 'today':
        return {
          start: new Date(today.setHours(0, 0, 0, 0)),
          end: new Date(today.setHours(23, 59, 59, 999))
        };
      case 'thisweek':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        return {
          start: new Date(startOfWeek.setHours(0, 0, 0, 0)),
          end: new Date(today.setHours(23, 59, 59, 999))
        };
      case 'lastweek':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7 - today.getDay());
        return {
          start: new Date(lastWeek.setHours(0, 0, 0, 0)),
          end: new Date(lastWeek.setDate(lastWeek.getDate() + 6))
        };
      case 'thismonth':
        return {
          start: new Date(today.getFullYear(), today.getMonth(), 1),
          end: new Date(today.getFullYear(), today.getMonth() + 1, 0)
        };
      case 'lastmonth':
        return {
          start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
          end: new Date(today.getFullYear(), today.getMonth(), 0)
        };
      case 'last6months':
        return {
          start: new Date(today.setMonth(today.getMonth() - 6)),
          end: new Date()
        };
      case 'last12months':
        return {
          start: new Date(today.setMonth(today.getMonth() - 12)),
          end: new Date()
        };
      case 'custom':
        return {
          start: new Date(customStartDate),
          end: new Date(customEndDate)
        };
      default:
        return { start: null, end: null };
    }
  };

  const handleSearch = () => {
    let results = [];
    
    if (searchType === 'byExpense') {
      results = sampleExpenses.filter(expense =>
        Object.values(expense).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      const { start, end } = getDateRange(searchType);
      results = sampleExpenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= start && expenseDate <= end;
      });
    }
    
    setFilteredExpenses(results);
  };

  useEffect(() => {
    handleSearch();
  }, [searchType, searchQuery, customStartDate, customEndDate]);

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
    selectContainer: {
      position: 'relative',
      marginBottom: '20px',
      width: '100%',
      maxWidth: '300px'
    },
    select: {
      width: '100%',
      padding: '12px 40px 12px 15px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      appearance: 'none',
      backgroundColor: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      '&:hover': {
        borderColor: '#3498db'
      }
    },
    dropdownIcon: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: '#666'
    },
    searchInput: {
      width: '100%',
      padding: '10px 40px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      margin: '15px 0',
      fontSize: '16px'
    },
    customDateContainer: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      margin: '15px 0'
    },
    dateInput: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      cursor: 'pointer',
      fontSize: '14px'
    },
    searchButton: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '12px 25px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: '#2980b9'
      }
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
    tableCell: {
      padding: '15px',
      textAlign: 'left',
      borderBottom: '1px solid #ddd'
    },
    noData: {
      textAlign: 'center',
      padding: '50px',
      color: '#666',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formSection}>
        <h2 style={styles.sectionTitle}>Select Search Criteria</h2>
        
        <div style={styles.selectContainer}>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={styles.select}
          >
            {timeFilters.map(filter => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          <ArrowDropDown style={styles.dropdownIcon} />
        </div>

        {searchType === 'byExpense' && (
          <div style={{ position: 'relative' }}>
            <Search style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666',
              zIndex: 1
            }}/>
            <input
              type="text"
              placeholder="Search expenses by name, description, or amount..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {searchType === 'custom' && (
          <div style={styles.customDateContainer}>
            <input
              type="date"
              style={styles.dateInput}
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              style={styles.dateInput}
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              min={customStartDate}
            />
          </div>
        )}

        <button 
          onClick={handleSearch}
          style={styles.searchButton}
        >
          <Search /> Search Now
        </button>
      </div>

      <div style={styles.formSection}>
        <h2 style={styles.sectionTitle}>Expense List</h2>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Invoice Number</th>
              <th style={styles.tableHeader}>Expense Head</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.noData}>
                  <p>No matching expenses found</p>
                  <button 
                    style={{ 
                      ...styles.searchButton,
                      marginTop: '15px',
                      backgroundColor: '#27ae60'
                    }}
                  >
                    <Add /> Add New Expense
                  </button>
                  <p style={{ marginTop: '10px' }}>or try different search criteria</p>
                </td>
              </tr>
            ) : (
              filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td style={styles.tableCell}>{expense.name}</td>
                  <td style={styles.tableCell}>{expense.invoiceNumber}</td>
                  <td style={styles.tableCell}>{expense.expenseHead}</td>
                  <td style={styles.tableCell}>
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td style={styles.tableCell}>
                    ${parseFloat(expense.amount).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchExpensesPage;