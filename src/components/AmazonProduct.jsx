import React from "react";

function AmazonProduct({ products }) {
  if (!products || products.length === 0) return null;

  const productArray = Array.isArray(products) ? products : [products];

  return (
    <div style={styles.container}>
      {productArray.map((product, index) => {
        if (!product.title || !product.link) return null;

        return (
          <div key={index} style={styles.productBox}>
            <h3 style={styles.title}>{product.title}</h3>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.button}
            >
              Buy on Amazon
            </a>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",          // make children horizontal
    gap: "10px",              // space between products
    flexWrap: "wrap",         // wrap to next line on small screens
    justifyContent: "center", // center horizontally
    margin: "10px 0",
  },
  productBox: {
    border: "1px solid rgb(152, 241, 28)",
    padding: "2px",
    background: "rgb(59, 218, 249)",
    borderRadius: "2px",
    textAlign: "center",
    minWidth: "20px", // optional: keeps boxes same size
  },
  title: {
    marginBottom: "3px",
    color: "#333",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#ff9900",
    color: "#fff",
    padding: "2px 3px",
    textDecoration: "none",
    fontWeight: "bold",
    borderRadius: "3px",
    display: "inline-block",
  },
};

export default AmazonProduct;