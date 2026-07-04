import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Stories from "./pages/Stories";
import Event from "./pages/Event";
import News from "./pages/News";
import BreakingNews from "./components/BreakingNews";
import Subscribe from "./components/Subscribe";
import World from "./components/World";
import ArticlePage from "./pages/ArticlePage";
import EventArticle from "./pages/EventArticle";
import NewsArticle from "./pages/NewsArticle";
function App() {
  return (
    <>
      <Header />
      <BreakingNews />
      <World/>
      <Subscribe/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/event" element={<Event />} />
        <Route path="/news" element={<News />} />
        <Route path="/events/:slug" element={<EventArticle />} />
       <Route path="/news/:slug" element={<NewsArticle />} />

      </Routes>

    </>
  );
}

export default App;