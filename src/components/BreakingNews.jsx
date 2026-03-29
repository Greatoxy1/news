import React, { useEffect, useState } from "react";
import "../index.css";

function BreakingNews() {
  const [headline, setHeadline] = useState("Loading breaking news...");

useEffect(() => {
  const fetchHeadlines = () => {
    fetch("http://localhost:5000/news")
      .then((res) => res.json())
      .then((data) => {
        const titles = data.map((n) => n.title).join(" 🔴 ");
        setHeadline(titles);
      })
      .catch(() => {
        setHeadline(
          "⚠️🔴 Stay active Globbalnews.com will provide you current News. 🔴 Sports highlights and more"
        );
      });
  };

  fetchHeadlines(); // initial fetch
  const interval = setInterval(fetchHeadlines, 5 * 60 * 1000); // refresh every 5 minutes

  return () => clearInterval(interval); // cleanup on unmount
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