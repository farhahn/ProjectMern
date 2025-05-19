import React, { useState } from "react";
import { FaSearch, FaUserGraduate, FaPlus, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const StudentDetail = () => {
  const [classSelected, setClassSelected] = useState("");
  const [sectionSelected, setSectionSelected] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);

  const styles = {
    page: {
      background: "#e8c897",
      minHeight: "100vh",
      padding: "40px 0",
    },
    container: {
      maxWidth: "1000px",
      margin: "auto",
      padding: "20px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    title: { textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
    filtersCard: { background: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", marginBottom: "20px" },
    filters: { display: "flex", gap: "10px", flexWrap: "wrap" },
    filterGroup: { flex: "1", minWidth: "150px" },
    label: { display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "5px" },
    input: { width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" },
    searchBox: { display: "flex" },
    searchInput: { flex: "1", padding: "8px", border: "1px solid #ccc", borderRadius: "5px 0 0 5px" },
    searchButton: { background: "#007bff", color: "white", border: "none", padding: "8px 12px", cursor: "pointer", borderRadius: "0 5px 5px 0" },
    studentList: { background: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
    listHeader: { display: "flex", justifyContent: "space-between", borderBottom: "2px solid #ddd", paddingBottom: "8px", marginBottom: "10px" },
    addButton: { background: "#28a745", color: "white", border: "none", padding: "8px 12px", cursor: "pointer", borderRadius: "5px", display: "flex", alignItems: "center" },
    tableContainer: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse" },
    thTd: { border: "1px solid #ddd", padding: "10px", textAlign: "left" },
    th: { background: "#007bff", color: "white" },
    trHover: { background: "#f9f9f9" },
    viewButton: { background: "#007bff", color: "white", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "5px" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>🎓 Student Details</h2>

        {/* Filters Section */}
        <div style={styles.filtersCard}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>Select Criteria</h3>
          <div style={styles.filters}>
            <div style={styles.filterGroup}>
              <label style={styles.label}>Class *</label>
              <select style={styles.input} value={classSelected} onChange={(e) => setClassSelected(e.target.value)}>
                <option value="">Select Class</option>
                <option value="10">Class 10</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Section</label>
              <select style={styles.input} value={sectionSelected} onChange={(e) => setSectionSelected(e.target.value)}>
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Search</label>
              <div style={styles.searchBox}>
                <input type="text" placeholder="Search by Name, Roll No, etc." style={styles.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button style={styles.searchButton}><FaSearch /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Student List Section */}
        <div style={styles.studentList}>
          <div style={styles.listHeader}>
            <h3>Students List</h3>
            <Link to="/Admin/studentall/studentdetailpage" style={{ textDecoration: "none" }}>
              <button style={styles.viewButton}>View All</button>
            </Link>
            <button style={styles.addButton}><FaPlus /> Add New</button>
          </div>

          {/* Student Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.thTd}>Admission No</th>
                  <th style={styles.thTd}>Student Name</th>
                  <th style={styles.thTd}>Roll No.</th>
                  <th style={styles.thTd}>Class</th>
                  <th style={styles.thTd}>Father Name</th>
                  <th style={styles.thTd}>DOB</th>
                  <th style={styles.thTd}>Gender</th>
                  <th style={styles.thTd}>Mobile No</th>
                  <th style={styles.thTd}>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center", padding: "15px", fontSize: "14px", color: "#666" }}>📌 No students found</td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} style={styles.trHover}>
                      <td style={styles.thTd}>{student.admissionNo}</td>
                      <td style={styles.thTd}><FaUserGraduate style={{ color: "#007bff", marginRight: "5px" }} /> {student.name}</td>
                      <td style={styles.thTd}>{student.rollNo}</td>
                      <td style={styles.thTd}>{student.class}</td>
                      <td style={styles.thTd}>{student.fatherName}</td>
                      <td style={styles.thTd}>{student.dob}</td>
                      <td style={styles.thTd}>{student.gender}</td>
                      <td style={styles.thTd}>{student.mobile}</td>
                      <td style={styles.thTd}><button style={styles.viewButton}><FaEye /> View</button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;