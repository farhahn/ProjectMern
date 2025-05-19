import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DisableReason = () => {
  const [reasons, setReasons] = useState([
    { id: 1, text: "Regular Absent", isEditing: false },
    { id: 2, text: "Fees Not Paid", isEditing: false },
  ]);

  const [newReason, setNewReason] = useState("");

  // Function to handle editing
  const handleEdit = (id) => {
    setReasons(
      reasons.map((reason) =>
        reason.id === id ? { ...reason, isEditing: !reason.isEditing } : reason
      )
    );
  };

  // Function to update reason text
  const handleTextChange = (id, newText) => {
    setReasons(
      reasons.map((reason) =>
        reason.id === id ? { ...reason, text: newText } : reason
      )
    );
  };

  // Function to save edited text
  const handleSave = (id) => {
    setReasons(
      reasons.map((reason) =>
        reason.id === id ? { ...reason, isEditing: false } : reason
      )
    );
  };

  // Function to delete a reason
  const handleDelete = (id) => {
    setReasons(reasons.filter((reason) => reason.id !== id));
  };

  // Function to add a new reason
  const handleAddReason = () => {
    if (newReason.trim() !== "") {
      setReasons([
        ...reasons,
        { id: reasons.length + 1, text: newReason, isEditing: false },
      ]);
      setNewReason("");
    }
  };

  // Function to export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Disable Reason List", 10, 10);
    doc.autoTable({
      head: [["Disable Reason"]],
      body: reasons.map((r) => [r.text]),
    });
    doc.save("DisableReasonList.pdf");
  };

  return (
    <div style={{ backgroundColor: "#e8c897", padding: "20px", borderRadius: "8px" }}>
      <h2>Disable Reason</h2>

      {/* Input for adding new reasons */}
      <input
        type="text"
        value={newReason}
        onChange={(e) => setNewReason(e.target.value)}
        placeholder="Enter new reason"
        style={{ marginRight: "10px", padding: "5px", borderRadius: "5px" }}
      />
      <button onClick={handleAddReason} style={{ padding: "5px 10px", cursor: "pointer" }}>
        Save
      </button>

      {/* Reason List Table */}
      <table border="1" style={{ width: "100%", marginTop: "20px", background: "#fff" }}>
        <thead>
          <tr>
            <th>Disable Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reasons.map((reason) => (
            <tr key={reason.id}>
              <td>
                {reason.isEditing ? (
                  <input
                    type="text"
                    value={reason.text}
                    onChange={(e) => handleTextChange(reason.id, e.target.value)}
                  />
                ) : (
                  reason.text
                )}
              </td>
              <td>
                {reason.isEditing ? (
                  <button onClick={() => handleSave(reason.id)}>✔️ Save</button>
                ) : (
                  <button onClick={() => handleEdit(reason.id)}>✏️ Edit</button>
                )}
                <button onClick={() => handleDelete(reason.id)}>❌ Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Options */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={exportPDF} style={{ marginRight: "10px" }}>📄 Export PDF</button>
        <button onClick={() => window.print()} style={{ marginRight: "10px" }}>🖨️ Print</button>
        <button onClick={() => navigator.clipboard.writeText(JSON.stringify(reasons))}>
          📋 Copy
        </button>
      </div>
    </div>
  );
};

export default DisableReason;
