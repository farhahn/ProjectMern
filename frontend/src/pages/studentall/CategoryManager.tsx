import React, { useState } from "react";

const CategoryManager = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "General" },
    { id: 2, name: "OBC" },
    { id: 3, name: "Special" },
    { id: 4, name: "Physically Challenged" },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");

  const addCategory = () => {
    if (newCategory.trim() === "") {
      alert("Category name cannot be empty!");
      return;
    }
    if (categories.some((cat) => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      alert("Category already exists!");
      return;
    }

    setCategories([...categories, { id: categories.length + 1, name: newCategory }]);
    setNewCategory(""); 
  };

  const deleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      {/* Left Side - Create Category Form */}
      <div style={{ width: "40%", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <h2>Create Category</h2>
        <label style={{ fontWeight: "bold" }}>Category Name *</label>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={addCategory}
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Save
        </button>
      </div>

      {/* Right Side - Category List */}
      <div style={{ width: "55%", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <h2>Category List</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Category</th>
              <th style={{ padding: "10px" }}>Category ID</th>
              <th style={{ padding: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
              .map((cat) => (
                <tr key={cat.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{cat.name}</td>
                  <td style={{ padding: "10px" }}>{cat.id}</td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManager;
