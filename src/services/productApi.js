const BASE_URL = "https://dummyjson.com/products";

export async function getProducts() {
  const response = await fetch(BASE_URL + "?limit=100");
  if (!response.ok) {
    throw new Error("Could not fetch products");
  }
  const data = await response.json();
  return data.products; 
}

export async function getCategories() {
  const response = await fetch(BASE_URL + "/categories");
  if (!response.ok) {
    throw new Error("Could not fetch categories");
  }
  const data = await response.json();
  return data.map((c) => (typeof c === "string" ? { slug: c, name: c } : c));
}

export async function getProductById(id) {
  const response = await fetch(BASE_URL + "/" + id);
  if (!response.ok) {
    throw new Error("Could not fetch product");
  }
  return await response.json();
}