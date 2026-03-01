import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "50px" }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/stories">Stories</Link>
      <Link to="/event">Iran leader has confirmed killed</Link>
      <Link to ="/news">Current tentions in Libya</Link>
    </nav>
  );
}

export default Navbar;
