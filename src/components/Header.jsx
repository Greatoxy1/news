import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // fixed import

function Header() {
  return (
    <header className="header">
      <h1 className="logo">GlobbalNews</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/world">World</Link>
        <Link to="/about"></Link>
        <Link to="/stories">Entertainment</Link>
        <Link to="/event">New updates</Link>
        <Link to="/news">Africa</Link>
      </nav>
    </header>
  );
}

export default Header;