function Filters({ search, onSearchChange, category, onCategoryChange, categories, sortBy, onSortChange }) {
  return (
    <div className="filters">
      <div className="filter-box">
        <label htmlFor="search">Search</label>
        <input id="search" type="text" placeholder="Search by name or category" value={search} 
        onChange={(e) => onSearchChange(e.target.value)} />
      </div>

      <div className="filter-box">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} 
        onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="all">All Products</option>
          {categories.map((c) => ( <option key={c.slug} value={c.slug}> {c.name} </option> ))}
        </select>
      </div>

      <div className="filter-box">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
