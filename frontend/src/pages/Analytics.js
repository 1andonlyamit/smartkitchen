import React, { useState } from 'react';
import Layout from "../components/layout/Layout_";
import Footer from '../components/footer/Footer';
import { LineChart, BarChart, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, Bar, Pie, Cell } from 'recharts';
import { PieChart as PieChartIcon, BarChart as BarChartIcon, Calendar, RefreshCcw, Download, TrendingUp, Filter, Info } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";

function Analytics() {
  // State for filters
  const [timeRange, setTimeRange] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Hardcoded data for charts
  const inventoryData = [
    { name: 'Jan', vegetables: 65, fruits: 45, dairy: 55, meat: 35 },
    { name: 'Feb', vegetables: 70, fruits: 50, dairy: 60, meat: 40 },
    { name: 'Mar', vegetables: 60, fruits: 55, dairy: 50, meat: 45 },
    { name: 'Apr', vegetables: 75, fruits: 60, dairy: 65, meat: 50 },
    { name: 'May', vegetables: 80, fruits: 65, dairy: 70, meat: 55 },
    { name: 'Jun', vegetables: 85, fruits: 70, dairy: 75, meat: 60 },
  ];

  const categoryData = [
    { name: 'Vegetables', value: 40 },
    { name: 'Fruits', value: 30 },
    { name: 'Dairy', value: 15 },
    { name: 'Meat', value: 10 },
    { name: 'Grains', value: 5 },
  ];

  const consumptionData = [
    { name: 'Monday', amount: 120 },
    { name: 'Tuesday', amount: 150 },
    { name: 'Wednesday', amount: 180 },
    { name: 'Thursday', amount: 135 },
    { name: 'Friday', amount: 190 },
    { name: 'Saturday', amount: 210 },
    { name: 'Sunday', amount: 170 },
  ];

  const topProducts = [
    { id: 1, name: 'Tomatoes', category: 'Vegetables', volume: 85, change: 12 },
    { id: 2, name: 'Apples', category: 'Fruits', volume: 72, change: 8 },
    { id: 3, name: 'Chicken', category: 'Meat', volume: 65, change: -5 },
    { id: 4, name: 'Milk', category: 'Dairy', volume: 60, change: 15 },
    { id: 5, name: 'Rice', category: 'Grains', volume: 45, change: 3 },
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Analytics summary statistics
  const summaryStats = {
    totalSales: '$12,450',
    totalItems: 1240,
    avgOrderValue: '$42.50',
    topCategory: 'Vegetables'
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 text-light">Inventory Analytics</h2>
            <div className="d-flex justify-content-between">
              <button 
                className="btn btn-outline-info me-2 d-flex align-items-center shadow"
              >
                <Download size={20} className="me-2" />
                <span>Export Data</span>
              </button>
              <button 
                className="btn btn-info d-flex align-items-center shadow"
              >
                <RefreshCcw size={20} className="me-2" />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Total Sales</h6>
                  <h3 className="text-light">{summaryStats.totalSales}</h3>
                  <p className="text-muted small mb-0">Last 30 days</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Items Sold</h6>
                  <h3 className="text-light">{summaryStats.totalItems}</h3>
                  <p className="text-muted small mb-0">Last 30 days</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Average Order Value</h6>
                  <h3 className="text-light">{summaryStats.avgOrderValue}</h3>
                  <p className="text-muted small mb-0">Last 30 days</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Top Category</h6>
                  <h3 className="text-light">{summaryStats.topCategory}</h3>
                  <p className="text-muted small mb-0">By sales volume</p>
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
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
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
                      <option value="sales">Sales Metrics</option>
                      <option value="inventory">Inventory Metrics</option>
                      <option value="customer">Customer Metrics</option>
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
                  <BarChartIcon size={20} className="me-2" />
                  <h5 className="mb-0">Inventory Trends</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                      data={inventoryData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                      />
                      <Legend wrapperStyle={{ color: '#ccc' }} />
                      <Line type="monotone" dataKey="vegetables" stroke="#00C49F" activeDot={{ r: 8 }} name="Vegetables" />
                      <Line type="monotone" dataKey="fruits" stroke="#FFBB28" name="Fruits" />
                      <Line type="monotone" dataKey="dairy" stroke="#0088FE" name="Dairy" />
                      <Line type="monotone" dataKey="meat" stroke="#FF8042" name="Meat" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-info border-secondary d-flex align-items-center">
                  <PieChartIcon size={20} className="me-2" />
                  <h5 className="mb-0">Sales Distribution</h5>
                </div>
                <div className="card-body text-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
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
                <div className="card-header bg-dark text-info border-secondary d-flex align-items-center">
                  <BarChartIcon size={20} className="me-2" />
                  <h5 className="mb-0">Weekly Consumption</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={consumptionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                      <Legend wrapperStyle={{ color: '#ccc' }} />
                      <Bar dataKey="amount" name="Consumption" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-info border-secondary d-flex align-items-center">
                  <Info size={20} className="me-2" />
                  <h5 className="mb-0">Top Products</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover table-dark mb-0">
                      <thead className="bg-dark border-secondary">
                        <tr>
                          <th className="py-3">Product</th>
                          <th className="py-3">Category</th>
                          <th className="py-3">Sales Volume</th>
                          <th className="py-3">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topProducts.map((product) => (
                          <tr key={product.id} className="border-secondary">
                            <td className="align-middle">{product.name}</td>
                            <td className="align-middle">{product.category}</td>
                            <td className="align-middle">{product.volume} units</td>
                            <td className="align-middle">
                              <span className={`badge ${product.change > 0 ? 'bg-success' : 'bg-danger'}`}>
                                {product.change > 0 ? '+' : ''}{product.change}%
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

          {/* Insights Cards */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow-sm bg-dark border-secondary">
                <div className="card-header bg-dark text-info border-secondary">
                  <h5 className="mb-0">Key Insights</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <div className="card bg-dark border-info">
                        <div className="card-body">
                          <h5 className="card-title text-info">Sales Growth</h5>
                          <p className="card-text text-light">Sales have increased by 15% compared to last month, with vegetables showing the strongest growth.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card bg-dark border-warning">
                        <div className="card-body">
                          <h5 className="card-title text-warning">Customer Behavior</h5>
                          <p className="card-text text-light">Weekends show 30% higher sales volume compared to weekdays, with most purchases happening in the morning.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card bg-dark border-success">
                        <div className="card-body">
                          <h5 className="card-title text-success">Inventory Efficiency</h5>
                          <p className="card-text text-light">Inventory turnover has improved by 12% this quarter, leading to fresher products and less waste.</p>
                        </div>
                      </div>
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

export default Analytics;