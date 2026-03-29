import React from "react";
import "../NewsGrid.css"; // Make sure to create some basic grid styles

function NewsGrid({ articles }) {
  if (!articles || articles.length === 0) return <p>No news available.</p>;

  return (
    <div className="news-grid">
      {articles.map(article => (
        <div key={article.url} className="news-card">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <img src={article.image} alt={article.title} className="news-image" />
            <div className="news-info">
              <h3>{article.title}</h3>
              <p>{article.source}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default NewsGrid;