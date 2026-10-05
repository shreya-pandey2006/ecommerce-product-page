function Cart({ cartItems, onClose, onIncrease, onDecrease, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>My Cart</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="message">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-row" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <div className="cart-info">
                  <p className="cart-title">{item.title}</p> <p>${item.price}</p>
                  <div className="qty-box">
                    <button onClick={() => onDecrease(item.id)} aria-label="Decrease quantity">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncrease(item.id)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-footer">
          <p className="cart-total">Total: ${total.toFixed(2)}</p>
          <button className="btn checkout-btn">Checkout</button>
        </div>
      </aside>
    </div>
  );
}

export default Cart;
