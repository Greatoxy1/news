import { Link } from "react-router-dom";
import  {news}  from "../data/news";

export default function News() {
  return (
    <div>
      <h1>Breaking news</h1>

      {news.map(news => (
        <div key={news.slug}>
          <h2>
            <Link to={`/news/${news.slug}`}>
              {news.title}
            </Link>
          </h2>

          <p>{news.date}</p>
        </div>
      ))}
    </div>
  );
}