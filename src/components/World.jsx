import React, { useEffect, useState } from "react";
import NewsGrid from "../components/NewsGrid";

function World() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = import.meta.env.VITE_NEWSAPI_KEY;

  useEffect(() => {
   const fetchArticles = async () => {
  if (!hasMore) return;
fetch(`http://localhost:5000/news?page=${page}`)
  setLoading(true);

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&page=${page}&apiKey=${apiKey}`
    );

    const data = await res.json();

    if (data.articles?.length) {
      setArticles(prev => {
        const newArticles = data.articles.filter(
          a => !prev.some(p => p.url === a.url)
        );
        return [...prev, ...newArticles];
      });
    } else {
      setHasMore(false);
    }

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

    fetchArticles();
  }, [page, apiKey, hasMore]);

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

  const throttled = () => {
    requestAnimationFrame(handleScroll);
  };

  window.addEventListener("scroll", throttled);
  return () => window.removeEventListener("scroll", throttled);
}, [loading, hasMore]);
  return (
  <>
    <NewsGrid articles={articles} />
    {loading && <p style={{ textAlign: "center" }}>Loading more news...</p>}
    {!hasMore && <p style={{ textAlign: "center" }}>No more news</p>}
  </>
);

}

export default World;