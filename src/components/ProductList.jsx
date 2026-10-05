import ProductCard from "./ProductCard";
function ProductList({ products, onAddToCart, onViewProduct }) {
  if (products.length === 0) {
    return <p className="message">No products found.</p>;
  }
  return (
  <div className="product-grid"> {products.map((product) => ( <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewProduct={onViewProduct} />))} </div>
  );
}

export default ProductList;
