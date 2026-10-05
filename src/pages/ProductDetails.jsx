import { useEffect, useState } from "react";
import { getProductById } from "../services/productApi";

function ProductDetails({ productId, onBack, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => { async function loadProduct() {
      try {
        const data = await getProductById(productId);
        setProduct(data);
        setMainImage(data.images[0]);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    }
    loadProduct();
  }, [productId]);

  if (loading) return <p className="message">Loading product...</p>;

  if (error || !product) {
    return (
      <div className="message">
        <p>Unable to load this product. Please try again.</p>
        <button className="btn" onClick={onBack}>Go back</button>
      </div>
    );
  }
  const outOfStock = product.stock === 0;

  return (
    <main className="container">
      <button className="btn btn-outline" onClick={onBack}>← Back to products</button>
      <div className="details">
        <div className="details-images">
          <img className="details-main-image" src={mainImage} alt={product.title} />
          <div className="thumb-row">
            {product.images.map((img) => (
              <img key={img} src={img} alt={product.title} className={img === mainImage ? "thumb active" : "thumb"} onClick={() => setMainImage(img)} />
            ))}
          </div>
        </div>

        <div className="details-info">
          <h2>{product.title}</h2>
          <p className="card-category">
            {product.category.replaceAll("-", " ")} {product.brand && "• " + product.brand}
          </p>
          <p className="card-rating">
            <span className="stars">★</span> {product.rating} rating
          </p>

          <div className="price-row">
            <span className="price big">${product.price}</span>
            <span className="discount">{Math.round(product.discountPercentage)}% off</span>
          </div>

          <p className={outOfStock ? "stock out" : "stock in"}>
            {outOfStock ? "Out of stock" : product.stock + " in stock"}
          </p>

          <p className="description">{product.description}</p>

          {product.tags && (
            <div className="tags">
              {product.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <div className="qty-box">
            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} aria-label="Decrease quantity">−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
          </div>

          <button className="btn" disabled={outOfStock} onClick={() => onAddToCart(product, quantity)}>
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
