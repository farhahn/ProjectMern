import React, { useState } from 'react';

const AssignVehicle = () => {
  // Sample data
  const [routes] = useState([
    'Brooklyn Central',
    'Brooklyn East',
    'Brooklyn West',
    'Brooklyn South',
    'Brooklyn North',
  ]);
  const [vehicles] = useState(['VH4584', 'VH5645', 'VH1001', 'VH5656']);
  const [assignments, setAssignments] = useState([
    { id: 1, route: 'Brooklyn Central', vehicle: 'VH1001' },
    { id: 2, route: 'Brooklyn East', vehicle: 'VH4584' },
    { id: 3, route: 'Brooklyn West', vehicle: 'VH4584' },
    { id: 4, route: 'Brooklyn South', vehicle: 'VH5645' },
    { id: 5, route: 'Brooklyn North', vehicle: 'VH5645' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ route: '', vehicle: '' });
  const [editAssignment, setEditAssignment] = useState(null);

  // Filter assignments based on search term
  const filteredAssignments = assignments.filter(assignment =>
    assignment.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle save assignment
  const handleSave = () => {
    if (formData.route && formData.vehicle) {
      const newAssignment = {
        id: Date.now(),
        route: formData.route,
        vehicle: formData.vehicle,
      };
      setAssignments([...assignments, newAssignment]);
      setFormData({ route: '', vehicle: '' });
    } else {
      alert('Please select both route and vehicle.');
    }
  };

  // Handle edit action
  const handleEdit = (assignment) => {
    setEditAssignment({ ...assignment });
    setFormData({ route: assignment.route, vehicle: assignment.vehicle });
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (formData.route && formData.vehicle) {
      setAssignments(assignments.map(a =>
        a.id === editAssignment.id ? { ...a, route: formData.route, vehicle: formData.vehicle } : a
      ));
      setEditAssignment(null);
      setFormData({ route: '', vehicle: '' });
    } else {
      alert('Please select both route and vehicle.');
    }
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete assignment with ID: ${id}?`)) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  return (
    <div className="assign-container">
      <div className="header">
        <h2>Assign Vehicle On Route</h2>
        <h2>Vehicle Route List</h2>
      </div>
      <div className="content">
        <div className="assign-form">
          <div>
            <label>Route *</label>
            <select name="route" value={formData.route} onChange={handleChange} className="form-input">
              <option value="">Select</option>
              {routes.map(route => (
                <option key={route} value={route}>{route}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Vehicle *</label>
            <div className="vehicle-options">
              {vehicles.map(vehicle => (
                <label key={vehicle}>
                  <input
                    type="radio"
                    name="vehicle"
                    value={vehicle}
                    checked={formData.vehicle === vehicle}
                    onChange={handleChange}
                  /> {vehicle}
                </label>
              ))}
            </div>
          </div>
          <button className="save-btn" onClick={editAssignment ? handleSaveEdit : handleSave}>
            {editAssignment ? 'Update' : 'Save'}
          </button>
        </div>
        <div className="route-list">
          <div className="controls">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <table className="route-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Vehicle</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map(assignment => (
                <tr key={assignment.id} className="route-row">
                  <td>{assignment.route}</td>
                  <td>{assignment.vehicle}</td>
                  <td>
                    <button className="action-btn edit-btn" onClick={() => handleEdit(assignment)}>
                      <span role="img" aria-label="edit">✏️</span>
                    </button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(assignment.id)}>
                      <span role="img" aria-label="delete">❌</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">Records: 1 to {filteredAssignments.length} of {assignments.length}</div>
        </div>
      </div>

      {editAssignment && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Assignment</h3>
            <div>
              <label>Route *</label>
              <select name="route" value={formData.route} onChange={handleChange} className="form-input">
                <option value="">Select</option>
                {routes.map(route => (
                  <option key={route} value={route}>{route}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Vehicle *</label>
              <div className="vehicle-options">
                {vehicles.map(vehicle => (
                  <label key={vehicle}>
                    <input
                      type="radio"
                      name="vehicle"
                      value={vehicle}
                      checked={formData.vehicle === vehicle}
                      onChange={handleChange}
                    /> {vehicle}
                  </label>
                ))}
              </div>
            </div>
            <div className="popup-buttons">
              <button className="save-btn" onClick={handleSaveEdit}>Update</button>
              <button className="cancel-btn" onClick={() => {
                setEditAssignment(null);
                setFormData({ route: '', vehicle: '' });
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal CSS
const styles = `
  .assign-container {
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg,rgba(216, 166, 95, 0.85) 0%, #c3cfe2 100%);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }

  .header h2 {
    margin: 0;
    font-size: 1.5em;
    color: #333;
  }

  .content {
    display: flex;
    gap: 20px;
  }

  .assign-form {
    flex: 1;
    background: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .assign-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }

  .form-input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9em;
  }

  .vehicle-options {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .vehicle-options label {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .save-btn {
    padding: 8px 15px;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    width: 100%;
  }

  .save-btn:hover {
    background-color: #5a6268;
  }

  .route-list {
    flex: 2;
    background: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .controls {
    margin-bottom: 10px;
  }

  .search-input {
    padding: 8px;
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9em;
  }

  .route-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 0.85em;
  }

  .route-table th,
  .route-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .route-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .route-row:hover {
    background-color: #f9f9f9;
  }

  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1em;
    margin-left: 5px;
    transition: color 0.3s ease;
  }

  .edit-btn:hover {
    color: #28a745;
  }

  .delete-btn:hover {
    color: #dc3545;
  }

  .pagination {
    text-align: right;
    font-size: 0.8em;
    color: #6c757d;
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup-content {
    background: white;
    padding: 15px;
    border-radius: 5px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .popup-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
  }

  .cancel-btn {
    padding: 8px 15px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
  }

  .cancel-btn:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    .content {
      flex-direction: column;
    }

    .assign-form,
    .route-list {
      width: 100%;
    }

    .search-input {
      width: 100%;
    }
  }
`;

// Inject CSS into the document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default AssignVehicle;