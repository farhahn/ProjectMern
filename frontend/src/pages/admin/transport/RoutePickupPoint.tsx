import React, { useState } from 'react';

const RoutePickupPoint = () => {
  const [routes, setRoutes] = useState([
    {
      route: 'Brooklyn Central',
      pickups: [
        { point: '1 Brooklyn North', fee: 50.00, distance: 20.0, time: '9:00 AM' },
        { point: '2 Brooklyn South', fee: 60.00, distance: 15.0, time: '9:30 AM' },
        { point: '3 Brooklyn West', fee: 50.00, distance: 25.0, time: '10:15 AM' },
        { point: '4 Brooklyn East', fee: 50.00, distance: 10.0, time: '10:45 AM' },
      ],
    },
    {
      route: 'Brooklyn East',
      pickups: [
        { point: '1 Brooklyn North', fee: 50.00, distance: 20.0, time: '11:30 AM' },
        { point: '2 Brooklyn Central', fee: 50.00, distance: 25.0, time: '12:30 PM' },
        { point: '3 Brooklyn South', fee: 100.00, distance: 15.0, time: '2:30 PM' },
        { point: '4 Ranital Chowk', fee: 100.00, distance: 20.0, time: '3:00 PM' },
      ],
    },
  ]);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editData, setEditData] = useState({ routeIndex: null, pickupIndex: null, point: '', fee: 0, distance: 0, time: '' });
  const [newPickup, setNewPickup] = useState({ point: '', fee: 0, distance: 0, time: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({ routeIndex: null, pickupIndex: null });

  const handleAdd = () => {
    setShowAddPopup(true);
  };

  const handleSaveAdd = () => {
    if (newPickup.point && newPickup.fee && newPickup.distance && newPickup.time) {
      const updatedRoutes = [...routes];
      updatedRoutes[0].pickups.push({ ...newPickup, fee: parseFloat(newPickup.fee), distance: parseFloat(newPickup.distance) });
      setRoutes(updatedRoutes);
      setNewPickup({ point: '', fee: 0, distance: 0, time: '' });
      setShowAddPopup(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleEdit = (routeIndex, pickupIndex) => {
    const pickup = routes[routeIndex].pickups[pickupIndex];
    setEditData({ routeIndex, pickupIndex, point: pickup.point, fee: pickup.fee, distance: pickup.distance, time: pickup.time });
    setShowEditPopup(true);
  };

  const handleSaveEdit = () => {
    if (editData.point && editData.fee && editData.distance && editData.time) {
      const updatedRoutes = [...routes];
      updatedRoutes[editData.routeIndex].pickups[editData.pickupIndex] = {
        ...updatedRoutes[editData.routeIndex].pickups[editData.pickupIndex],
        point: editData.point,
        fee: parseFloat(editData.fee),
        distance: parseFloat(editData.distance),
        time: editData.time,
      };
      setRoutes(updatedRoutes);
      setShowEditPopup(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleDeleteConfirm = (routeIndex, pickupIndex) => {
    setDeleteData({ routeIndex, pickupIndex });
    setShowDelete(true);
  };

  const handleDelete = () => {
    if (deleteData.routeIndex !== null && deleteData.pickupIndex !== null) {
      const updatedRoutes = [...routes];
      updatedRoutes[deleteData.routeIndex].pickups.splice(deleteData.pickupIndex, 1);
      setRoutes(updatedRoutes);
      setShowDelete(false);
      setDeleteData({ routeIndex: null, pickupIndex: null });
    }
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
    setDeleteData({ routeIndex: null, pickupIndex: null });
  };

  const handleCancelPopup = () => {
    setShowAddPopup(false);
    setShowEditPopup(false);
    setNewPickup({ point: '', fee: 0, distance: 0, time: '' });
    setEditData({ routeIndex: null, pickupIndex: null, point: '', fee: 0, distance: 0, time: '' });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Route Pickup Point</h2>
      <div style={styles.header}>
        <input type="text" placeholder="Search..." style={styles.search} />
        <button onClick={handleAdd} style={styles.addButton}>
          Add
        </button>
      </div>
      {routes.map((route, routeIndex) => (
        <div key={routeIndex} style={styles.routeSection}>
          <h3 style={styles.routeTitle}>{route.route}</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Pickup Point</th>
                <th style={styles.th}>Monthly Fees ($)</th>
                <th style={styles.th}>Distance (km)</th>
                <th style={styles.th}>Pickup Time</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {route.pickups.map((pickup, pickupIndex) => (
                <tr key={pickupIndex} style={styles.tr}>
                  <td style={styles.td}>{pickup.point}</td>
                  <td style={styles.td}>{pickup.fee.toFixed(2)}</td>
                  <td style={styles.td}>{pickup.distance}</td>
                  <td style={styles.td}>{pickup.time}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleEdit(routeIndex, pickupIndex)}
                      style={styles.actionButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(routeIndex, pickupIndex)}
                      style={styles.actionButton}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Add Popup */}
      {showAddPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3>Add New Pickup Point</h3>
            <input
              type="text"
              placeholder="Pickup Point"
              value={newPickup.point}
              onChange={(e) => setNewPickup({ ...newPickup, point: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Fee ($)"
              value={newPickup.fee}
              onChange={(e) => setNewPickup({ ...newPickup, fee: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Distance (km)"
              value={newPickup.distance}
              onChange={(e) => setNewPickup({ ...newPickup, distance: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Time"
              value={newPickup.time}
              onChange={(e) => setNewPickup({ ...newPickup, time: e.target.value })}
              style={styles.input}
            />
            <div style={styles.buttonGroup}>
              <button onClick={handleSaveAdd} style={styles.saveButton}>Save</button>
              <button onClick={handleCancelPopup} style={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {showEditPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3>Edit Pickup Point</h3>
            <input
              type="text"
              placeholder="Pickup Point"
              value={editData.point}
              onChange={(e) => setEditData({ ...editData, point: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Fee ($)"
              value={editData.fee}
              onChange={(e) => setEditData({ ...editData, fee: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Distance (km)"
              value={editData.distance}
              onChange={(e) => setEditData({ ...editData, distance: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Time"
              value={editData.time}
              onChange={(e) => setEditData({ ...editData, time: e.target.value })}
              style={styles.input}
            />
            <div style={styles.buttonGroup}>
              <button onClick={handleSaveEdit} style={styles.saveButton}>Save</button>
              <button onClick={handleCancelPopup} style={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div style={styles.popupSuccess}>
          Operation successful!
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDelete && (
        <div style={styles.popupDelete}>
          <div style={styles.popupContent}>
            <p>Are you sure you want to delete this pickup point?</p>
            <div style={styles.buttonGroup}>
              <button onClick={handleDelete} style={styles.confirmButton}>Yes</button>
              <button onClick={handleCancelDelete} style={styles.cancelButton}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal CSS
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: "#e8c897",
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    alignItems: 'center',
  },
  search: {
    padding: '10px',
    width: '250px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  routeSection: {
    marginBottom: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  routeTitle: {
    color: '#007BFF',
    marginBottom: '10px',
    fontSize: '18px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },
  th: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #0056b3',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '12px',
    textAlign: 'left',
    color: '#333',
  },
  actionButton: {
    padding: '5px 10px',
    marginRight: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  saveButton: {
    padding: '8px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelButton: {
    padding: '8px 15px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  popupSuccess: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    animation: 'fadeIn 0.5s',
  },
  popupDelete: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    zIndex: 1000,
  },
  confirmButton: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

export default RoutePickupPoint;