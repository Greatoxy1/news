import React from "react";
import NewsCard from "../components/NewsCard"
function NewsGrid({ articles }) {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {articles.map((article, idx) => (
        <NewsCard
          key={idx}
          title={article.title}
          description={article.description}
          img={article.urlToImage || "https://picsum.photos/400/200"}
          url={article.url}
        />
      ))}
    </section>
  );
}

export default NewsGrid;