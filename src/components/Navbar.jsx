import Filters from "./Filters";
function Navbar({cartCount, onCartClick, onLogoClick,showFilters, search, onSearchChange, category, onCategoryChange, categories, sortBy, onSortChange}) {
  return (
    <header className="navbar">
      <h1 className="logo" onClick={onLogoClick}>Ecommerce Product Page</h1>
      {showFilters && (
        <div className="navbar-filters">
          <Filters search={search} onSearchChange={onSearchChange} category={category} onCategoryChange={onCategoryChange} categories={categories} sortBy={sortBy} onSortChange={onSortChange}/>
        </div>
      )}
      <button className="cart-button" onClick={onCartClick} aria-label="Open cart"> Cart <span className="cart-count">{cartCount}</span> </button>
    </header>
  );}

export default Navbar;