import React, { useState } from 'react';
import Layout from '../components/layout/Layout_';
import Footer from '../components/footer/Footer';
import { LineChart, BarChart, PieChart, ComposedChart, Line, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { TrendingUp, Filter, Calendar, RefreshCcw, Download, ArrowDownRight, ArrowUpRight, AlertCircle } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";

function Forecasting() {
  // State for time range selection
  const [timeRange, setTimeRange] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Hardcoded data for charts
  const usageData = [
    { name: 'Week 1', vegetables: 42, fruits: 28, dairy: 35, meat: 20, grains: 30 },
    { name: 'Week 2', vegetables: 38, fruits: 32, dairy: 30, meat: 25, grains: 28 },
    { name: 'Week 3', vegetables: 45, fruits: 25, dairy: 38, meat: 22, grains: 32 },
    { name: 'Week 4', vegetables: 40, fruits: 30, dairy: 34, meat: 28, grains: 35 },
    { name: 'Week 5', vegetables: 48, fruits: 35, dairy: 32, meat: 24, grains: 30 },
    { name: 'Week 6', vegetables: 43, fruits: 33, dairy: 36, meat: 26, grains: 33 },
    { name: 'Week 7', vegetables: 46, fruits: 29, dairy: 40, meat: 23, grains: 36 },
    { name: 'Week 8', vegetables: 50, fruits: 34, dairy: 37, meat: 27, grains: 34 },
  ];

  const inventoryPrediction = [
    { name: 'Apr', current: 120, predicted: 135 },
    { name: 'May', current: null, predicted: 150 },
    { name: 'Jun', current: null, predicted: 145 },
    { name: 'Jul', current: null, predicted: 170 },
    { name: 'Aug', current: null, predicted: 190 },
    { name: 'Sep', current: null, predicted: 160 },
  ];

  const categoryDistribution = [
    { name: 'Vegetables', value: 35 },
    { name: 'Fruits', value: 25 },
    { name: 'Dairy', value: 20 },
    { name: 'Meat', value: 15 },
    { name: 'Grains', value: 5 },
  ];

  const wastageData = [
    { name: 'Jan', amount: 15 },
    { name: 'Feb', amount: 12 },
    { name: 'Mar', amount: 8 },
    { name: 'Apr', amount: 10 },
  ];

  const seasonalTrends = [
    { name: 'Q1', vegetables: 110, fruits: 90, dairy: 105, meat: 85 },
    { name: 'Q2', vegetables: 145, fruits: 130, dairy: 100, meat: 90 },
    { name: 'Q3', vegetables: 160, fruits: 150, dairy: 95, meat: 80 },
    { name: 'Q4', vegetables: 120, fruits: 110, dairy: 110, meat: 95 },
  ];

  // Low stock warning data
  const lowStockItems = [
    { id: 1, name: 'Tomatoes', category: 'Vegetables', currentStock: 3, minStock: 5, estimatedDepletion: '2 days' },
    { id: 2, name: 'Milk', category: 'Dairy', currentStock: 2, minStock: 6, estimatedDepletion: '1 day' },
    { id: 3, name: 'Chicken Breast', category: 'Meat', currentStock: 1, minStock: 4, estimatedDepletion: '1 day' },
  ];

  // Expiring soon items
  const expiringItems = [
    { id: 1, name: 'Yogurt', category: 'Dairy', expiryDate: '2025-04-02', daysLeft: 2 },
    { id: 2, name: 'Lettuce', category: 'Vegetables', expiryDate: '2025-04-03', daysLeft: 3 },
    { id: 3, name: 'Ground Beef', category: 'Meat', expiryDate: '2025-04-01', daysLeft: 1 },
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Generate a forecast summary
  const summaryStats = {
    totalItems: 145,
    valueChange: 12.5,
    wastageRate: -15.3,
    predictedGrowth: 8.7
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Download report function (mockup)
  const downloadReport = () => {
    alert('Downloading forecast report...');
    // Normally this would generate and download a report
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 text-light">Inventory Forecasting</h2>
            <div class="d-flex justify-content-between">
              <button 
                className="btn btn-outline-info me-2 d-flex align-items-center shadow" 
                onClick={downloadReport}
              >
                <Download size={20} className="me-2" />
                <span>Export Report</span>
              </button>
              <button 
                className="btn btn-info d-flex align-items-center shadow"
              >
                <RefreshCcw size={20} className="me-2" />
                <span>Refresh Forecast</span>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Total Inventory Items</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="text-light">{summaryStats.totalItems}</h3>
                    <div className={`badge bg-${summaryStats.valueChange > 0 ? 'success' : 'danger'} fs-6 p-2`}>
                      {summaryStats.valueChange > 0 ? (
                        <ArrowUpRight size={18} className="me-1" />
                      ) : (
                        <ArrowDownRight size={18} className="me-1" />
                      )}
                      {Math.abs(summaryStats.valueChange)}%
                    </div>
                  </div>
                  <p className="text-muted small mb-0">Compared to last month</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Wastage Rate</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="text-light">{Math.abs(summaryStats.wastageRate)}%</h3>
                    <div className={`badge bg-${summaryStats.wastageRate < 0 ? 'success' : 'danger'} fs-6 p-2`}>
                      {summaryStats.wastageRate < 0 ? (
                        <ArrowDownRight size={18} className="me-1" />
                      ) : (
                        <ArrowUpRight size={18} className="me-1" />
                      )}
                      {Math.abs(summaryStats.wastageRate)}%
                    </div>
                  </div>
                  <p className="text-muted small mb-0">Reduced from previous quarter</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Predicted Growth</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="text-light">{summaryStats.predictedGrowth}%</h3>
                    <div className={`badge bg-${summaryStats.predictedGrowth > 0 ? 'success' : 'danger'} fs-6 p-2`}>
                      {summaryStats.predictedGrowth > 0 ? (
                        <ArrowUpRight size={18} className="me-1" />
                      ) : (
                        <ArrowDownRight size={18} className="me-1" />
                      )}
                      {Math.abs(summaryStats.predictedGrowth)}%
                    </div>
                  </div>
                  <p className="text-muted small mb-0">Next quarter forecast</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Low Stock Items</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="text-light">{lowStockItems.length}</h3>
                    <div className="badge bg-warning fs-6 p-2">
                      <AlertCircle size={18} className="me-1" />
                      Alert
                    </div>
                  </div>
                  <p className="text-muted small mb-0">Requiring attention</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-4 shadow-sm bg-dark border-secondary">
            <div className="card-body p-3">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-dark text-light border-secondary">
                      <Calendar size={18} />
                    </span>
                    <select
                      className="form-select bg-dark text-light border-secondary border-start-0"
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                    >
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                      <option value="year">Last Year</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-dark text-light border-secondary">
                      <Filter size={18} />
                    </span>
                    <select
                      className="form-select bg-dark text-light border-secondary border-start-0"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="dairy">Dairy</option>
                      <option value="meat">Meat</option>
                      <option value="grains">Grains</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-dark text-light border-secondary">
                      <TrendingUp size={18} />
                    </span>
                    <select
                      className="form-select bg-dark text-light border-secondary border-start-0"
                    >
                      <option value="consumption">Consumption Rate</option>
                      <option value="stock">Stock Levels</option>
                      <option value="orders">Order Frequency</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Charts Row */}
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-info border-secondary d-flex align-items-center">
                  <TrendingUp size={20} className="me-2" />
                  <h5 className="mb-0">Inventory Forecast</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart
                      data={inventoryPrediction}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                      />
                      <Legend wrapperStyle={{ color: '#ccc' }} />
                      <Area
                        type="monotone"
                        dataKey="current"
                        fill="#8884d8"
                        stroke="#8884d8"
                        name="Current Inventory"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#00C49F"
                        strokeWidth={2}
                        dot={{ r: 5 }}
                        name="Predicted Inventory"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-info border-secondary">
                  <h5 className="mb-0">Category Distribution</h5>
                </div>
                <div className="card-body text-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} items`, 'Quantity']}
                        contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row of Charts */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-info border-secondary">
                  <h5 className="mb-0">Consumption Rate by Category</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={usageData}
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                      <Legend wrapperStyle={{ color: '#ccc' }} />
                      <Line type="monotone" dataKey="vegetables" stroke="#00C49F" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="fruits" stroke="#FFBB28" />
                      <Line type="monotone" dataKey="dairy" stroke="#0088FE" />
                      <Line type="monotone" dataKey="meat" stroke="#FF8042" />
                      <Line type="monotone" dataKey="grains" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-info border-secondary">
                  <h5 className="mb-0">Seasonal Trends</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={seasonalTrends}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                      <Legend wrapperStyle={{ color: '#ccc' }} />
                      <Bar dataKey="vegetables" stackId="a" fill="#00C49F" />
                      <Bar dataKey="fruits" stackId="a" fill="#FFBB28" />
                      <Bar dataKey="dairy" stackId="a" fill="#0088FE" />
                      <Bar dataKey="meat" stackId="a" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts and Recommendations */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-warning border-secondary d-flex align-items-center">
                  <AlertCircle size={20} className="me-2" />
                  <h5 className="mb-0">Low Stock Alert</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover table-dark mb-0">
                      <thead className="bg-dark border-secondary">
                        <tr>
                          <th className="py-3 text-warning">Item</th>
                          <th className="py-3 text-warning">Category</th>
                          <th className="py-3 text-warning">Current Stock</th>
                          <th className="py-3 text-warning">Min. Stock</th>
                          <th className="py-3 text-warning">Est. Depletion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lowStockItems.map((item) => (
                          <tr key={item.id} className="border-secondary">
                            <td className="align-middle">{item.name}</td>
                            <td className="align-middle">{item.category}</td>
                            <td className="align-middle">
                              <span className="badge bg-danger">{item.currentStock}</span>
                            </td>
                            <td className="align-middle">{item.minStock}</td>
                            <td className="align-middle">
                              <span className="badge bg-warning">{item.estimatedDepletion}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-danger border-secondary d-flex align-items-center">
                  <AlertCircle size={20} className="me-2" />
                  <h5 className="mb-0">Expiring Soon</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover table-dark mb-0">
                      <thead className="bg-dark border-secondary">
                        <tr>
                          <th className="py-3 text-danger">Item</th>
                          <th className="py-3 text-danger">Category</th>
                          <th className="py-3 text-danger">Expiry Date</th>
                          <th className="py-3 text-danger">Days Left</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expiringItems.map((item) => (
                          <tr key={item.id} className="border-secondary">
                            <td className="align-middle">{item.name}</td>
                            <td className="align-middle">{item.category}</td>
                            <td className="align-middle">{formatDate(item.expiryDate)}</td>
                            <td className="align-middle">
                              <span className={`badge ${item.daysLeft <= 1 ? 'bg-danger' : 'bg-warning'}`}>
                                {item.daysLeft} {item.daysLeft === 1 ? 'day' : 'days'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Food Wastage Chart */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-info border-secondary">
                  <h5 className="mb-0">Food Wastage Trends</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={wastageData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                      <Legend wrapperStyle={{ color: '#ccc' }} />
                      <Bar dataKey="amount" name="Wastage Amount (kg)" fill="#FF5252" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="card mb-4 shadow-sm bg-dark border-secondary">
            <div className="card-header bg-dark text-info border-secondary">
              <h5 className="mb-0">AI Recommendations</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="card bg-dark border-info">
                    <div className="card-body">
                      <h5 className="card-title text-info">Ordering Recommendations</h5>
                      <p className="card-text text-light">Based on current trends, consider ordering 15% more vegetables next week to accommodate projected increased usage.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card bg-dark border-warning">
                    <div className="card-body">
                      <h5 className="card-title text-warning">Usage Optimization</h5>
                      <p className="card-text text-light">Dairy products show consistent wastage. Consider reducing order quantities by 10% and monitor impact on operations.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card bg-dark border-success">
                    <div className="card-body">
                      <h5 className="card-title text-success">Seasonal Planning</h5>
                      <p className="card-text text-light">Summer fruits will be in season next month. Plan for 20% cost reduction and increased availability in your inventory.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </div>
  );
}

export default Forecasting;