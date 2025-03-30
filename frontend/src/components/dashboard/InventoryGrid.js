import React from "react";
import InventoryCard from "../ui/InventoryCard";

function InventoryGrid() {
  return (
    <div>
      {/* 1 */}
      <div className="container mt-4">
      <div className="row row-cols-3 g-4">
        <div className="col">
          <InventoryCard
            image="/frontend/uploads/chickhen.jpg"
            name="Chicken"
            weight={45.5}
            expiryDate="Nov 30, 2023"
            daysLeft={7}
            status="FRESH"
          />
        </div>
        <div className="col">
          <InventoryCard
            image="/frontend/uploads/chickhen.jpg"
            name="33333"
            weight={45.5}
            expiryDate="Nov 30, 2023"
            daysLeft={7}
            status="FRESH"
          />
        </div>
        <div className="col">
          <InventoryCard
            image="https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w="
            name="Apple"
            weight={45.5}
            expiryDate="Nov 30, 2023"
            daysLeft={7}
            status="FRESH"
          />
        </div>
        <div className="col">
          <InventoryCard
            image="/frontend/uploads/chickhen.jpg"
            name="33333"
            weight={45.5}
            expiryDate="Nov 30, 2023"
            daysLeft={7}
            status="FRESH"
          />
        </div>
      </div>
        </div>
    </div>
  );
}

export default InventoryGrid;
