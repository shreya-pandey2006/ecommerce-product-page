function ProductCard({ product, onAddToCart, onViewProduct }) {
  const outOfStock = product.stock === 0;
  const filledStars = Math.round(product.rating);
  const stars = "★".repeat(filledStars) + "☆".repeat(5 - filledStars);
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} className="card-image" onClick={() => onViewProduct(product.id)}/>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-category">{product.category.replaceAll("-", " ")}</p>
        <p className="card-rating"> <span className="stars">{stars}</span> {product.rating} </p>
        <div className="price-row">
          <span className="price">${product.price}</span>
          <span className="discount">{Math.round(product.discountPercentage)}% off</span>
        </div>
        <p className={outOfStock ? "stock out" : "stock in"}> 
          {outOfStock ? "Out of stock" : "In stock (" + product.stock + ")"} </p>
        <div className="card-buttons">
          <button className="btn" disabled={outOfStock} onClick={() => onAddToCart(product, 1)}> Add to Cart</button>
          <button className="btn btn-outline" onClick={() => onViewProduct(product.id)}> Details </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
