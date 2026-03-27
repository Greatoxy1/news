import React, { useEffect, useState } from "react";
import "../index.css";

function BreakingNews() {
  const [headline, setHeadline] = useState("Loading breaking news...");

  useEffect(() => {
    fetch("https://news-xurb.onrender.com/news")
      .then((res) => res.json())
      .then((data) => {
        const titles = data.map((n) => n.title).join(" 🔴 ");
        setHeadline(titles);
      })
      .catch(() => {
        setHeadline("⚠️🔴 Stay active Globbalnews.com will provide you current News.🔴, Sports highlights and manymore");
      });
  }, []);

  return (
    <div style={styles.wrapper} >
      <div className="ticker">{headline}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "rgb(217, 4, 153)",
    color: "white",
    overflow: "hidden",
    whiteSpace: "nowrap",
    padding: "10px 0",
    fontWeight: "bold",
    minWidth : "100px" 
  },
 
};

export default BreakingNews;