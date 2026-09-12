import "./App.css";
import { useState } from "react";
import AddStock from "./pages/AddStock";
import Products from "./pages/Products";
import History from "./pages/History";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="sidebar-top">
          <button className="menu-toggle">☰</button>

          <div className="logo">
            <span className="logo-mark">M</span>
          </div>
        </div>

        <nav className="menu">

          <button className="menu-item active">
            <span className="menu-icon">⌂</span>
            <span>Dashboard</span>
          </button>

          <button className="menu-item has-arrow">
            <span className="menu-icon">🛒</span>
            <span>Sales</span>
            <span className="arrow">⌄</span>
          </button>

          <button className="menu-item has-arrow">
            <span className="menu-icon">▣</span>
            <span>Stock</span>
            <span className="arrow">⌄</span>
          </button>

          <button className="menu-item"
            onClick={() => setCurrentPage("products")}>
            <span className="menu-icon">⬡</span>
            <span>Products</span>
          </button>

          <button className="menu-item">
            <span className="menu-icon">♙</span>
            <span>Customers</span>
          </button>

          <button className="menu-item has-arrow">
            <span className="menu-icon">▤</span>
            <span>Reports</span>
            <span className="arrow">⌄</span>
          </button>

          <button className="menu-item">
            <span className="menu-icon">⚙</span>
            <span>Settings</span>
          </button>

          <button className="menu-item">
            <span className="menu-icon">?</span>
            <span>Help</span>
          </button>

        </nav>
      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="main">
      {currentPage === "dashboard" && (
      <>
        {/* TOP HEADER */}
        <header className="topbar">

          <h1>Marble, Tiles &amp; Sanitary Shop - Dashboard</h1>

          <div className="top-actions">

            <button className="top-icon help-icon">?</button>

            <button className="top-icon notification">
              ♧
              <span className="notification-dot">1</span>
            </button>

            <div className="profile">
              M
            </div>

          </div>

        </header>


        {/* ================= QUICK ACTIONS ================= */}
        <section className="quick-section">

          <h2>Quick Actions</h2>

          <div className="quick-actions">

            <button className="quick-btn blue-action">
              <span className="action-icon">▱</span>
              <span>New Sale</span>
            </button>

            <button className="quick-btn green-action"
            onClick={() => setCurrentPage("addStock")}>
              <span className="action-icon">＋</span>
              <span>Add Stock</span>
            </button>

            <button className="quick-btn orange-action"
              onClick={() => setCurrentPage("products")}>
              <span className="action-icon">▦</span>
              <span>Products</span>
            </button>

            <button className="quick-btn red-action">
              <span className="action-icon">♟</span>
              <span>Customer Dues</span>
            </button>

            <button className="quick-btn teal-action"
            onClick={() => setCurrentPage("history")}>
              <span className="action-icon">↶</span>
              <span>History</span>
            </button>

            <button className="quick-btn purple-action">
              <span className="action-icon">💰</span>
              <span>Expenses</span>
            </button>

          </div>

        </section>


        {/* ================= STATISTICS ================= */}
        <div className="stats-grid left-grid">

          <div className="stat-card sales-card">
            <div className="stat-content">
              <span className="stat-title">Today's Sales</span>
              <strong>Rs. 45,500</strong>
            </div>

            <div className="stat-symbol blue-symbol">
              ▣
              <span>₨</span>
            </div>
          </div>

          <div className="stat-card profit-card">
            <div className="stat-content">
              <span className="stat-title">Today's Profit</span>
              <strong>Rs. 12,200</strong>
            </div>

            <div className="stat-symbol green-symbol">
              ▤
              <span>₨</span>
            </div>
          </div>

          <div className="stat-card expense-card">
            <div className="stat-content">
              <span className="stat-title">Today's Expenses</span>
              <strong>Rs. 5,200</strong>
            </div>

            <div className="stat-symbol expense-symbol">
              💰
            </div>
          </div>

          
          <div className="stat-card sales-card">
            <div className="stat-content">
              <span className="stat-title">Monthly Sales</span>
              <strong>Rs. 980,000</strong>
            </div>

            <div className="stat-symbol blue-symbol">
              ▣
              <span>M</span>
            </div>
          </div>

          <div className="stat-card profit-card">
            <div className="stat-content">
              <span className="stat-title">Monthly Profit</span>
              <strong>Rs. 260,000</strong>
            </div>

            <div className="stat-symbol green-symbol">
              ▣
              <span>₨</span>
            </div>
          </div>

          <div className="stat-card expense-card">
            <div className="stat-content">
              <span className="stat-title">Monthly Expenses</span>
              <strong>Rs. 72,000</strong>
            </div>

            <div className="stat-symbol expense-symbol">
              💰
            </div>
          </div>

        </div>

        <div className="right-card">
          <div className="stat-card dues-card">
            <div className="stat-content">
              <span className="stat-title">Total Dues</span>
              <strong>Rs. 185,000</strong>
            </div>

            <div className="stat-symbol dues-symbol">
              ▤
              <span>₨</span>
            </div>
          </div>

          <div className="stat-card net-card">
            <div className="stat-content">
              <span className="stat-title">Net Profit</span>
              <strong>Rs. 188,000</strong>
            </div>

            <div className="stat-symbol net-symbol">
              📈
            </div>
          </div>
        </div>

        {/* ================= BOTTOM TABLES ================= */}
        <div className="tables-grid">


          {/* RECENT SALES */}
          <section className="table-section">

            <div className="table-header">

              <h2>Recent Sales</h2>

              <div className="table-header-actions">
                <button className="small-icon blue-small">▣</button>
                <button className="dots">•••</button>
              </div>

            </div>


            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity Sold</th>
                    <th>Sale Amount</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>White Marble</td>
                    <td>20 Ft</td>
                    <td>Rs. 4,500</td>
                    <td>10:45 AM</td>
                  </tr>

                  <tr>
                    <td>Ceramic Tiles</td>
                    <td>15 Boxes</td>
                    <td>Rs. 12,000</td>
                    <td>10:15 AM</td>
                  </tr>

                  <tr>
                    <td>Wash Basin</td>
                    <td>2 Pcs</td>
                    <td>Rs. 6,800</td>
                    <td>09:50 AM</td>
                  </tr>

                  <tr>
                    <td>Grout Mix</td>
                    <td>5 Sacks</td>
                    <td>Rs. 1,500</td>
                    <td>09:30 AM</td>
                  </tr>

                  <tr>
                    <td>Wall Tiles</td>
                    <td>10 Boxes</td>
                    <td>Rs. 8,500</td>
                    <td>09:10 AM</td>
                  </tr>

                </tbody>

              </table>

            </div>


            <div className="table-footer">

              <button className="view-all"
              onClick={() => setCurrentPage("history")}>
                View All
              </button>

              <button className="clear-btn">
                Clear Recent
                <span>×</span>
              </button>

            </div>

          </section>


          {/* RECENT STOCK */}
          <section className="table-section">

            <div className="table-header">

              <h2>Recent Expenses</h2>

              <div className="table-header-actions">
                <button className="small-icon green-small">▥</button>
                <button className="dots">•••</button>
              </div>

            </div>


            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Expense Name</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>Tea Expense</td>
                    <td>Tea</td>
                    <td>Rs. 300</td>
                    <td>Today</td>
                  </tr>

                  <tr>
                    <td>Shop Rent</td>
                    <td>Rent</td>
                    <td>Rs. 25,000</td>
                    <td>01 Aug</td>
                  </tr>

                  <tr>
                    <td>Generator Fuel</td>
                    <td>Fuel</td>
                    <td>Rs. 1,500</td>
                    <td>Today</td>
                  </tr>

                  <tr>
                    <td>Worker Payment</td>
                    <td>Labour</td>
                    <td>Rs. 2,000</td>
                    <td>Yesterday</td>
                  </tr>

                  <tr>
                    <td>Loading Charges</td>
                    <td>Transport</td>
                    <td>Rs. 900</td>
                    <td>Yesterday</td>
                  </tr>

                </tbody>

              </table>

            </div>


            <div className="table-footer">

              <button className="view-all">
                Expense History
              </button>

              <button className="clear-btn">
                Clear Recent
                <span>×</span>
              </button>

            </div>

          </section>

        </div>
      </>

              )}

        {currentPage === "addStock" && (
          <AddStock setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "products" && (
          <Products setCurrentPage={setCurrentPage} />
        )}
        {/* ADD THIS NEW BLOCK */}
        {currentPage === "history" && (
          <History setCurrentPage={setCurrentPage} />
        )}
      </main>

    </div>
  );
}

export default App;