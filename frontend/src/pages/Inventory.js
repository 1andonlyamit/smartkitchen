import React, { useState, useRef } from 'react';
import Layout from '../components/layout/Layout_';
import Footer from '../components/footer/Footer';
import { Camera, Search, Filter, SortDesc, Plus } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Inventory() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Tomatoes', category: 'Vegetables', quantity: 5, unit: 'kg', expiryDate: '2025-04-10' },
    { id: 2, name: 'Chicken Breast', category: 'Meat', quantity: 3, unit: 'kg', expiryDate: '2025-04-05' },
    { id: 3, name: 'Olive Oil', category: 'Condiments', quantity: 2, unit: 'bottles', expiryDate: '2025-06-15' },
    { id: 4, name: 'Rice', category: 'Grains', quantity: 10, unit: 'kg', expiryDate: '2025-09-20' },
    { id: 5, name: 'Milk', category: 'Dairy', quantity: 4, unit: 'liters', expiryDate: '2025-04-02' },
    { id: 6, name: 'Bell Peppers', category: 'Vegetables', quantity: 8, unit: 'pieces', expiryDate: '2025-04-07' },
    { id: 7, name: 'Ground Beef', category: 'Meat', quantity: 2.5, unit: 'kg', expiryDate: '2025-04-03' },
    { id: 8, name: 'Flour', category: 'Baking', quantity: 5, unit: 'kg', expiryDate: '2025-08-15' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Filter inventory based on search term and category
  const filteredInventory = inventory.filter(item => 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === '' || item.category === selectedCategory)
  );

  // Sort inventory based on selection
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    if (sortBy === 'expiry') return new Date(a.expiryDate) - new Date(b.expiryDate);
    if (sortBy === 'quantity') return a.quantity - b.quantity;
    return 0;
  });

  // Calculate days left until expiry
  const getDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to determine badge color based on days left
  const getBadgeColor = (daysLeft) => {
    if (daysLeft <= 3) return 'danger';
    if (daysLeft <= 7) return 'warning';
    return 'success';
  };

  // Extract unique categories for filter dropdown
  const categories = [...new Set(inventory.map(item => item.category))];

  const startCamera = async () => {
    setImagePreview(null); // Clear existing image preview
    setCameraActive(true);
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    setImagePreview(canvasRef.current.toDataURL('image/png'));
    
    stopCamera(); // Stop camera after capturing
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 text-light">Kitchen Inventory</h2>
            <button className="btn btn-info d-flex align-items-center shadow" onClick={() => setShowModal(true)}>
              <Camera size={20} className="me-2" />
              <span>Scan Inventory</span>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="card mb-4 shadow-sm bg-dark border-secondary">
            <div className="card-body p-3">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-dark text-light border-secondary">
                      <Search size={18} />
                    </span>
                    <input 
                      type="text" 
                      className="form-control bg-dark text-light border-secondary border-start-0" 
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <span className="input-group-text bg-dark text-light border-secondary">
                      <Filter size={18} />
                    </span>
                    <select 
                      className="form-select bg-dark text-light border-secondary border-start-0"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <span className="input-group-text bg-dark text-light border-secondary">
                      <SortDesc size={18} />
                    </span>
                    <select 
                      className="form-select bg-dark text-light border-secondary border-start-0"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Sort by Name</option>
                      <option value="category">Sort by Category</option>
                      <option value="expiry">Sort by Expiry Date</option>
                      <option value="quantity">Sort by Quantity</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="card mb-4 shadow-sm bg-dark border-secondary">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-dark mb-0">
                  <thead className="bg-dark border-secondary">
                    <tr>
                      <th className="py-3 text-info">Item Name</th>
                      <th className="py-3 text-info">Category</th>
                      <th className="py-3 text-info">Quantity</th>
                      <th className="py-3 text-info">Expiry Date</th>
                      <th className="py-3 text-info">Status</th>
                      <th className="py-3 text-info">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedInventory.map(item => {
                      const daysLeft = getDaysLeft(item.expiryDate);
                      const badgeColor = getBadgeColor(daysLeft);
                      
                      return (
                        <tr key={item.id} className="border-secondary">
                          <td className="align-middle">{item.name}</td>
                          <td className="align-middle">{item.category}</td>
                          <td className="align-middle">{item.quantity} {item.unit}</td>
                          <td className="align-middle">{item.expiryDate}</td>
                          <td className="align-middle">
                            <span className={`badge bg-${badgeColor}`}>
                              {daysLeft <= 0 ? 'Expired' : `${daysLeft} days left`}
                            </span>
                          </td>
                          <td className="align-middle">
                            <button className="btn btn-sm btn-outline-info me-1">Edit</button>
                            <button className="btn btn-sm btn-outline-danger">Remove</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add Item Button */}
          <div className="text-end mb-4">
            <button className="btn btn-success d-inline-flex align-items-center">
              <Plus size={20} className="me-2" />
              <span>Add New Item</span>
            </button>
          </div>
        </div>
      </Layout>

      {/* AI Scan Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">Scan Inventory Item</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => { setShowModal(false); stopCamera(); setImagePreview(null); }}></button>
              </div>
              <div className="modal-body text-center py-5">
                {cameraActive ? (
                  <div className="camera-preview mb-4" style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                    <video ref={videoRef} autoPlay className="w-100 h-100" />
                    <button className="btn btn-danger position-absolute bottom-0 start-50 translate-middle-x mb-2" onClick={captureImage}>Capture</button>
                  </div>
                ) : imagePreview ? (
                  <div className="image-preview mb-4" style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={imagePreview} alt="Uploaded Preview" className="w-100 h-100 object-fit-cover" />
                  </div>
                ) : (
                  <div className="camera-placeholder bg-secondary bg-opacity-25 d-flex flex-column justify-content-center align-items-center mb-4" style={{ height: '300px', borderRadius: '8px' }}>
                    <Camera size={64} className="text-info mb-3" />
                    <p className="mb-0 text-light">Camera preview would appear here</p>
                  </div>
                )}

                <input 
                  type="file" 
                  className="form-control mb-3" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setImagePreview(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <p className="text-muted mb-0">Position the item in front of the camera for scanning or upload an image</p>
              </div>
              <div className="modal-footer border-secondary">
                <button type="button" className="btn btn-outline-secondary" onClick={() => { setImagePreview(null); stopCamera(); }}>Clear</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-info d-flex align-items-center" onClick={() => cameraActive ? stopCamera() : startCamera()}>
                  <Camera size={18} className="me-2" />
                  <span>{cameraActive ? "Stop Camera" : "Start Scanning"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Inventory;