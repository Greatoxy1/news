import { useLocation } from "react-router-dom";

export default function ArticlePage() {
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>{article.title}</h1>

      <p><strong>Source:</strong> {article.source}</p>

      <img
        src={article.image}
        alt={article.title}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      {/* ✅ ORIGINAL CONTENT (YOU MUST WRITE THIS) */}
      <h2>Our Summary</h2>
      <p>
        This article discusses recent developments related to global events.
        Based on available information, the situation continues to evolve and may
        have wider international implications.
      </p>

      {/* ✅ API content */}
      <h2>Details</h2>
      <p>{article.description}</p>

      {/* ✅ source link */}
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read original source
      </a>
    </div>
  );
}