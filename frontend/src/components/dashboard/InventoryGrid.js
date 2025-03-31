import React, { useState } from "react";
import InventoryCard from "../ui/InventoryCard";

function InventoryGrid() {
  // Hardcoded inventory data with more items
  const inventoryItems = [
    {
      id: 1,
      image: "/frontend/static/uploads/chicken.jpg",
      name: "Chicken",
      weight: 45.5,
      expiryDate: "Apr 7, 2025",
      daysLeft: 7,
      status: "FRESH"
    },
    {
      id: 2,
      image: "/frontend/static/uploads/chicken.jpg",
      name: "Tomatoes",
      weight: 20.2,
      expiryDate: "Apr 3, 2025",
      daysLeft: 3,
      status: "USE SOON"
    },
    {
      id: 3,
      image: "/frontend/static/uploads/chicken.jpg",
      name: "Apples",
      weight: 15.8,
      expiryDate: "Apr 10, 2025",
      daysLeft: 10,
      status: "FRESH"
    },
    {
      id: 4,
      image: "/frontend/static/uploads/chicken.jpg",
      name: "Milk",
      weight: 30.0,
      expiryDate: "Apr 2, 2025",
      daysLeft: 2,
      status: "USE SOON"
    },
    {
      id: 5,
      image: "/frontend/static/uploads/chicken.jpg",
      name: "Lettuce",
      weight: 10.5,
      expiryDate: "Apr 4, 2025",
      daysLeft: 4,
      status: "USE SOON"
    },
    {
      id: 6,
      image: "/frontend/static/uploads/chicken.jpg",
      name: "Cheese",
      weight: 12.3,
      expiryDate: "Apr 15, 2025",
      daysLeft: 15,
      status: "FRESH"
    }
  ];

  // Filter state
  const [filterStatus, setFilterStatus] = useState("ALL");

  // Filter function
  const filteredItems = filterStatus === "ALL" 
    ? inventoryItems 
    : inventoryItems.filter(item => item.status === filterStatus);

  return (
    <div className="container-fluid px-4 py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 text-white">Current Inventory</h5>
        <div className="btn-group">
          <button 
            className={`btn ${filterStatus === "ALL" ? "btn-info" : "btn-outline-info"}`}
            onClick={() => setFilterStatus("ALL")}
          >
            All
          </button>
          <button 
            className={`btn ${filterStatus === "FRESH" ? "btn-info" : "btn-outline-info"}`}
            onClick={() => setFilterStatus("FRESH")}
          >
            Fresh
          </button>
          <button 
            className={`btn ${filterStatus === "USE SOON" ? "btn-info" : "btn-outline-info"}`}
            onClick={() => setFilterStatus("USE SOON")}
          >
            Use Soon
          </button>
        </div>
      </div>
      
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredItems.map(item => (
          <div key={item.id} className="col">
            <InventoryCard
              image={item.image}
              name={item.name}
              weight={item.weight}
              expiryDate={item.expiryDate}
              daysLeft={item.daysLeft}
              status={item.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryGrid;