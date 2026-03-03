import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "40px" }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/stories">Stories</Link>
      <Link to="/event">Iran News</Link>
      <Link to ="/news">Libya News</Link>
    </nav>
  );
}

export default Navbar;
