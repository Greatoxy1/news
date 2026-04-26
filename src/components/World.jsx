import React, { useEffect, useState } from "react";
import NewsGrid from "../components/NewsGrid";

function World() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!hasMore) return;

      setLoading(true);

      try {
        const res = await fetch(`https://news-xurb.onrender.com/news?page=${page}`);
        const data = await res.json();

        if (data.length > 0) {
          setArticles(prev => {
            const newArticles = data.filter(
              a => !prev.some(p => p.url === a.url)
            );
            return [...prev, ...newArticles];
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 400 &&
        !loading &&
        hasMore
      ) {
        setPage(prev => prev + 1);
      }
    };

    const throttled = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", throttled);
    return () => window.removeEventListener("scroll", throttled);
  }, [loading, hasMore]);

  return (
    <div>
      {/* ✅ ADD ORIGINAL CONTENT (VERY IMPORTANT) */}
      <h1>World News Overview</h1>
      <p>
        This page provides a curated overview of global news developments.
        We summarize key events and trends from different regions to help readers
        understand what is happening around the world.
      </p>

      <h2>Latest Global Developments</h2>
      <p>
        International news continues to focus on geopolitical tensions,
        economic challenges, and humanitarian issues. Our goal is to highlight
        the most important stories and provide simple, clear summaries.
      </p>

      {/* ✅ YOUR NEWS GRID (API CONTENT) */}
      <NewsGrid articles={articles} />

      {loading && <p style={{ textAlign: "center" }}>Loading more news...</p>}
      {!hasMore && <p style={{ textAlign: "center" }}>No more news</p>}
    </div>
  );
}

export default World;