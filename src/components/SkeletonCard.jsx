import React from "react";

function SkeletonCard() {
  return (
    <div style={{ background:"#eee", borderRadius:"10px", padding:"10px" }}>
      <div style={{ width:"100%", height:"200px", background:"#ddd", borderRadius:"8px" }}></div>
      <div style={{ height:"20px", background:"#ddd", marginTop:"10px", width:"80%" }}></div>
      <div style={{ height:"15px", background:"#ddd", marginTop:"8px", width:"100%" }}></div>
    </div>
  );
}

export default SkeletonCard;