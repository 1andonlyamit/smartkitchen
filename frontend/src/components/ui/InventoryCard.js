import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InventoryCard = ({ image, name, weight, expiryDate, daysLeft, status }) => {
  return (
    <div className="card bg-dark text-white" style={{ width: "18rem", borderRadius: "10px" }}>
      <img src={image} className="card-img-top" alt={name} style={{ borderRadius: "10px 10px 0 0", height: "150px", objectFit: "cover" }} />
      <div className="card-body">
        <span className={`badge ${status === "FRESH" ? "bg-success" : "bg-danger"}`} style={{ position: "absolute", top: "10px", right: "10px" }}>
          {status}
        </span>
        <h5 className="card-title mt-3">{name}</h5>
        <p className="card-text">{weight} kg</p>
        <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>Expires: {expiryDate}</p>
        <p className={`card-text ${daysLeft > 0 ? "text-success" : "text-danger"}`}>
          {daysLeft} days left
        </p>
      </div>
    </div>
  );
};

export default InventoryCard;
