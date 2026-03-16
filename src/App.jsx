import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Stories from "./pages/Stories";
import Event from "./pages/Event";
import News from "./pages/News";
import Article from "./pages/Article";
import Footer from "./components/Footer";
import BreakingNews from "./components/BreakingNews";
import Subscribe from "./components/Subscribe";
import World from "./components/World";
function App() {
  return (
    <>
      <Header />
      <BreakingNews />
      <Article/>
      <World/>
      <Subscribe/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/event" element={<Event />} />
        <Route path="/news" element={<News />} />
        <Route path="/article" element={<Article />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;