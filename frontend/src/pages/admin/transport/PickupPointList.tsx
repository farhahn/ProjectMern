import React, { useState } from 'react';

const initialData = [
  { name: 'Brooklyn North', lat: '23.21953720694318', lng: '79.92068396109676' },
  { name: 'Brooklyn South', lat: '23.204781722973813', lng: '79.89751486729702' },
  { name: 'Brooklyn West', lat: '23.19324172886614', lng: '79.91536320113687' },
  { name: 'Brooklyn East', lat: '23.193952567195506', lng: '79.9243812546212' },
  { name: 'Brooklyn Central', lat: '23.21230494959826', lng: '79.92914139397962' },
  { name: 'Manhattan', lat: '23.2066336875236', lng: '80.00451042401824' },
  { name: 'Railway Station', lat: '23.16662749489289', lng: '79.95054096414184' },
  { name: 'High Court', lat: '23.168615566293845', lng: '79.94726999887004' },
  { name: 'Civil Line', lat: '23.166120045559563', lng: '79.95531910260692' },
  { name: 'Vijay Nagar', lat: '23.190170327286868', lng: '79.89643280559972' },
  { name: 'Ranital Chowk', lat: '23.170504563243085', lng: '79.92385377983044' },
];

const PickupPointList = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(initialData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [newPoint, setNewPoint] = useState({ name: '', lat: '', lng: '' });

  const handleDelete = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  const handleAdd = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setNewPoint({ name: '', lat: '', lng: '' });
  };

  const handleSave = () => {
    if (newPoint.name && newPoint.lat && newPoint.lng) {
      setData([...data, { ...newPoint, lat: newPoint.lat, lng: newPoint.lng }]);
      handleClosePopup();
      alert('Pickup point added successfully!');
    } else {
      alert('Please fill all fields!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPoint({ ...newPoint, [name]: value });
  };

  const handleEdit = (index) => {
    setEditIndex(index === editIndex ? null : index); // Toggle edit mode
  };

  const handleSaveEdit = (index) => {
    setEditIndex(null); // Exit edit mode
    // No save logic needed here as changes are directly applied via input
  };

  const handleCellChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    setData(updated);
  };

  const handleMapView = (point) => {
    setSelectedPoint(point);
    setIsPopupOpen(true);
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <><style>
    {`
      @keyframes slideIn {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `}
  </style>
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Pickup Point List</h2>
        <button style={styles.addButton} onClick={handleAdd}>+ Add</button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        style={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Latitude</th>
            <th style={styles.th}>Longitude</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((point, index) => (
            <tr key={index} style={styles.tr}>
              <td style={styles.td}>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={point.name}
                    onChange={(e) => handleCellChange(index, 'name', e.target.value)}
                    style={styles.editInput}
                  />
                ) : (
                  point.name
                )}
              </td>
              <td style={styles.td}>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={point.lat}
                    onChange={(e) => handleCellChange(index, 'lat', e.target.value)}
                    style={styles.editInput}
                  />
                ) : (
                  point.lat
                )}
              </td>
              <td style={styles.td}>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={point.lng}
                    onChange={(e) => handleCellChange(index, 'lng', e.target.value)}
                    style={styles.editInput}
                  />
                ) : (
                  point.lng
                )}
              </td>
              <td style={styles.td}>
                <span
                  style={styles.icon}
                  onClick={() => handleMapView(point)}
                  title="View Map"
                >
                  📍
                </span>
                <span
                  style={styles.icon}
                  onClick={() => handleEdit(index)}
                  title="Edit"
                >
                  ✏️
                </span>
                {editIndex === index ? (
                  <span
                    style={styles.icon}
                    onClick={() => handleSaveEdit(index)}
                    title="Save"
                  >
                    ✅
                  </span>
                ) : (
                  <span
                    style={styles.icon}
                    onClick={() => handleDelete(index)}
                    title="Delete"
                  >
                    ❌
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={styles.footer}>Records: {filteredData.length} of {data.length}</p>

      {isPopupOpen && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            {selectedPoint ? (
              <>
                <h3 style={styles.popupTitle}>Map View</h3>
                <button style={styles.closeButton} onClick={handleClosePopup}>×</button>
                <div style={styles.mapContainer}>
                  {/* Placeholder for map - Replace with actual map API (e.g., Google Maps) */}
                  <p style={styles.mapText}>
                    Map for {selectedPoint.name}<br />
                    Latitude: {selectedPoint.lat}, Longitude: {selectedPoint.lng}<br />
                    (Integrate Google Maps API here with these coordinates)
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 style={styles.popupTitle}>Add New Pickup Point</h3>
                <button style={styles.closeButton} onClick={handleClosePopup}>×</button>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newPoint.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter name"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Latitude:</label>
                  <input
                    type="text"
                    name="lat"
                    value={newPoint.lat}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter latitude"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Longitude:</label>
                  <input
                    type="text"
                    name="lng"
                    value={newPoint.lng}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter longitude"
                  />
                </div>
                <button style={styles.saveButton} onClick={handleSave}>Save</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #f0f4f8, #d9e2ec)',
    borderRadius: '10px',
    width: '90%',
    margin: '20px auto',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  addButton: {
    background: 'linear-gradient(45deg, #4CAF50, #45a049)',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  addButtonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  search: {
    width: '100%',
    padding: '12px',
    margin: '15px 0',
    borderRadius: '25px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    transition: 'box-shadow 0.3s',
  },
  searchFocus: {
    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  th: {
    textAlign: 'left',
    padding: '15px',
    background: 'linear-gradient(90deg, #34495e, #2c3e50)',
    color: '#fff',
    borderBottom: '2px solid #2c3e50',
    textTransform: 'uppercase',
    fontSize: '14px',
  },
  tr: {
    transition: 'background 0.2s',
  },
  trHover: {
    background: '#f1f3f5',
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #eee',
  },
  editInput: {
    width: '90%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
  },
  icon: {
    cursor: 'pointer',
    marginRight: '15px',
    fontSize: '18px',
    color: '#2c3e50',
    transition: 'color 0.2s',
  },
  iconHover: {
    color: '#e74c3c',
  },
  footer: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '500px', // Increased width for map view
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    animation: 'slideIn 0.3s ease-out',
  },
  popupTitle: {
    color: '#2c3e50',
    margin: '0 0 20px',
    fontSize: '20px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#e74c3c',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    color: '#2c3e50',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#3498db',
  },
  saveButton: {
    background: 'linear-gradient(45deg, #3498db, #2980b9)',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  saveButtonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  mapContainer: {
    height: '300px',
    background: '#e0e0e0',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    color: '#2c3e50',
    textAlign: 'center',
  },
  
};

export default PickupPointList;