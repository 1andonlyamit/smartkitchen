import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Navbar, Container, Badge } from 'react-bootstrap';
=======
import { Navbar, Container} from 'react-bootstrap';
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
import { Bell } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TopBar = ({ restaurantName = "The Gourmet Kitchen" }) => {
  const [expiringItems, setExpiringItems] = useState(2);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.random() > 0.7) {
        setExpiringItems(prev => {
          const newValue = Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1));
          if (newValue > prev) {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }
          return newValue;
        });
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-2 border-bottom border-secondary">
      <Container fluid className="px-3">
        <div className="d-flex align-items-center">
          <div className="me-3">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#4FD1C5" stroke="#4FD1C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6L7 9V15L12 18L17 15V9L12 6Z" fill="#2D3748" stroke="#4FD1C5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <Navbar.Brand href="#home" className="text-white fw-bold fs-5">WasteWise</Navbar.Brand>
        </div>

        <div className="mx-auto">
          <h5 className="text-white mb-0">{restaurantName}</h5>
        </div>

        <div className="d-flex align-items-center">
          <div className="position-relative me-3">
            <Bell size={24} color="white" className="cursor-pointer" />
            {expiringItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-1">
                <span className="visually-hidden">notifications</span>
              </span>
            )}
          </div>

          <div className={`alert-badge px-3 py-1 rounded-pill bg-danger text-white ${showNotification ? 'animate__animated animate__fadeIn' : ''}`}>
            Expiry Alert: {expiringItems} items
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

<<<<<<< HEAD
export default TopBar;
=======
export default TopBar;
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
