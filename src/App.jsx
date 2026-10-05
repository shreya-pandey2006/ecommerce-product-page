import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { getCategories } from "./services/productApi";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [categories, setCategories] = useState([]);

  useEffect(() => { async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Categories failed:", err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => { localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  }

  function addToCart(product, quantity) {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item ));
    } else {
      const newItem = {id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, quantity: quantity};
      setCartItems([...cartItems, newItem]);
    }
    showToast(product.title + " added to cart");
  }

  function increaseQuantity(id) {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  }

  function decreaseQuantity(id) {
    const item = cartItems.find((i) => i.id === id);
    if (item.quantity === 1) {
      removeItem(id);
    } else {
      setCartItems(cartItems.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)));
    }
  }

  function removeItem(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} onLogoClick={() => setSelectedId(null)} showFilters={selectedId === null} 
        search={search} onSearchChange={setSearch} category={category} onCategoryChange={setCategory} categories={categories} sortBy={sortBy} onSortChange={setSortBy}/>
      { }
      <div style={{ display: selectedId === null ? "block" : "none" }}>
        <Home onAddToCart={addToCart} onViewProduct={setSelectedId} search={search} category={category} sortBy={sortBy} />
      </div>
      {selectedId !== null && ( <ProductDetails productId={selectedId} onBack={() => setSelectedId(null)} onAddToCart={addToCart} /> )}
      {cartOpen && ( <Cart cartItems={cartItems} onClose={() => setCartOpen(false)} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} onRemove={removeItem} /> )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;