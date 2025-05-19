import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const StudentAdmissionForm = () => {
  const [feesVisible, setFeesVisible] = useState({});

  const toggleFeesSection = (className) => {
    setFeesVisible((prev) => ({
      ...prev,
      [className]: !prev[className],
    }));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "8px", background: "#fff" }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>🎓 Student Admission</h2>
        <button style={{ background: "#007bff", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer" }}>📂 Import Student</button>
      </div>

      {/* Form Sections */}
      {[
        ["Admission No", "Roll No", "Class", "Section"],
        ["First Name", "Last Name", "Gender", "DOB"],
        ["Route List", "Pickup Point", "Fees Month"],
      ].map((fields, index) => (
        <div key={index} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginBottom: "15px" }}>
          {fields.map((placeholder, i) => (
            placeholder === "Gender" ? (
              <select key={i} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}>
                <option>Male</option>
                <option>Female</option>
              </select>
            ) : (
              <input key={i} type={placeholder === "DOB" ? "date" : "text"} placeholder={placeholder} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
            )
          ))}
        </div>
      ))}

      {/* Fees Details */}
      <h3>💰 Fees Details</h3>
      {[...Array(9)].map((_, i) => (
        <div key={i} style={{ border: "1px solid #ddd", borderRadius: "5px", marginBottom: "10px", padding: "10px", background: "#f9f9f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => toggleFeesSection(`class${i + 1}`)}>
            <span>Class {i + 1} General</span>
            <button style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer" }}>
              {feesVisible[`class${i + 1}`] ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
          {feesVisible[`class${i + 1}`] && (
            <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              <input type="text" placeholder="Fee Type" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
              <input type="date" placeholder="Due Date" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
              <input type="number" placeholder="Amount" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
            </div>
          )}
        </div>
      ))}

      {/* Parent & Guardian Details */}
      <h3>👨‍👩‍👧 Parent & Guardian Details</h3>
      {["Father", "Mother"].map((parent, index) => (
        <div key={index} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginBottom: "15px" }}>
          <input type="text" placeholder={`${parent} Name`} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <input type="text" placeholder={`${parent} Phone`} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <input type="text" placeholder={`${parent} Occupation`} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <input type="file" style={{ padding: "10px" }} />
        </div>
      ))}

      {/* Save Button */}
      <button style={{ width: "100%", padding: "10px", borderRadius: "5px", background: "#28a745", color: "#fff", border: "none", cursor: "pointer", fontSize: "16px" }}>💾 Save</button>
    </div>
  );
};

export default StudentAdmissionForm;
