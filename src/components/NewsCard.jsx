import React from "react";

function NewsCard({ title, description, img, url }) {
    return (
        <div style={{ background: "white", padding: "15px" }}>
            <img src={img} alt={title} style={{ width: "100%" }} />

            <h3>{title}</h3>
            <p>{description}</p>
            <img

            onError={(e) => {
            e.target.src = "https://picsum.photos/400/200";
             }}
            />
            <div
  style={{
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(20, 53, 239, 0.96)",
    transition: "transform 0.2s ease",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
></div>
            <a href={url}>Read More</a>
        </div>
    );
}

export default NewsCard;