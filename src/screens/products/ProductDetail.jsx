// =======================================
// src/screens/products/ProductDetail.jsx
// FINAL PRODUCTION VERSION
// =======================================

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { BASE_URL } from "../../context/config";
import "./ProductDetail.css";
import ProductDetailSEO from "../../seo/ProductDetailSEO";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // ALL PRODUCT ENDPOINTS
  const endpoints = [
    `${BASE_URL}/products`,
    `${BASE_URL}/gym/products`,
    `${BASE_URL}/beauty/products`,
    `${BASE_URL}/surgical/products`,
    `${BASE_URL}/babycare/products`,
    `${BASE_URL}/medicines/products`,
    `${BASE_URL}/sexual/products`,
  ];

  // ------------------------------------
  // FETCH SELECTED PRODUCT BY ID
  // ------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        for (const url of endpoints) {
          const res = await fetch(url);
          const data = await res.json();
          const arr = Array.isArray(data) ? data : data.data || [];

          const found = arr.find((p) => p._id === id);
          if (found) {
            setProduct(found);
            return;
          }
        }
      } catch (err) {
        console.log("Product fetch error:", err);
      }
    };

    load();
  }, [id]);

  // ------------------------------------
  // LOAD ALL PRODUCTS FOR SIMILAR LIST
  // ------------------------------------
  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setAllProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.log("Similar products error:", err));
  }, []);

  if (!product) return <div className="pd-loading">Loading...</div>;

  // PRODUCT CALCULATIONS
  const images = product.images?.length ? product.images : [product.image];
  const price = Number(product.price);
  const discount = product.discount || 0;
  const finalPrice = Math.round(price - price * (discount / 100));

  // SIMILAR PRODUCTS FILTER
  const similar = allProducts
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 8);

  return (
    <div className="pd-wrapper">
      <ProductDetailSEO product={product} />

      {/* MAIN PRODUCT SECTION */}
      <div className="pd-main">

        {/* LEFT SIDE IMAGES */}
        <div className="pd-left">
          <div className="pd-image-box">
            <img src={images[0]} alt={product.name} />
            {discount > 0 && <div className="pd-offer">{discount}% OFF</div>}
          </div>

          {/* THUMBNAILS */}
          <div className="pd-thumbs">
            {images.map((img, index) => (
              <img key={index} src={img} alt="Thumbnail" />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE INFO */}
        <div className="pd-right">
          <h1 className="pd-title">{product.name}</h1>

          {/* PRICE ROW */}
          <div className="pd-price-box">
            {discount > 0 && <span className="pd-old-price">₹{price}</span>}
            <span className="pd-final-price">₹{finalPrice}</span>
          </div>

          {/* QUANTITY SELECTOR */}
          <div className="pd-qty-row">
            <span>Quantity</span>
            <div className="pd-qty-controls">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                -
              </button>
              <div>{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="pd-description">
            <h3>Description</h3>
            <p>
              {showFullDescription
                ? product.description
                : product.description?.slice(0, 200)}

              {product.description?.length > 200 && (
                <button
                  className="pd-readmore"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          </div>

          {/* ADD TO CART BUTTON */}
          <button
            className="pd-add-btn"
            onClick={() => {
              addToCart({
                id: product._id,
                name: product.name,
                price: finalPrice,
                quantity,
                image: images[0],
              });
              navigate("/cart");
            }}
          >
            Add to Cart • ₹{finalPrice * quantity}
          </button>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <h3 className="pd-similar-title">Similar Products</h3>

      <div className="pd-similar-grid">
        {similar.map((item) => {
          const price = Number(item.price);
          const discount = item.discount || 0;
          const final = Math.round(price - (price * discount) / 100);
          const img = item.images?.[0] || item.image;

          return (
            <div
              key={item._id}
              className="sim-card"
              onClick={() => navigate(`/product-details/${item._id}`)}
            >
              <div className="sim-img-box">
                <img src={img} alt={item.name} />
                {discount > 0 && (
                  <span className="sim-discount">{discount}% OFF</span>
                )}
              </div>

              <div className="sim-info">
                <p className="sim-name">{item.name}</p>

                <div className="sim-price-row">
                  <span className="sim-final">₹{final}</span>
                  {discount > 0 && <span className="sim-cut">₹{price}</span>}
                </div>

                <button
                  className="sim-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: item._id,
                      name: item.name,
                      price: final,
                      quantity: 1,
                      image: img,
                      discount,
                    });
                    navigate("/cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
