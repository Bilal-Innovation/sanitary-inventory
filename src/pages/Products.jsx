import { useState } from "react";
import "../styles/Products.css";

function Products({ setCurrentPage }) {
  const [editingIndex, setEditingIndex] = useState(null);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Marble");
  const [unit, setUnit] = useState("Pieces");

  const [products, setProducts] = useState([
    {
      name: "White Marble",
      category: "Marble",
      unit: "Sq Ft",
    },
    {
      name: "Floor Tiles",
      category: "Tiles",
      unit: "Boxes",
    },
    {
      name: "English Commode",
      category: "Sanitary",
      unit: "Pieces",
    },
  ]);

  const clearForm = () => {
    setProductName("");
    setCategory("Marble");
    setUnit("Pieces");
    setEditingIndex(null);
  };

  const handleSaveProduct = () => {
    if (!productName.trim()) {
      alert("Please enter product name");
      return;
    }

    const product = {
      name: productName,
      category,
      unit,
    };

    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = product;
      setProducts(updated);
    } else {
      setProducts([product, ...products]);
    }

    clearForm();
  };

  const handleEdit = (product, index) => {
    setEditingIndex(index);
    setProductName(product.name);
    setCategory(product.category);
    setUnit(product.unit);
  };

  const handleDelete = (index) => {
    const updated = products.filter(
      (_, i) => i !== index
    );

    setProducts(updated);

    if (editingIndex === index) {
      clearForm();
    }
  };

  return (
    <div className="products-page">

      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Create and manage products</p>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => setCurrentPage("dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      <div className="product-form-card">

        <div className="product-grid">

          <div className="input-group">
            <label>Product Name</label>

            <input
              type="text"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) =>
                setProductName(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option>Marble</option>
              <option>Tiles</option>
              <option>Sanitary</option>
              <option>Bond</option>
              <option>Cement</option>
              <option>Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Default Unit</label>

            <select
              value={unit}
              onChange={(e) =>
                setUnit(e.target.value)
              }
            >
              <option>Pieces</option>
              <option>Boxes</option>
              <option>Bags</option>
              <option>Feet</option>
              <option>Sq Ft</option>
            </select>
          </div>

        </div>

        <div className="save-section">
          <button
            className="save-product-btn"
            onClick={handleSaveProduct}
          >
            {editingIndex !== null
              ? "Update Product"
              : "Save Product"}
          </button>
        </div>

      </div>

      <div className="products-table-card">

        <h2>Products List</h2>

        <table>

          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Default Unit</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.unit}</td>

                <td>
                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(product, index)
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(index)
                      }
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

export default Products;