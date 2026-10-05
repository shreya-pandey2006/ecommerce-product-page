function Navbar({ cartCount, onCartClick, onLogoClick }) {
  return (
    <header className="navbar">
      <h1 className="logo" onClick={onLogoClick}>Ecommerce Product Page</h1>
      <button className="cart-button" onClick={onCartClick} aria-label="Open cart"> Cart <span className="cart-count">{cartCount}</span> </button>
    </header>
  );
}

export default Navbar;
