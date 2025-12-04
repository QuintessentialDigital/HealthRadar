import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">HealthRadar</Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/dentist">DentistRadar</Link>
          <span className="disabled">GPRadar (soon)</span>
        </nav>
      </div>
    </header>
  );
}

export default Header;
