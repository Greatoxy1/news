import React from "react";
import { Link } from "react-router-dom";
import "../NewsGrid.css";

function NewsGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return <p>Wait for news updates.</p>;
  }

  return (
    <div className="news-grid">
      {articles.map((article) => (
        <div key={article.url} className="news-card">
          <img
            src={article.image}
            alt={article.title}
            className="news-image"
            onError={(e) => {
              e.target.src = "/fallback.jpg";
            }}
          />

          <div className="news-info">
            <h3>{article.title}</h3>

            {/* ✅ YOUR CONTENT */}
            <p>
              This article highlights recent developments in global news.
              Read our summary to understand the key points.
            </p>

            <Link
              to={`/news/${encodeURIComponent(article.title)}`}
              state={{ article }}
            >
              Read full article →
            </Link>
            {/* ✅ Optional external source */}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsGrid;