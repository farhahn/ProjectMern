import React from "react";

const SearchFeesPayment = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Fees Payment</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>
          Payment ID <span style={styles.required}>*</span>
        </label>
        <input type="text" style={styles.input} placeholder="Enter Payment ID" />
        <button style={styles.button}>
          <span style={styles.icon}>🔍</span> Search
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "90%",
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#e8c897",
    textAlign: "center",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  required: {
    color: "red",
  },
  input: {
    width: "100%",
    maxWidth: "300px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  icon: {
    marginRight: "5px",
  },
};

// Add hover effect
styles.button[":hover"] = styles.buttonHover;

export default SearchFeesPayment;
