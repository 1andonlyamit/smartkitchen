<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
import {
  House,
  ClipboardData,
  Book,
  BarChart,
  Calendar,
  Gear,
<<<<<<< HEAD
  QuestionCircle,
  List,
  X
} from 'react-bootstrap-icons';

const Sidebar = ({ isParentOpen, setIsParentOpen }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
=======
  List,
  X
} from "react-bootstrap-icons";

const Sidebar = ({ isParentOpen, setIsParentOpen }) => {
  const menuItems = [
    { name: "Dashboard", icon: <House size={20} />, path: "/dashboard" },
    { name: "Inventory", icon: <ClipboardData size={20} />, path: "/inventory" },
    { name: "Recipes", icon: <Book size={20} />, path: "/recepies" },
    { name: "Analytics", icon: <BarChart size={20} />, path: "/analytics" },
    { name: "Forecasting", icon: <Calendar size={20} />, path: "/forecasting" },
    { name: "Settings", icon: <Gear size={20} />, path: "/settings" }
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
=======
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);

  useEffect(() => {
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
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
<<<<<<< HEAD
      } else {
        setIsOpen(true);
        if (setIsParentOpen) setIsParentOpen(true);
=======
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
      }
    };

    checkScreenSize();
<<<<<<< HEAD

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [setIsParentOpen]);

  const menuItems = [
    { name: 'Dashboard', icon: <House size={20} /> },
    { name: 'Inventory', icon: <ClipboardData size={20} /> },
    { name: 'Recipes', icon: <Book size={20} /> },
    { name: 'Analytics', icon: <BarChart size={20} /> },
    { name: 'Forecasting', icon: <Calendar size={20} /> },
    { name: 'Settings', icon: <Gear size={20} /> },
  ];

=======
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setIsParentOpen]);

>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (setIsParentOpen) setIsParentOpen(newState);
  };

  return (
    <>
<<<<<<< HEAD
      <button
        onClick={toggleSidebar}
        className={`d-md-none position-fixed top-0 ${isOpen ? 'start-240' : 'start-0'} mt-3 ms-3 btn btn-dark rounded-3 p-2 shadow-sm`}
        style={{
          zIndex: 1030,
          transition: 'all 0.3s',
          left: isOpen ? '240px' : '0'
=======
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="d-md-none position-fixed top-0 mt-3 ms-3 btn btn-dark rounded-3 p-2 shadow-sm"
        style={{
          zIndex: 1000,
          transition: "all 0.3s",
          left: isOpen ? "240px" : "10px"
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
        }}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={20} /> : <List size={20} />}
      </button>

<<<<<<< HEAD
      {isOpen && isMobile && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
          style={{zIndex: 1020}}
=======
      {/* Background overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
          style={{ zIndex: 1020 }}
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
          onClick={toggleSidebar}
        ></div>
      )}

<<<<<<< HEAD
      <div
        className="bg-dark text-white position-fixed h-100 d-flex flex-column"
        style={{
          width: isOpen ? '240px' : '60px',
          zIndex: 1025,
          transition: 'all 0.3s ease-in-out',
          transform: (!isOpen && isMobile) ? 'translateX(-100%)' : 'translateX(0)',
          overflowX: 'hidden',
          boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="d-flex align-items-center p-3 border-bottom border-secondary">
           
          <h4 className={`m-0 fw-bold ${!isOpen ? 'd-none' : ''}`}
              style={{transition: 'opacity 0.2s', opacity: isOpen ? 1 : 0, whiteSpace: 'nowrap'}}>
            WasteWise
          </h4>
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="btn btn-link text-white ms-auto p-0 d-none d-md-block"
              style={{marginRight: isOpen ? '0' : '-20px'}}
            >
              {isOpen ? <X size={16} /> : <List size={16} />}
            </button>
          )}
=======
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
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
        </div>

        <div className="mt-2 overflow-y-auto flex-grow-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
<<<<<<< HEAD
              onClick={() => setActiveItem(item.name)}
              className={`w-100 border-0 text-start d-flex align-items-center py-3 px-4
                ${activeItem === item.name ? 'bg-secondary bg-opacity-25 border-start border-4 border-info' : ''}
                ${isOpen ? '' : 'justify-content-center'}`}
              style={{
                transition: 'all 0.2s',
                backgroundColor: activeItem === item.name ? 'rgba(128, 128, 128, 0.3)' : '',
                color: activeItem === item.name ? '#ffffff' : 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(128, 128, 128, 0.3)'; // Grey color on hover
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                if (activeItem !== item.name) {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.color = 'inherit';
                }
              }}
            >
              <span className="d-inline-flex justify-content-center align-items-center">
                {item.icon}
              </span>
              <span className={`ms-3 ${!isOpen ? 'd-none' : ''}`}
                    style={{transition: 'opacity 0.2s', opacity: isOpen ? 1 : 0, whiteSpace: 'nowrap'}}>
=======
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
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
                {item.name}
              </span>
            </button>
          ))}
        </div>
<<<<<<< HEAD

        <div className="mt-auto mb-4 px-3">
          <div className="bg-dark bg-opacity-75 p-3 rounded-3 border border-secondary">
            <div className="d-flex align-items-center">
              <div className="bg-info bg-opacity-25 rounded-circle p-2 me-3">
                <QuestionCircle size={24} className="text-info" />
              </div>
              <div className={!isOpen ? 'd-none' : ''}
                   style={{transition: 'opacity 0.2s', opacity: isOpen ? 1 : 0, whiteSpace: 'nowrap'}}>
                <div className="fw-bold">Need Help?</div>
                <div className="text-secondary small">Check our documentation</div>
              </div>
            </div>
          </div>
        </div>
=======
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
      </div>
    </>
  );
};

export default Sidebar;
