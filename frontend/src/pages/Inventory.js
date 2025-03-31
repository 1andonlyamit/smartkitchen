import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/layout/Layout_";
import Footer from "../components/footer/Footer";
import PreviewCard from "../components/ui/PreviewCard";
import ConfirmBox from "../components/ui/ConfirmBox";
import StartProcess from "../components/ui/StartProcess"; // Import the StartProcess component
import {
  Camera,
  Search,
  Filter,
  SortDesc,
  Eye,
  RefreshCcw,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  const [previewItem, setPreviewItem] = useState(null);

  // Add state for confirmation dialogs
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    message: "",
    itemId: null,
  });

  // Add state for process dialog
  const [processDialog, setProcessDialog] = useState({
    isOpen: false,
    item: null,
  });

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8888/inventory/get-data");
      const result = await response.json();
      setInventory(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [imageFile, setImageFile] = useState(null); // This will store the raw image file

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Filter inventory based on search term and category
  const filteredInventory = inventory.filter(
    (item) =>
      ((item.item_name?.toLowerCase() || "").includes(
        searchTerm?.toLowerCase() || ""
      ) ||
        (item.item_category?.toLowerCase() || "").includes(
          searchTerm?.toLowerCase() || ""
        )) &&
      (selectedCategory === "" || item.item_category === selectedCategory)
  );

  const handleViewItem = (item) => {
    setPreviewItem(item);
  };

  // Function to close the preview
  const handleClosePreview = () => {
    setPreviewItem(null);
  };

  // Function to handle removal confirmation
  const handleRemoveItem = (itemId) => {
    setConfirmDialog({
      isOpen: true,
      message: "Are you sure you want to remove this item?",
      itemId: itemId,
    });
  };

  // Function to confirm removal of an item
  const confirmRemoveItem = async () => {
    if (confirmDialog.itemId) {
      try {
        // Call your API to remove the item
        const response = await fetch(
          `http://localhost:8888/inventory/delete/${confirmDialog.itemId}`,
          {
            method: "POST",
          }
        );

        if (response.ok) {
          // Remove item from local state
          setInventory(
            inventory.filter((item) => item.id !== confirmDialog.itemId)
          );
          console.log("Item removed successfully!");
        } else {
          console.error("Failed to remove item");
        }
      } catch (error) {
        console.error("Error removing item:", error);
      }
    }

    // Close the confirmation dialog
    setConfirmDialog({ isOpen: false, message: "", itemId: null });
  };

  // Function to handle process confirmation
  const handleProcessItem = (item) => {
    setProcessDialog({
      isOpen: true,
      item: item,
    });
  };

  // Function to confirm processing an item
  const confirmProcessItem = async () => {
    if (processDialog.item) {
      try {
        // Call your API to process the item
        const response = await fetch(
          `http://localhost:8888/inventory/process/${processDialog.item.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image_path: processDialog.item.path,
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();

          // Update the processed item in the inventory
          setInventory(
            inventory.map((item) =>
              item.id === processDialog.item.id
                ? {
                    ...item,
                    processed: 1,
                    item_name: result.item_name || item.item_name,
                    item_category: result.item_category || item.item_category,
                  }
                : item
            )
          );

          console.log("Item processed successfully!");
        } else {
          console.error("Failed to process item");
        }
      } catch (error) {
        console.error("Error processing item:", error);
      }
    }

    // Close the process dialog
    setProcessDialog({ isOpen: false, item: null });
  };

  // Sort inventory based on selection
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (sortBy === "name") return a.item_name?.localeCompare(b.item_name) || 0;
    if (sortBy === "category")
      return a.item_category?.localeCompare(b.item_category) || 0;
    if (sortBy === "date")
      return new Date(a.uploaded_at || 0) - new Date(b.uploaded_at || 0);
    if (sortBy === "id") return (a.id ?? 0) - (b.id ?? 0);
    return 0;
  });

  // Extract unique categories for filter dropdown
  const categories = [...new Set(inventory.map((item) => item.item_category))];

  const startCamera = async () => {
    setImagePreview(null); // Clear existing image preview
    setCameraActive(true);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
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
      tracks.forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "captured_image.png", {
          type: "image/png",
        });
        setImageFile(file); // Store the raw file
        setImagePreview(URL.createObjectURL(file)); // Show preview
      }
    }, "image/png");

    stopCamera();
  };

  // apiCallFunction
  const uploadImage = async () => {
    if (!imageFile) {
      alert("No image selected!");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile); // Append raw file

    try {
      const response = await fetch("http://localhost:8888/inventory/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload successful:", result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Format date from ISO string to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 text-light">Kitchen Inventory</h2>
            <button
              className="btn btn-info d-flex align-items-center shadow"
              onClick={() => setShowModal(true)}
            >
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
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
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
                      <option value="id">Sort by ID</option>
                      <option value="name">Sort by Name</option>
                      <option value="category">Sort by Category</option>
                      <option value="date">Sort by Upload Date</option>
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
                      <th className="py-3 text-info">ID</th>
                      <th className="py-3 text-info">Item Name</th>
                      <th className="py-3 text-info">Category</th>
                      <th className="py-3 text-info">Upload Date</th>
                      <th className="py-3 text-info">Processed</th>
                      <th className="py-3 text-info">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedInventory.map((item) => {
                      return (
                        <tr key={item.id} className="border-secondary">
                          <td className="align-middle">{item.id || ""}</td>
                          <td className="align-middle">
                            {item.item_name || "Undefined"}
                          </td>
                          <td className="align-middle">
                            {item.item_category || "Undefined"}
                          </td>
                          <td className="align-middle">
                            {formatDate(item.uploaded_at) || ""}
                          </td>
                          <td className="align-middle">
                            <span
                              className={`badge ${
                                item.processed ? "bg-success" : "bg-warning"
                              }`}
                            >
                              {item.processed ? "Processed" : "Pending"}
                            </span>
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-sm btn-outline-info me-1 d-inline-flex align-items-center"
                              onClick={() => handleViewItem(item)}
                            >
                              <Eye size={16} className="me-1" />
                              View
                            </button>
                            <button
                              className="btn btn-sm btn-outline-success me-1"
                              onClick={() => handleProcessItem(item)}
                              disabled={item.processed === 1}
                            >
                              Process
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              Remove
                            </button>
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
            <button
              className="btn btn-success d-inline-flex align-items-center"
              onClick={fetchData}
            >
              <RefreshCcw size={20} className="me-2" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </Layout>

      {/* AI Scan Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">Scan Inventory Item</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowModal(false);
                    stopCamera();
                    setImagePreview(null);
                  }}
                ></button>
              </div>
              <div className="modal-body text-center py-5">
                {cameraActive ? (
                  <div
                    className="camera-preview mb-4"
                    style={{
                      height: "300px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <video ref={videoRef} autoPlay className="w-100 h-100" />
                    <button
                      className="btn btn-danger position-absolute bottom-0 start-50 translate-middle-x mb-2"
                      onClick={captureImage}
                    >
                      Capture
                    </button>
                  </div>
                ) : imagePreview ? (
                  <div
                    className="image-preview mb-4"
                    style={{
                      height: "300px",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Uploaded Preview"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="camera-placeholder bg-secondary bg-opacity-25 d-flex flex-column justify-content-center align-items-center mb-4"
                    style={{ height: "300px", borderRadius: "8px" }}
                  >
                    <Camera size={64} className="text-info mb-3" />
                    <p className="mb-0 text-light">
                      Camera preview would appear here
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  className="form-control mb-3"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file); // Store the raw file
                      const reader = new FileReader();
                      reader.onloadend = () => setImagePreview(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                <p className="text-muted mb-0">
                  Position the item in front of the camera for scanning or
                  upload an image
                </p>
              </div>
              <div className="modal-footer border-secondary">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    if (imageFile) {
                      uploadImage(); // Call upload function if an image exists
                    } else {
                      alert("Please select or capture an image first!");
                    }
                    setImagePreview(null);
                    stopCamera();
                  }}
                >
                  Upload
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setImagePreview(null);
                    stopCamera();
                  }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-info d-flex align-items-center"
                  onClick={() => (cameraActive ? stopCamera() : startCamera())}
                >
                  <Camera size={18} className="me-2" />
                  <span>{cameraActive ? "Stop Camera" : "Start Scanning"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Preview Card */}
      {previewItem && (
        <PreviewCard item={previewItem} onClose={handleClosePreview} />
      )}

      {/* Confirmation Dialog for Remove */}
      <ConfirmBox
        isOpen={confirmDialog.isOpen}
        message={confirmDialog.message}
        onConfirm={confirmRemoveItem}
        onCancel={() =>
          setConfirmDialog({ isOpen: false, message: "", itemId: null })
        }
        title="Confirm Removal"
      />

      {/* Processing Dialog */}
      <StartProcess
        isOpen={processDialog.isOpen}
        itemDetails={processDialog.item}
        onConfirm={confirmProcessItem}
        onCancel={() => setProcessDialog({ isOpen: false, item: null })}
        title="Process Item"
      />

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Inventory;
