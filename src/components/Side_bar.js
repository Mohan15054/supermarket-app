"use client"
//Sidebar.js
import React, { useState } from 'react';
import './Side_bar.css';
import Link from 'next/link';


const Sidebar = ({ menuItems }) => {
  // State to manage the open/close state of the sidebar
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

// {menuItems.map((item) => (
//   <Link key={item.name} href={`/${item.name.toLowerCase()}`}>
//     <div className="menu-item">
//       <span>{item.icon}</span>
//       <span>{item.name}</span>
//     </div>
//   </Link>
// ))}

  return (
    <div className="sidebar-container">
      {/* <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'} Sidebar
      </div> */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Sidebar content */}
        <div className="sidebar-content">
          {/* User Profile Section */}
          <div className="user-profile">
            <div className="user-info">
              <div className="user-avatar">
                <span>S</span>
                <div className="notification-badge">
                  <span>4</span>
                </div>
              </div>
              <div>
                <h3 className="user-name">Samantha</h3>
                <p className="user-email">samantha@email.com</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="nav-menu">
            <ul className="menu-list">
              {menuItems.map((item) => (
                <li key={item.name} className="menu-item" >
                  <Link key={item.name} href={`/${item.name.toLowerCase()}`}>
                  <button
                    onClick={() => setActiveItem(item.name)}
                    className={`menu-button ${activeItem === item.name ? 'active' : ''}`}>
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-text">{item.name}</span>
                  </button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={`main-content ${isOpen ? 'main-content-shifted' : 'main-content-normal'}`}>
        {/* Button to toggle sidebar */}
        <div className="toggle-button-container">
          <button
            className="toggle-button"
            onClick={() => setIsOpen(!isOpen)}>
            {/* Toggle icon based on isOpen state */}
            {isOpen ? (
              <svg
                className="toggle-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="toggle-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Sidebar;
            
