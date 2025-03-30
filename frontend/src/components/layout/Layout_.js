import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './Topbar';
<<<<<<< HEAD
import "./Layout_.css"
=======
// import "./Layout_.css"
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
<<<<<<< HEAD
    <div className="d-flex min-vh-100 bg-light">
=======
    <div className="d-flex min-vh-100 bg-dark">
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
      <Sidebar isParentOpen={sidebarOpen} setIsParentOpen={setSidebarOpen} />

      <div className="flex-grow-1 d-flex flex-column"
           style={{
             marginLeft: isMobile ? 0 : (sidebarOpen ? '240px' : '60px'),
             transition: 'margin-left 0.3s',
             width: '100%'
           }}>
        <TopBar restaurantName="The Gourmet Kitchen" />

        <main className="flex-grow-1 p-4 overflow-auto">
          {children}
          {/* other components */}
        </main>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Layout;
=======
export default Layout;
>>>>>>> c3386e04fa4cdbb6d9111c12b5cac58a27e7ccdc
