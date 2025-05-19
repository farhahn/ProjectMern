import React from "react";
import { useParams, Link } from "react-router-dom";

const StudentDetailPage = () => {
  const { id } = useParams();

  // Dummy student data (in real case, fetch from API)
  const studentData = {
    1: { admissionNo: "12345", name: "John Doe", rollNo: "10", class: "12", fatherName: "Mr. Doe", dob: "2005-10-12", gender: "Male", mobile: "9876543210" },
    2: { admissionNo: "12346", name: "Jane Smith", rollNo: "15", class: "10", fatherName: "Mr. Smith", dob: "2006-08-20", gender: "Female", mobile: "9876543211" }
  };

  const student = studentData[Number(id)]; // Convert id to number

  return (
    <div style={{ background: "#e8c897", minHeight: "100vh", padding: "40px 0" }}>
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", background: "white", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>📄 Student Details</h2>

        {student ? (
          <div>
            <p><strong>Admission No:</strong> {student.admissionNo}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll No:</strong> {student.rollNo}</p>
            <p><strong>Class:</strong> {student.class}</p>
            <p><strong>Father's Name:</strong> {student.fatherName}</p>
            <p><strong>Date of Birth:</strong> {student.dob}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Mobile No:</strong> {student.mobile}</p>
          </div>
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>🚫 Student not found.</p>
        )}

        <Link to="/Admin/studentall/studentdetail" style={{ textDecoration: "none" }}>
          <button style={{ background: "#007bff", color: "white", padding: "8px 12px", border: "none", cursor: "pointer", borderRadius: "5px", marginTop: "20px" }}>
            🔙 Back to Students
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDetailPage;
