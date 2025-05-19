import React, { useState } from 'react';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, number: 'VH4584', model: 'Ford CAB', year: 2015, regNumber: 'FFG-76575676787', chassis: '523422', capacity: 50, driver: 'Jasper', license: '258714545', contact: '8521479630' },
    { id: 2, number: 'VH5645', model: 'Volvo Bus', year: 2018, regNumber: 'BGBFDF787987956', chassis: '45433', capacity: 50, driver: 'Maximus', license: '54564566676', contact: '885456456' },
    { id: 3, number: 'VH1001', model: 'Volvo Bus', year: 2017, regNumber: 'FVF-08797865', chassis: '45453', capacity: 50, driver: 'Michel', license: 'R534534', contact: '8667777869' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editVehicle, setEditVehicle] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    id: Date.now(),
    number: '',
    model: '',
    year: '',
    regNumber: '',
    chassis: '',
    capacity: '',
    driver: '',
    license: '',
    contact: '',
  });
  const [notification, setNotification] = useState('');

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (vehicle) => setEditVehicle({ ...vehicle });
  const handleSaveEdit = () => {
    setVehicles(vehicles.map(v => (v.id === editVehicle.id ? editVehicle : v)));
    setEditVehicle(null);
    setNotification('Vehicle updated successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete vehicle with ID: ${id}?`)) {
      setVehicles(vehicles.filter(v => v.id !== id));
      setNotification('Vehicle deleted successfully!');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditVehicle({ ...editVehicle, [name]: value });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, newVehicle]);
    setNewVehicle({
      id: Date.now(),
      number: '',
      model: '',
      year: '',
      regNumber: '',
      chassis: '',
      capacity: '',
      driver: '',
      license: '',
      contact: '',
    });
    setShowAddForm(false);
    setNotification('Vehicle added successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="vehicle-container">
      <h2 className="title">Vehicle Management</h2>
      {notification && (
        <div className="notification" onAnimationEnd={() => setNotification('')}>
          {notification}
        </div>
      )}
      <div className="controls">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="add-btn" onClick={() => setShowAddForm(true)}>
          <span>+</span> Add Vehicle
        </button>
      </div>
      <div className="table-wrapper">
        <table className="vehicle-table">
          <thead>
            <tr>
              {['Vehicle #', 'Model', 'Year', 'Reg. #', 'Chassis', 'Cap.', 'Driver', 'License', 'Contact', 'Actions'].map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map(vehicle => (
              <tr key={vehicle.id} className="vehicle-row">
                <td>{vehicle.number}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.regNumber}</td>
                <td>{vehicle.chassis}</td>
                <td>{vehicle.capacity}</td>
                <td>{vehicle.driver}</td>
                <td>{vehicle.license}</td>
                <td>{vehicle.contact}</td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => handleEdit(vehicle)}>
                    <span role="img" aria-label="edit">✏️</span>
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(vehicle.id)}>
                    <span role="img" aria-label="delete">❌</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        Records: <span className="record-count">{filteredVehicles.length}</span> of {vehicles.length}
      </div>

      {editVehicle && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Vehicle</h3>
            <form className="form-grid">
              {Object.keys(editVehicle).filter(key => key !== 'id').map(key => (
                <input
                  key={key}
                  type={key === 'year' || key === 'capacity' ? 'number' : 'text'}
                  name={key}
                  value={editVehicle[key]}
                  onChange={handleEditChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace('regNumber', 'Reg. #')}
                  className="form-input"
                />
              ))}
            </form>
            <div className="popup-buttons">
              <button type="button" className="save-btn" onClick={handleSaveEdit}>Save</button>
              <button type="button" className="cancel-btn" onClick={() => setEditVehicle(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add New Vehicle</h3>
            <form className="form-grid">
              {Object.keys(newVehicle).filter(key => key !== 'id').map(key => (
                <input
                  key={key}
                  type={key === 'year' || key === 'capacity' ? 'number' : 'text'}
                  name={key}
                  value={newVehicle[key]}
                  onChange={handleAddChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace('regNumber', 'Reg. #')}
                  className="form-input"
                />
              ))}
            </form>
            <div className="popup-buttons">
              <button type="button" className="save-btn" onClick={handleAddVehicle}>Save</button>
              <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal CSS
const styles = `
  .vehicle-container {
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg,rgb(218, 180, 75) 0%, #c3cfe2 100%);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  .title {
    color: #2c3e50;
    font-size: 1.8em;
    text-align: center;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .search-input {
    padding: 8px 12px;
    width: 200px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 0.9em;
    transition: all 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 250px;
  }

  .add-btn {
    padding: 8px 15px;
    background: linear-gradient(90deg, #3498db 0%, #2980b9 100%);
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .add-btn:hover {
    background: linear-gradient(90deg, #2980b9 0%, #3498db 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .table-wrapper {
    max-height: 70vh;
    overflow-y: auto;
    margin-bottom: 15px;
  }

  .vehicle-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 5px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-size: 0.85em; /* Reduced font size for more data on screen */
  }

  .vehicle-table th {
    background: linear-gradient(90deg, #34495e 0%, #2c3e50 100%);
    color: white;
    padding: 10px;
    text-align: left;
    font-size: 0.9em;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .vehicle-row {
    transition: all 0.3s ease;
  }

  .vehicle-row:hover {
    background: #ecf0f1;
    transform: scale(1.01);
  }

  .vehicle-table td {
    padding: 8px;
    border-bottom: 1px solid #eee;
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden;
    text-overflow: ellipsis; /* Add ellipsis for overflow */
    max-width: 120px; /* Limit cell width */
  }

  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1em;
    padding: 3px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .edit-btn:hover {
    color: #27ae60;
    transform: rotate(360deg);
  }

  .delete-btn:hover {
    color: #e74c3c;
    transform: rotate(360deg);
  }

  .pagination {
    text-align: right;
    font-size: 0.8em;
    color: #7f8c8d;
    margin-top: 10px;
  }

  .record-count {
    color: #2c3e50;
    font-weight: bold;
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
    overflow-y: auto;
    padding: 10px;
  }

  .popup-content {
    background: white;
    padding: 15px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease-out;
    font-size: 0.85em; /* Reduced font size */
    overflow-y: auto;
    max-height: 80vh;
  }

  @keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .form-grid {
    display: grid;
    gap: 5px;
    grid-template-columns: 1fr;
    margin-bottom: 15px;
  }

  .form-input {
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.85em;
    width: 100%;
    transition: all 0.3s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 3px rgba(52, 152, 219, 0.5);
  }

  .popup-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .save-btn {
    padding: 8px 15px;
    background: linear-gradient(90deg, #27ae60 0%, #2ecc71 100%);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .save-btn:hover {
    background: linear-gradient(90deg, #2ecc71 0%, #27ae60 100%);
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(39, 174, 96, 0.3);
  }

  .cancel-btn {
    padding: 8px 15px;
    background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cancel-btn:hover {
    background: linear-gradient(90deg, #c0392b 0%, #e74c3c 100%);
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(231, 76, 60, 0.3);
  }

  .notification {
    position: fixed;
    top: 10px;
    right: 10px;
    background: #27ae60;
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    animation: fadeInOut 3s ease-out forwards;
    z-index: 1000;
    max-width: 250px;
    font-size: 0.85em;
  }

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateX(100px); }
    10% { opacity: 1; transform: translateX(0); }
    90% { opacity: 1; transform: translateX(0); }
    100% { opacity: 0; transform: translateX(100px); }
  }

  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: center;
    }

    .search-input {
      width: 100%;
      max-width: 250px;
    }

    .vehicle-table th,
    .vehicle-table td {
      padding: 6px;
      font-size: 0.8em;
    }

    .form-grid {
      grid-template-columns: 1fr;
    }

    .popup-content {
      width: 95%;
      max-height: 85vh;
    }
  }
`;

// Inject CSS into the document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default VehicleList;