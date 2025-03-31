import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Button } from 'react-bootstrap';
import {
  House,
  ClipboardData,
  Book,
  BarChart,
  Calendar,
  Gear,
  List,
  X,
  BoxSeam // Icon for the Fridge
} from "react-bootstrap-icons";

const Sidebar = ({ isParentOpen, setIsParentOpen }) => {
  const menuItems = [
    { name: "Dashboard", icon: <House size={20} />, path: "/dashboard" },
    { name: "Inventory", icon: <ClipboardData size={20} />, path: "/inventory" },
    { name: "Recipes", icon: <Book size={20} />, path: "/recepies" },
    { name: "Analytics", icon: <BarChart size={20} />, path: "/analytics" },
    { name: "Forecasting", icon: <Calendar size={20} />, path: "/forecasting" },
    { name: "Settings", icon: <Gear size={20} />, path: "/settings" },
    // { name: "Fridge", icon: <Gear size={20} />, path: "/Fridge" }

  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isParentOpen !== undefined) {
      setIsOpen(isParentOpen);
    }
  }, [isParentOpen]);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setIsOpen(false);
        if (setIsParentOpen) setIsParentOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setIsParentOpen]);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (setIsParentOpen) setIsParentOpen(newState);
  };

  const openFridge = () => {
    navigate('/fridge');
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="d-md-none position-fixed top-0 mt-3 ms-3 btn btn-dark rounded-3 p-2 shadow-sm"
        style={{
          zIndex: 1000,
          transition: "all 0.3s",
          left: isOpen ? "240px" : "10px"
        }}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={20} /> : <List size={20} />}
      </button>

      {/* Background overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
          style={{ zIndex: 1020 }}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className="bg-dark text-white position-fixed h-100 d-flex flex-column"
        style={{
          width: isOpen ? "240px" : "60px",
          zIndex: 1025,
          transition: "all 0.3s ease-in-out",
          transform: isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)",
          overflowX: "hidden",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)"
        }}
      >
        <div className="d-flex align-items-center p-3 border-bottom border-secondary">
          <h4
            className={`m-0 fw-bold ${!isOpen ? "d-none" : ""}`}
            style={{ transition: "opacity 0.2s", opacity: isOpen ? 1 : 0, whiteSpace: "nowrap" }}
          >
            Menu
          </h4>
        </div>

        <div className="mt-2 overflow-y-auto flex-grow-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-100 border-0 text-start d-flex align-items-center py-3 px-4
                ${activeItem === item.name ? "bg-secondary bg-opacity-25 border-start border-4 border-info" : ""}
                ${isOpen ? "" : "justify-content-center"}`}
              style={{
                transition: "all 0.2s",
                backgroundColor: activeItem === item.name ? "rgba(128, 128, 128, 0.3)" : "#212529",
                color: activeItem === item.name ? "#ffffff" : "inherit"
              }}
            >
              <span className="d-inline-flex justify-content-center align-items-center">{item.icon}</span>
              <span
                className={`ms-3 ${!isOpen ? "d-none" : ""}`}
                style={{ transition: "opacity 0.2s", opacity: isOpen ? 1 : 0, whiteSpace: "nowrap" }}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Open Fridge Button at the Bottom */}
        <div className="mt-auto p-3">
          <button
            onClick={openFridge}
            className="w-100 border-0 text-start d-flex align-items-center py-3 px-4"
            style={{
              transition: "all 0.2s",
              backgroundColor: "#4CAF50", // Distinct color for the button
              color: "#ffffff"
            }}
          >
            <span className="d-inline-flex justify-content-center align-items-center">
              <BoxSeam size={20} />
            </span>
            <span
              className={`ms-3 ${!isOpen ? "d-none" : ""}`}
              style={{ transition: "opacity 0.2s", opacity: isOpen ? 1 : 0, whiteSpace: "nowrap" }}
            >
              Open Fridge
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;