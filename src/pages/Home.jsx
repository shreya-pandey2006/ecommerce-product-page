import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductList from "../components/ProductList";
function Home({ onAddToCart, onViewProduct, search, category, sortBy }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => { async function loadData() {
      try {
        const productData = await getProducts();
        setProducts(productData);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(true);
      }
      setLoading(false);
    }
    loadData();
  }, [retryCount]);

  function handleRetry() {
    setError(false);
    setLoading(true);
    setRetryCount(retryCount + 1); 
  }
  const searchText = search.toLowerCase();
  let visibleProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchText) || product.category.toLowerCase().includes(searchText);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === "price-low") {
    visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    visibleProducts = [...visibleProducts].sort((a, b) => b.rating - a.rating);
  }

  return (
    <main className="container">
      <section className="store-heading">
        <h2>Shop our collection</h2> 
        <p>Browse products, search by name and add your favourites to the cart.</p>
      </section>

      {loading && <p className="message">Loading products...</p>}
      {error && (
        <div className="message"> <p>Unable to load products. Please try again.</p> 
        <button className="btn" onClick={handleRetry}>Retry</button> </div>
      )}

      {!loading && !error && ( <ProductList products={visibleProducts} onAddToCart={onAddToCart} onViewProduct={onViewProduct} /> )}
    </main>
  );
}

export default Home;