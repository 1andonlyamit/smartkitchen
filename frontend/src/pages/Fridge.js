import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout_";
import Footer from "../components/footer/Footer";
import { Plus, Trash } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Fridge = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Milk",
      category: "Dairy",
      purchaseTime: "2025-03-01T10:00",
      expiryDate: "2025-04-01",
      quantity: 2,
      costPerItem: 1.5,
    },
    {
      id: 2,
      name: "Eggs",
      category: "Dairy",
      purchaseTime: "2025-03-02T14:30",
      expiryDate: "2025-04-02",
      quantity: 12,
      costPerItem: 0.2,
    },
    {
      id: 3,
      name: "Bread",
      category: "Bakery",
      purchaseTime: "2025-03-03T09:00",
      expiryDate: "2025-03-10",
      quantity: 1,
      costPerItem: 2.0,
    },
    {
      id: 4,
      name: "Apples",
      category: "Fruits",
      purchaseTime: "2025-03-04T16:00",
      expiryDate: "2025-03-15",
      quantity: 6,
      costPerItem: 0.5,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    purchaseTime: "",
    expiryDate: "",
    quantity: "",
    costPerItem: "",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Dairy",
    "Fruit",
    "Vegetable",
    "Meat",
    "Seafood",
    "Grain",
    "Condiment",
    "Beverage",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!newItem.name.trim()) newErrors.name = "Name is required";
    if (!newItem.category) newErrors.category = "Category is required";
    if (!newItem.purchaseTime)
      newErrors.purchaseTime = "Purchase time is required";
    if (!newItem.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!newItem.quantity) newErrors.quantity = "Quantity is required";
    if (!newItem.costPerItem)
      newErrors.costPerItem = "Cost per item is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8888/fridge/get-data");
      const result = await response.json();
  
      if (Array.isArray(result)) {
        // Ensure costPerItem is correctly set
        const formattedItems = result.map(item => ({
          ...item,
          costPerItem: parseFloat(item.cost_per_unit || 0),  // Convert safely
        }));
        setItems(formattedItems);
      } else {
        console.error("Error: API did not return an array", result);
        setItems([]); // Prevent errors by setting an empty array
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setItems([]); // Ensure items is always an array
    }
  };
  

  useEffect(() => {
    fetchData(); // ✅ Fetch data initially
    const intervalId = setInterval(fetchData, 1 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  //add item api
  const addItemAPI = async (item) => {
    try {
      const response = await fetch("http://localhost:8888/inventory/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const result = await response.json();
        setItems([...items, result]);
        setShowModal(false);
        setNewItem({
          name: "",
          category: "",
          purchaseTime: "",
          expiryDate: "",
          quantity: "",
          costPerItem: "",
        });
        setErrors({});
      } else {
        console.error("Failed to add item:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const HandleAddItem = async () => {
    if (validateForm()) {
      const item = {
        name: newItem.name,
        category: newItem.category,
        purchase_time: newItem.purchaseTime,
        expiry_date: newItem.expiryDate,
        quantity: parseFloat(newItem.quantity) || 0, 
        cost_per_unit: parseFloat(newItem.costPerItem) || 0,  
      };
  
      try {
        const response = await fetch("http://localhost:8888/fridge/addItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
  
        if (response.ok) {
          const result = await response.json();
          setItems([...items, { ...result, costPerItem: result.cost_per_unit }]);
          setShowModal(false);
          setNewItem({
            name: "",
            category: "",
            purchaseTime: "",
            expiryDate: "",
            quantity: "",
            costPerItem: "",
          });
          setErrors({});
        } else {
          console.error("Failed to add item:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };
  
  //delete
  const HandleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8888/inventory/deleteItem/id=${id}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Update state after successful API call
      } else {
        console.error("Failed to delete item:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

//   const removeItem = (id) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 text-light">Fridge Items</h2>
            <button
              className="btn btn-success d-flex align-items-center shadow"
              onClick={(addItemAPI) => setShowModal(true)}
            >
              <Plus size={20} className="me-2" />
              <span>Add Item</span>
            </button>
          </div>

          {/* Fridge Items Table */}
          <div className="card mb-4 shadow-sm bg-dark border-secondary">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-dark mb-0">
                  <thead className="bg-dark border-secondary">
                    <tr>
                      <th className="py-3 text-info">ID</th>
                      <th className="py-3 text-info">Name</th>
                      <th className="py-3 text-info">Category</th>
                      <th className="py-3 text-info">Purchase Time</th>
                      <th className="py-3 text-info">Expiry Date</th>
                      <th className="py-3 text-info">Quantity</th>
                      <th className="py-3 text-info">Cost Per Item</th>
                      <th className="py-3 text-info">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(items) &&
                      items.map((item) => (
                        <tr key={item.id} className="border-secondary">
                          <td className="align-middle">{item.id}</td>
                          <td className="align-middle">{item.name}</td>
                          <td className="align-middle">{item.category}</td>
                          <td className="align-middle">
                            {new Date(item.purchaseTime).toLocaleString()}
                          </td>
                          <td className="align-middle">{item.expiryDate}</td>
                          <td className="align-middle">{item.quantity}</td>
                          <td className="align-middle">
                          ${(item.costPerItem !== undefined ? item.costPerItem.toFixed(2) : '0.00')}
                          </td>
                          <td className="align-middle">
                          <button
  className="btn btn-sm btn-outline-danger"
  onClick={() => HandleDelete(item.id)}
>
  <Trash size={18} />
</button>

                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/* Add Item Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">Add Item</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className={`form-control bg-dark text-light border-secondary ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      name="name"
                      value={newItem.name}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className={`form-select bg-dark text-light border-secondary ${
                        errors.category ? "is-invalid" : ""
                      }`}
                      name="category"
                      value={newItem.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Purchase Date</label>
                    <input
                      type="date"
                      className={`form-control bg-dark text-light border-secondary ${
                        errors.purchaseTime ? "is-invalid" : ""
                      }`}
                      name="purchaseTime"
                      value={newItem.purchaseTime}
                      onChange={handleInputChange}
                    />
                    {errors.purchaseTime && (
                      <div className="invalid-feedback">
                        {errors.purchaseTime}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="date"
                      className={`form-control bg-dark text-light border-secondary ${
                        errors.expiryDate ? "is-invalid" : ""
                      }`}
                      name="expiryDate"
                      value={newItem.expiryDate}
                      onChange={handleInputChange}
                    />
                    {errors.expiryDate && (
                      <div className="invalid-feedback">
                        {errors.expiryDate}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className={`form-control bg-dark text-light border-secondary ${
                        errors.quantity ? "is-invalid" : ""
                      }`}
                      name="quantity"
                      value={newItem.quantity}
                      onChange={handleInputChange}
                      placeholder="Enter quantity"
                    />
                    {errors.quantity && (
                      <div className="invalid-feedback">{errors.quantity}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cost Per Item</label>
                    <input
                      type="number"
                      className={`form-control bg-dark text-light border-secondary ${
                        errors.costPerItem ? "is-invalid" : ""
                      }`}
                      name="costPerItem"
                      value={newItem.costPerItem}
                      onChange={handleInputChange}
                      placeholder="Enter cost per item"
                    />
                    {errors.costPerItem && (
                      <div className="invalid-feedback">
                        {errors.costPerItem}
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer border-secondary">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={HandleAddItem}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Fridge;
