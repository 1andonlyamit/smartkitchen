import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './Topbar';
// import "./Layout_.css"

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
    <div className="d-flex min-vh-100 bg-dark">
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

export default Layout;