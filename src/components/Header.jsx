import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgb(21, 199, 235)", color: "black", padding: "5px" }}>
      <h1>GlobbalNews</h1>
      <nav>
        <Link to="/" style={{ color: "black", margin: "0 10px" }}>Home</Link>
        <Link to="/world" style={{ color: "black", margin: "0 10px" }}>World</Link>
        <Link to="/about" style={{ color: "black", margin: "0 10px" }}>About</Link>
        <Link to="/stories" style={{ color: "black", margin: "0 10px" }}>Stories</Link>
        <Link to="/event" style={{ color: "black", margin: "0 10px" }}>Event</Link>
        <Link to="/news" style={{ color: "black", margin: "0 10px" }}>News</Link>
      </nav>
    </header>
  );
}

export default Header;