import React from "react";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__profile">
        <img
          src="https://randomuser.me/api/portraits/women/75.jpg"
          alt="Profile"
          className="header__profile-img"
        />
        
      </div>
      <div className="header__title">Supermarket Name</div>
    </header>
  );
}
