import AmazonProduct from "../components/AmazonProduct";

function Article() {
  const products = [
    { title: "Unisex ck perfume", link: "https://amzn.eu/d/0dfNKH3B" },
    { title: "Agbada", link: "https://amzn.eu/d/0hB5vK7e" },
    { title: "Sumsung Galaxy Book4", link: "https://amzn.eu/d/06NQZKfm" },
  ];

  return (
    <div>
      <h1>Top Tech Gadgets Released</h1>
      <p>Check out the latest gadgets that are trending this month.</p>

      {/* All products in one line */}
      <AmazonProduct products={products} />

    </div>
  );
}

export default Article;