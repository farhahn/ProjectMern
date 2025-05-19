import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";

const BulkDeleteStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [visibleColumns, setVisibleColumns] = useState({
    admissionNo: true,
    name: true,
    class: true,
    dob: true,
    gender: true,
    mobile: true,
  });
  const headerRowStyle = {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px",
  };
  const cellStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  };
  const emptyCellStyle = {
    backgroundColor: "#f8f9fa",
    color: "#999",
    textAlign: "center",
    padding: "10px",
    border: "1px solid #ddd",
  };
  const rowStyle = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  };
    
  

  useEffect(() => {
    const fetchStudents = async () => {
      const data = [
        { id: 1001, name: "Hudson", class: "Class 1(A)", dob: "02/06/2019", gender: "Male", mobile: "16514840184" },
        { id: 1020, name: "Marlie", class: "Class 1(A)", dob: "05/22/2019", gender: "Female", mobile: "6595084801" },
        { id: 120036, name: "Ayan Desai", class: "Class 1(A)", dob: "10/15/2015", gender: "Male", mobile: "9067875674" },
        { id: 2152, name: "Kaylen", class: "Class 1(A)", dob: "06/19/2019", gender: "Female", mobile: "54180185420" },
        { id: 7663, name: "Paul S. Bealer", class: "Class 1(A)", dob: "08/13/2005", gender: "Male", mobile: "789067867" },
        { id: 96302, name: "Jacob Bethell", class: "Class 1(A)", dob: "08/19/2016", gender: "Male", mobile: "065758878" }
      ];
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const handleSelect = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedStudents(e.target.checked ? students.map((s) => s.id) : []);
  };

  const handleDeleteSelected = () => {
    if (selectedStudents.length === 0) {
      alert("No students selected for deletion.");
      return;
    }
    setStudents(students.filter((s) => !selectedStudents.includes(s.id)));
    setSelectedStudents([]);
  };

  const exportToCSV = () => {
    const csvData = students.map((student) => ({
      "Admission No": student.id,
      Name: student.name,
      Class: student.class,
      "Date of Birth": student.dob,
      Gender: student.gender,
      "Mobile Number": student.mobile,
    }));
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "Students_Data.xlsx");
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ padding: "25px", maxWidth: "950px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ 
        fontSize: "24px", fontWeight: "bold", textAlign: "center", 
        padding: "15px", background: "linear-gradient(90deg, #4CAF50, #2196F3)", 
        color: "white", borderRadius: "8px", marginBottom: "20px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.2)"
      }}>
        Bulk Delete Students
      </h2>

      {/* Top Controls (Search + Export + Column Toggle) */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchBarStyle}
        />
        
        <div>
          <button onClick={() => navigator.clipboard.writeText(JSON.stringify(students, null, 2))} style={buttonStyle}>📋 Copy</button>
          <button onClick={exportToCSV} style={buttonStyle}>📊 Excel</button>
          <button onClick={() => alert("CSV Export Coming Soon!")} style={buttonStyle}>📄 CSV</button>
          <button onClick={() => window.print()} style={buttonStyle}>🖨️ Print</button>
        </div>
      </div>

      {/* Column Visibility */}
      <div style={{ marginBottom: "10px" }}>
        {Object.keys(visibleColumns).map((col) => (
          <label key={col} style={{ marginRight: "10px", fontSize: "14px" }}>
            <input 
              type="checkbox" 
              checked={visibleColumns[col]} 
              onChange={() => setVisibleColumns({ ...visibleColumns, [col]: !visibleColumns[col] })}
            /> {col.charAt(0).toUpperCase() + col.slice(1)}
          </label>
        ))}
      </div>

      {/* Students Table */}
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={cellStyle}><input type="checkbox" onChange={handleSelectAll} checked={selectedStudents.length === students.length && students.length > 0} /></th>
            {visibleColumns.admissionNo && <th style={cellStyle}>Admission No</th>}
            {visibleColumns.name && <th style={cellStyle}>Student Name</th>}
            {visibleColumns.class && <th style={cellStyle}>Class</th>}
            {visibleColumns.dob && <th style={cellStyle}>Date of Birth</th>}
            {visibleColumns.gender && <th style={cellStyle}>Gender</th>}
            {visibleColumns.mobile && <th style={cellStyle}>Mobile Number</th>}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id} style={rowStyle}>
                <td style={cellStyle}>
                  <input type="checkbox" checked={selectedStudents.includes(student.id)} onChange={() => handleSelect(student.id)} />
                </td>
                {visibleColumns.admissionNo && <td style={cellStyle}>{student.id}</td>}
                {visibleColumns.name && <td style={cellStyle}>{student.name}</td>}
                {visibleColumns.class && <td style={cellStyle}>{student.class}</td>}
                {visibleColumns.dob && <td style={cellStyle}>{student.dob}</td>}
                {visibleColumns.gender && <td style={cellStyle}>{student.gender}</td>}
                {visibleColumns.mobile && <td style={cellStyle}>{student.mobile}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={emptyCellStyle}>No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const searchBarStyle = { padding: "10px", width: "250px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "14px" };
const buttonStyle = { padding: "8px 12px", margin: "5px", borderRadius: "5px", cursor: "pointer", backgroundColor: "#3498db", color: "white", border: "none", fontSize: "14px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" };

export default BulkDeleteStudents;
