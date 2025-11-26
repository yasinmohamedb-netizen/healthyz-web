import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const p = product ?? {};
  const id = p._id || p.id;

  const name = p.name ?? "Unnamed Product";
  const price = Number(String(p.price).replace(/[^0-9.]/g, "")) || 0;

  const discount = p.discount || 0;
  const finalPrice = Math.round(price - (price * discount) / 100);

  const image = p.images?.[0] || p.image || null;

  return (
    <div
      className="prod-card"
      onClick={() => navigate(`/product-details/${id}`)}
    >
      {/* IMAGE */}
      <div className="prod-img-box">
        {image ? (
          <img src={image} alt={name} className="prod-img" />
        ) : (
          <div className="no-img">No Image</div>
        )}

        {discount > 0 && (
          <span className="discount-tag">{discount}% OFF</span>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="prod-info">
        <p className="prod-name">{name}</p>

        <div className="price-row">
          <span className="final-price">₹{finalPrice}</span>

          {discount > 0 && (
            <span className="cut-price">₹{price}</span>
          )}
        </div>

        <button
          className="add-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart(p);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
