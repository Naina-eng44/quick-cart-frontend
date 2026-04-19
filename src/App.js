import React, { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  // FETCH PRODUCTS
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setAllProducts(data);

        let cats = [...new Set(data.map(p => p.category))];
        setCategories(cats);
      });
  }, []);

  // FILTER + SEARCH + SORT
  useEffect(() => {
    let filtered = [...allProducts];

    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);

    setProducts(filtered);
  }, [search, category, sort, allProducts]);

  return (
    <div className="container mt-4">

      {/* Navbar */}
      <div className="d-flex justify-content-between mb-4">
        <h2> QuickCart</h2>
        <h5>Cart 🛒: {cartCount}</h5>
      </div>

      {/* Search + Filter + Sort */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            className="form-control"
            placeholder="Search product"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="row">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onView={setSelectedProduct}
            onAdd={() => setCartCount(cartCount + 1)}
          />
        ))}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="modal-backdrop-custom">
          <div className="modal-box">

            <h4>{selectedProduct.title}</h4>
            <img src={selectedProduct.image} className="product-img" alt="" />

            <p>{selectedProduct.description}</p>
            <p><b>Price:</b> ₹{selectedProduct.price}</p>
            <p><b>Rating:</b>  {selectedProduct.rating.rate}</p>

            <button
              className="btn btn-danger"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;