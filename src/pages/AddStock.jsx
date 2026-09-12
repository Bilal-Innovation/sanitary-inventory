import { useState, useEffect } from "react";
import "../styles/AddStock.css";

function AddStock({ setCurrentPage }) {
  const [editingIndex, setEditingIndex] = useState(null);

  // Form States set to empty for placeholders
  const [category, setCategory] = useState("");
  const [marbleType, setMarbleType] = useState("");
  const [size, setSize] = useState("");
  
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const [recentStock, setRecentStock] = useState([
    {
      time: "10:45 AM",
      category: "Marble",
      type: "Ground Marble",
      size: "12x24",
      name: "Golden White",
      quantity: "50",
      costPrice: "180",
      salePrice: "260",
    },
    {
      time: "09:30 AM",
      category: "Tile",
      type: "-",
      size: "24x24",
      name: "Royal Tile",
      quantity: "100",
      costPrice: "120",
      salePrice: "190",
    }
  ]);

  // Dynamic Size Options based on selection
  const getSizeOptions = () => {
    if (category === "Tile") {
      return ["12x12", "12x24", "12x36", "12x48", "16x16", "24x24"];
    }
    if (category === "Marble") {
      if (marbleType === "Ground Marble") {
        return ["6x12", "12x12", "12x24"];
      }
      if (marbleType === "Step Marble") {
        return ["12x36", "12x42", "12x48", "12x60", "12x84"];
      }
    }
    return [];
  };

  // Reset dependent fields when parent selections change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setMarbleType("");
    setSize("");
  };

  const handleMarbleTypeChange = (e) => {
    setMarbleType(e.target.value);
    setSize("");
  };

  const clearForm = () => {
    setCategory("");
    setMarbleType("");
    setSize("");
    setName("");
    setQuantity("");
    setCostPrice("");
    setSalePrice("");
    setEditingIndex(null);
  };

  const handleSaveStock = () => {
    if (!category || (category === "Marble" && !marbleType) || !size || !name || !quantity || !costPrice || !salePrice) {
      alert("Please fill all required fields.");
      return;
    }

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const stockEntry = {
      time: currentTime,
      category,
      type: category === "Tile" ? "-" : marbleType,
      size,
      name,
      quantity,
      costPrice,
      salePrice,
    };

    if (editingIndex !== null) {
      const updated = [...recentStock];
      updated[editingIndex] = stockEntry;
      setRecentStock(updated);
    } else {
      setRecentStock([stockEntry, ...recentStock]);
    }

    clearForm();
  };

  const handleEdit = (item, index) => {
    setEditingIndex(index);
    setCategory(item.category);
    if (item.category === "Marble") setMarbleType(item.type);
    setSize(item.size);
    setName(item.name);
    setQuantity(item.quantity);
    setCostPrice(item.costPrice);
    setSalePrice(item.salePrice);
  };

  const handleDelete = (index) => {
    const updated = recentStock.filter((_, i) => i !== index);
    setRecentStock(updated);

    if (editingIndex === index) {
      clearForm();
    }
  };

  // Helper to format size beautifully (e.g., 12x24 -> 12" × 24")
  const formatSize = (sizeStr) => {
    if (!sizeStr) return "";
    const parts = sizeStr.split('x');
    if (parts.length === 2) {
      return (
        <span className="size-badge">
          {parts[0]}" <span className="size-x">×</span> {parts[1]}"
        </span>
      );
    }
    return <span className="size-badge">{sizeStr}</span>;
  };

  return (
    <div className="add-stock-page">
      <div className="page-header">
        <div>
          <h1>Add Stock</h1>
          <p>Add new inventory into the shop</p>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => setCurrentPage("dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      <div className="stock-form-card">
        <div className="stock-grid">
          
          <div className="input-group">
            <label>Category</label>
            <select value={category} onChange={handleCategoryChange}>
              <option value="" disabled>Select Category</option>
              <option value="Marble">Marble</option>
              <option value="Tile">Tile</option>
            </select>
          </div>

          {category === "Marble" && (
            <div className="input-group">
              <label>Marble Type</label>
              <select value={marbleType} onChange={handleMarbleTypeChange}>
                <option value="" disabled>Select Type</option>
                <option value="Ground Marble">Ground Marble</option>
                <option value="Step Marble">Step Marble</option>
              </select>
            </div>
          )}

          <div className="input-group">
            <label>Size</label>
            <select value={size} onChange={(e) => setSize(e.target.value)} disabled={!category || (category === "Marble" && !marbleType)}>
              <option value="" disabled>Select Size</option>
              {getSizeOptions().map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              placeholder="e.g. Golden White"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Quantity (Pieces)</label>
            <input
              type="number"
              value={quantity}
              placeholder="0"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Cost Price (Per Piece)</label>
            <input
              type="number"
              value={costPrice}
              placeholder="0.00"
              onChange={(e) => setCostPrice(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Sale Price (Per Piece)</label>
            <input
              type="number"
              value={salePrice}
              placeholder="0.00"
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </div>

        </div>

        <div className="save-section">
          <button className="save-stock-btn" onClick={handleSaveStock}>
            {editingIndex !== null ? "Update Stock" : "Save Stock"}
          </button>
        </div>
      </div>

      <div className="recent-stock-card">
        <h2>Recently Added Stock</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Category</th>
              <th>Type</th>
              <th>Size</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Cost Price</th>
              <th>Sale Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentStock.slice(0, 5).map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>
                <td>{item.category}</td>
                <td>{item.type}</td>
                <td>{formatSize(item.size)}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>Rs. {item.costPrice}</td>
                <td>Rs. {item.salePrice}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item, index)}
                    >
                      ✏ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddStock;