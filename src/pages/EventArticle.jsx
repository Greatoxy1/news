import { useParams } from "react-router-dom";
import { events } from "../data/events";

export default function EventArticle() {
  const { slug } = useParams();

  const article = events.find(
    event => event.slug === slug
  );

  if (!article) {
    return <h2>Article not found</h2>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>{article.title}</h1>

      <p>
        By {article.author} | {article.date}
      </p>

      <img
        src={article.image}
        alt={article.title}
        width="100%"
      />

      <p>{article.content}</p>
    </div>
  );
}