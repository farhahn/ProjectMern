import React, { useState } from "react";

const StudentSearch = () => {
  const allStudents = [
    { id: 1, name: "Alexander Kayla", roll: 18078, class: "Class 2", section: "A" },
    { id: 2, name: "Suresh Patel", roll: 90775, class: "Class 2", section: "A" },
    { id: 3, name: "Anjali Sharma", roll: 56432, class: "Class 3", section: "B" },
    { id: 4, name: "Rahul Verma", roll: 88991, class: "Class 1", section: "A" },
  ];

  const [selectedClass, setSelectedClass] = useState("Class 2");
  const [selectedSection, setSelectedSection] = useState("A");
  const [students, setStudents] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSearch = () => {
    const filteredStudents = allStudents.filter(
      (student) => student.class === selectedClass && student.section === selectedSection
    );
    setStudents(filteredStudents);
  };

  const handleUpdateStudent = (id, newClass, newSection) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, class: newClass, section: newSection } : student
      )
    );
    showPopup("✅ Student updated successfully!");
  };

  const handleRemoveStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    showPopup("❌ Student removed!");
  };

  const handleAddStudent = () => {
    const newStudent = {
      id: Date.now(),
      name: "New Student",
      roll: Math.floor(10000 + Math.random() * 90000),
      class: selectedClass,
      section: selectedSection,
    };
    setStudents([...students, newStudent]);
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎓 Select Student Criteria</h2>
      <div style={styles.searchBox}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Class *</label>
          <select
            style={styles.select}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option>Class 1</option>
            <option>Class 2</option>
            <option>Class 3</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Section *</label>
          <select
            style={styles.select}
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
        <button style={styles.searchButton} onClick={handleSearch}>🔍 Search</button>
      </div>

      <h2 style={styles.heading}>📜 Selected Students</h2>
      <div style={styles.studentList}>
        {students.length > 0 ? (
          students.map((student) => (
            <StudentCard key={student.id} student={student} onUpdate={handleUpdateStudent} onRemove={handleRemoveStudent} />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>No students found for this class & section.</p>
        )}
      </div>

      <button style={styles.addButton} onClick={handleAddStudent}>➕ Add Student</button>

      {popupMessage && <div style={styles.popup}>{popupMessage}</div>}
    </div>
  );
};

const StudentCard = ({ student, onUpdate, onRemove }) => {
  const [studentClass, setStudentClass] = useState(student.class);
  const [studentSection, setStudentSection] = useState(student.section);

  return (
    <div style={styles.studentCard}>
      <h3 style={styles.studentName}>
        {student.name} <span style={styles.roll}>({student.roll})</span>
      </h3>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Class</label>
        <select
          style={styles.select}
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        >
          <option>Class 1</option>
          <option>Class 2</option>
          <option>Class 3</option>
        </select>
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Section</label>
        <select
          style={styles.select}
          value={studentSection}
          onChange={(e) => setStudentSection(e.target.value)}
        >
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>
      <div style={styles.buttonGroup}>
        <button
          style={styles.updateButton}
          onClick={() => onUpdate(student.id, studentClass, studentSection)}
        >
          ✏️
        </button>
        <button
          style={styles.removeButton}
          onClick={() => onRemove(student.id)}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg,rgb(240, 200, 121), #d3e0ff)",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "5px",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #bbb",
    fontSize: "14px",
    backgroundColor: "#f9f9f9",
  },
  searchButton: {
    padding: "10px 15px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  studentList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
  },
  studentCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  addButton: {
    display: "block",
    margin: "20px auto",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    background: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  popup: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#333",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
  },
};

export default StudentSearch;
