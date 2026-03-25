import { useEffect, useState } from "react";
import { fetchTopNews } from "../services/api";

function TopStories() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchTopNews().then(data => setNews(data.articles));
  }, []);

  return (
    <div>
      <h1>Top Stories</h1>

      {news?.map((article, i) => (
        <div key={i}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TopStories;