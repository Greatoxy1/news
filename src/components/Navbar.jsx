import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "120px" }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/stories">Stories</Link>
      <Link to="/event">Event</Link>
    </nav>
  );
}

export default Navbar;
