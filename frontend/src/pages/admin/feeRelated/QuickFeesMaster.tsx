import React, { useState } from 'react';

const QuickFeesMaster = () => {
  const [formData, setFormData] = useState({
    class: 'Class 1',
    section: 'B',
    student: '1205',
    totalFees: '',
    firstInstallment: '',
    balanceFees: '',
    installments: '1',
    dueDateDay: '3',
    fineType: 'Fix Amount',
    fineValue: ''
  });

  const students = [
    { id: '1205', name: 'Hazel (1205)' },
    { id: '1206', name: 'John (1206)' },
    { id: '1207', name: 'Emma (1207)' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem',
      maxWidth: '800px',
      margin: '2rem auto',
      backgroundColor: '#e8c897',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    header: {
      fontSize: '1.75rem',
      fontWeight: '700',
      marginBottom: '2rem',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.5rem',
      marginBottom: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      position: 'relative'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4b5563',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    input: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      fontSize: '0.875rem',
      width: '100%',
      transition: 'all 0.2s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#6366f1',
        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
      }
    },
    select: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      fontSize: '0.875rem',
      backgroundColor: 'white',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%234b5563\'%3e%3cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3e%3c/svg%3e")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 1rem center',
      backgroundSize: '1rem'
    },
    button: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '0.875rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease',
      ':hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)'
      }
    },
    required: {
      color: '#ef4444',
      fontSize: '0.75rem'
    },
    icon: {
      width: '20px',
      height: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Quick Fees Master
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          {/* Class, Section, Student */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Class
              <span style={styles.required}>*</span>
            </label>
            <select 
              style={styles.select}
              name="class"
              value={formData.class}
              onChange={handleChange}
            >
              {['Class 1', 'Class 2', 'Class 3'].map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Section
              <span style={styles.required}>*</span>
            </label>
            <select 
              style={styles.select}
              name="section"
              value={formData.section}
              onChange={handleChange}
            >
              {['A', 'B', 'C'].map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Student
              <span style={styles.required}>*</span>
            </label>
            <select
              style={styles.select}
              name="student"
              value={formData.student}
              onChange={handleChange}
            >
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.formGrid}>
          {/* Fees Fields */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Total Fees
              <span style={styles.required}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                style={styles.input}
                name="totalFees"
                value={formData.totalFees}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
              <span style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                ₹
              </span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>1st Installment</label>
            <input
              type="number"
              style={styles.input}
              name="firstInstallment"
              value={formData.firstInstallment}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Balance Fees
              <span style={styles.required}>*</span>
            </label>
            <input
              type="number"
              style={styles.input}
              name="balanceFees"
              value={formData.balanceFees}
              onChange={handleChange}
              required
              placeholder="0.00"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Installments</label>
            <select
              style={styles.select}
              name="installments"
              value={formData.installments}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.formGrid}>
          {/* Due Date and Fine */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Due Date Day</label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                style={styles.input}
                name="dueDateDay"
                value={formData.dueDateDay}
                onChange={handleChange}
                min="1"
                max="31"
              />
              <span style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                📅
              </span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Fine Type</label>
            <select
              style={styles.select}
              name="fineType"
              value={formData.fineType}
              onChange={handleChange}
            >
              <option>Fix Amount</option>
              <option>Percentage</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Fine Value</label>
            <input
              type="number"
              style={styles.input}
              name="fineValue"
              value={formData.fineValue}
              onChange={handleChange}
              placeholder={formData.fineType === 'Percentage' ? '%' : '₹'}
            />
          </div>
        </div>

        <button type="submit" style={styles.button}>
          <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Generate Installment Plan
        </button>
      </form>
    </div>
  );
};

export default QuickFeesMaster;