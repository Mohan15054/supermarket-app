"use client"
//Sidebar.js
import React, { useState } from 'react';
import './Side_bar.css';
import Link from 'next/link';


const Sidebar = ({ menuItems, children }) => {
  // State to manage the open/close state of the sidebar
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  

  return (
  <div className="sidebar-container">
    {/* Toggle button - always visible */}
    <button
      className={isOpen ?  "sidebar-toggle-closed": "sidebar-toggle"}
      onClick={() => setIsOpen(!isOpen)}>
      <div className="hamburger-icon">
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
    </button>

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
              <li key={item.name} className="menu-item">
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
      {children}
    </div>
  </div>
);
}


export default Sidebar;
            
