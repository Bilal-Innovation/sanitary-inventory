import { useState } from "react";
import "../styles/History.css";

function History({ setCurrentPage }) {
  // Mock Data: Sales
  const [sales] = useState([
    { id: 1, date: "2026-09-03", time: "10:45 AM", name: "White Marble", qty: "20 Ft", total: 4500 },
    { id: 2, date: "2026-09-03", time: "10:15 AM", name: "Ceramic Tiles", qty: "15 Boxes", total: 12000 },
    { id: 3, date: "2026-08-28", time: "04:30 PM", name: "Wash Basin", qty: "2 Pcs", total: 6800 },
    { id: 4, date: "2026-08-15", time: "11:00 AM", name: "Grout Mix", qty: "5 Sacks", total: 1500 },
  ]);

  // Mock Data: Stock Additions
  const [stock] = useState([
    { id: 1, date: "2026-09-03", time: "11:00 AM", name: "Royal Tile", qty: "100 Boxes", totalCost: 12000 },
    { id: 2, date: "2026-09-03", time: "09:30 AM", name: "White Marble", qty: "50 Sq Ft", totalCost: 9000 },
    { id: 3, date: "2026-08-25", time: "02:15 PM", name: "Ceramic Sinks", qty: "20 Pieces", totalCost: 2200 },
    { id: 4, date: "2026-08-10", time: "10:00 AM", name: "Paint Cans", qty: "15 Boxes", totalCost: 4500 },
  ]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // 'all', 'today', '7days', 'month'

  // Helper to check date filters
  const matchesDateFilter = (itemDateStr) => {
    if (dateFilter === "all") return true;

    const itemDate = new Date(itemDateStr);
    const today = new Date("2026-09-03"); // Aligning with current system mock date

    if (dateFilter === "today") {
      return itemDate.toDateString() === today.toDateString();
    }
    if (dateFilter === "7days") {
      const diffTime = today - itemDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    }
    if (dateFilter === "month") {
      return (
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear()
      );
    }
    return true;
  };

  // Filter logic for Sales
  const filteredSales = sales.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && matchesDateFilter(item.date);
  });

  // Filter logic for Stock
  const filteredStock = stock.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && matchesDateFilter(item.date);
  });

  // Calculate totals
  const totalSalesDisplayed = filteredSales.reduce((sum, item) => sum + item.total, 0);
  const totalStockDisplayed = filteredStock.reduce((sum, item) => sum + item.totalCost, 0);

  // Group data by date
  const groupDataByDate = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    }, {});
  };

  const groupedSales = groupDataByDate(filteredSales);
  const groupedStock = groupDataByDate(filteredStock);

  const formatDate = (dateStr) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="history-page">
      <div className="page-header">
        <div>
          <h1>History</h1>
          <p>Track and filter your past sales and stock additions</p>
        </div>
        <button className="dashboard-btn" onClick={() => setCurrentPage("dashboard")}>
          ← Dashboard
        </button>
      </div>

      {/* Global Filter Toolbar */}
      <div className="history-toolbar">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <label>Time Period: </label>
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="all">All Time Records</option>
            <option value="today">Today Only</option>
            <option value="7days">Last 7 Days</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="history-grid">
        {/* ================= SALES HISTORY ================= */}
        <div className="history-card sales-history">
          <div className="history-card-header">
            <h2>Sales History</h2>
            <div className="total-badge blue-badge">
              Total: <strong>Rs. {totalSalesDisplayed.toLocaleString()}</strong>
            </div>
          </div>

          <div className="history-content">
            {Object.keys(groupedSales).length === 0 ? (
              <p className="no-records">No sales records found.</p>
            ) : (
              Object.keys(groupedSales).map((date) => (
                <div key={date} className="date-group">
                  <h3 className="date-title">▼ {formatDate(date)}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Product Name</th>
                        <th>Qty</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedSales[date].map((item) => (
                        <tr key={item.id}>
                          <td>{item.time}</td>
                          <td><strong>{item.name}</strong></td>
                          <td>{item.qty}</td>
                          <td className="amount">Rs. {item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= STOCK HISTORY ================= */}
        <div className="history-card stock-history">
          <div className="history-card-header">
            <h2>Stock Additions</h2>
            <div className="total-badge green-badge">
              Total: <strong>Rs. {totalStockDisplayed.toLocaleString()}</strong>
            </div>
          </div>

          <div className="history-content">
            {Object.keys(groupedStock).length === 0 ? (
              <p className="no-records">No stock addition records found.</p>
            ) : (
              Object.keys(groupedStock).map((date) => (
                <div key={date} className="date-group">
                  <h3 className="date-title">▼ {formatDate(date)}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Product Name</th>
                        <th>Qty</th>
                        <th>Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedStock[date].map((item) => (
                        <tr key={item.id}>
                          <td>{item.time}</td>
                          <td><strong>{item.name}</strong></td>
                          <td>{item.qty}</td>
                          <td className="amount">Rs. {item.totalCost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;