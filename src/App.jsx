import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Stories from "./components/pages/Stories";
import Event from "./components/pages/Event";
import News from "./components/pages/News";
import ProductLink from "./components/ProductLink";
import Footer from "./components/Footer";
function App() {
  return (
    <>
   <ProductLink/>
    <Router>
      <Navbar />
     <Footer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/event" element={<Event />} />
        <Route path="/news" element={<News/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
