import React from "react";

function ProductCard({ product, onView, onAdd }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm">

        <img src={product.image} className="product-img" alt="" />

        <h6>{product.title}</h6>
        <p><b>₹{product.price}</b></p>

        <button
          className="btn btn-info btn-sm"
          onClick={() => onView(product)}
        >
          View
        </button>

        <button
          className="btn btn-success btn-sm"
          onClick={onAdd}
        >
          Add
        </button>

      </div>
    </div>
  );
}

export default ProductCard;