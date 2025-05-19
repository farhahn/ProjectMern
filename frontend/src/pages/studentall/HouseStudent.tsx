import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete, FileCopy, Print, PictureAsPdf, Search } from "@mui/icons-material";

const StudentHouse = () => {
  const [houses, setHouses] = useState([
    { id: 1, name: "Blue", description: "", class: "5A" },
    { id: 2, name: "Red", description: "", class: "6B" },
    { id: 3, name: "Green", description: "", class: "7C" },
    { id: 4, name: "Yellow", description: "", class: "8D" },
  ]);

  const [newHouse, setNewHouse] = useState({ name: "", description: "", class: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddHouse = () => {
    if (newHouse.name.trim() === "") return;
    setHouses([...houses, { id: houses.length + 1, ...newHouse }]);
    setNewHouse({ name: "", description: "", class: "" });
  };

  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Left Form */}
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h5" style={styles.title}>
            Add School House
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            required
            fullWidth
            style={styles.input}
            value={newHouse.name}
            onChange={(e) => setNewHouse({ ...newHouse, name: e.target.value })}
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={2}
            fullWidth
            style={styles.input}
            value={newHouse.description}
            onChange={(e) => setNewHouse({ ...newHouse, description: e.target.value })}
          />
          <TextField
            label="Class"
            variant="outlined"
            fullWidth
            style={styles.input}
            value={newHouse.class}
            onChange={(e) => setNewHouse({ ...newHouse, class: e.target.value })}
          />
          <Button variant="contained" style={styles.button} onClick={handleAddHouse}>
            Save
          </Button>
        </CardContent>
      </Card>

      {/* Right Table */}
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h5" style={styles.title}>
            Student House List
          </Typography>

          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <Search style={{ marginRight: "8px", color: "#777" }} />
            <TextField
              label="Search by Name"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Export Buttons */}
          <div style={styles.exportButtons}>
            <IconButton color="primary">
              <FileCopy />
            </IconButton>
            <IconButton color="secondary">
              <Print />
            </IconButton>
            <IconButton color="error">
              <PictureAsPdf />
            </IconButton>
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={styles.tableHeader}>
                  <TableCell style={styles.tableHeaderCell}>Name</TableCell>
                  <TableCell style={styles.tableHeaderCell}>Description</TableCell>
                  <TableCell style={styles.tableHeaderCell}>Class</TableCell>
                  <TableCell style={styles.tableHeaderCell}>House ID</TableCell>
                  <TableCell style={styles.tableHeaderCell}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHouses.map((house) => (
                  <TableRow key={house.id} style={styles.tableRow}>
                    <TableCell>{house.name}</TableCell>
                    <TableCell>{house.description}</TableCell>
                    <TableCell>{house.class}</TableCell>
                    <TableCell>{house.id}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    // backgroundColor: "#f2d47",
  },
  card: {
    flex: 1,
    minWidth: "320px",
    maxWidth: "500px",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#e8c897",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#444",
    marginBottom: "10px",
  },
  input: {
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  exportButtons: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    justifyContent: "flex-end",
  },
  tableHeader: {
    backgroundColor: "#e3f2fd",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "#333",
  },
  tableRow: {
    transition: "background 0.3s",
  },
};

export default StudentHouse;
