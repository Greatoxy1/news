import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`https://your-api.com/articles/${slug}`)
      .then(res => res.json())
      .then(data => setArticle(data))
      .catch(() => setArticle(null));
  }, [slug]);

  if (!article) {
    return <p>Loading article...</p>;
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

      <h2>Analysis</h2>
      <p>{article.analysis}</p>

      <h2>Details</h2>
      <p>{article.description}</p>

      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read original source
      </a>
    </div>
  );
}