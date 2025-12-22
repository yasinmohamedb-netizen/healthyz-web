// src/screens/products/ProductDetail.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { BASE_URL } from "../../context/config";
import "./ProductDetail.css";
import ProductSEO from "../../seo/ProductSEO";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const endpoints = [
    `${BASE_URL}/products`,
    `${BASE_URL}/gym/products`,
    `${BASE_URL}/beauty/products`,
    `${BASE_URL}/surgical/products`,
    `${BASE_URL}/babycare/products`,
    `${BASE_URL}/medicines/products`,
    `${BASE_URL}/sexual/products`,
  ];

  // ================================
  // FETCH PRODUCT BY ID
  // ================================
  useEffect(() => {
    setProduct(null);
    setQuantity(1);
    setSelectedVariantIndex(0);
    setShowFullDescription(false);
    window.scrollTo(0, 0);

    const loadProduct = async () => {
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
        console.error("Product fetch error:", err);
      }
    };

    loadProduct();
  }, [id]);

  // ================================
  // LOAD ALL PRODUCTS (SIMILAR)
  // ================================
  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setAllProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Similar products error:", err));
  }, []);

  if (!product) return <div className="pd-loading">Loading...</div>;

  // ================================
  // IMAGES
  // ================================
  const images =
    product.images?.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  // ================================
  // VARIANT LOGIC
  // ================================
  const hasVariants =
    Array.isArray(product.variants) && product.variants.length > 0;

  const selectedVariant = hasVariants
    ? product.variants[selectedVariantIndex]
    : null;

  // ================================
  // PRICE CALCULATION (SAFE)
  // ================================
  const basePrice = Number(
    selectedVariant?.price ?? product.price
  );

  const discount = Number(
    selectedVariant?.discount ?? product.discount ?? 0
  );

  const finalPrice =
    Number.isFinite(basePrice) && basePrice > 0
      ? Math.max(
          1,
          Math.round(basePrice - (basePrice * discount) / 100)
        )
      : null;

  const isPriceValid =
    Number.isFinite(finalPrice) && finalPrice > 0;

  // ================================
  // SIMILAR PRODUCTS
  // ================================
  const similar = allProducts
    .filter(
      (p) => p.category === product.category && p._id !== product._id
    )
    .slice(0, 8);

  // ================================
  // ADD TO CART (GUARDED)
  // ================================
  const handleAddToCart = () => {
    if (!isPriceValid) {
      alert("Invalid product price. Please try again later.");
      return;
    }

    const qty = Number(quantity) || 1;

    addToCart({
      productId: product._id,
      name: product.name,
      quantity: qty,
      finalItemPrice: finalPrice, // 🔥 ALWAYS VALID
      image: images[0],
      variantId: selectedVariant?._id || null,
      variantLabel: selectedVariant?.label || null,
      variantPrice: selectedVariant
        ? Number(selectedVariant.price)
        : null,
      variantDiscount: selectedVariant?.discount ?? null,
    });

    navigate("/cart");
  };

  // ================================
  // RENDER
  // ================================
  return (
    <div className="pd-wrapper">
      <ProductSEO product={product} />

      <div className="pd-main">
        {/* LEFT */}
        <div className="pd-left">
          <div className="pd-image-box">
            <img src={images[0]} alt={product.name} />
            {discount > 0 && (
              <div className="pd-offer">{discount}% OFF</div>
            )}
          </div>

          <div className="pd-thumbs">
            {images.map((img, index) => (
              <img key={index} src={img} alt="Thumbnail" />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="pd-right">
          <h1 className="pd-title">{product.name}</h1>

          {/* VARIANTS */}
          {hasVariants && (
            <div className="pd-variant-box">
              <p className="pd-variant-title">Select Option</p>
              <div className="pd-variant-row">
                {product.variants.map((v, i) => (
                  <button
                    key={v._id || i}
                    className={`pd-variant-btn ${
                      selectedVariantIndex === i ? "active" : ""
                    }`}
                    onClick={() => setSelectedVariantIndex(i)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRICE */}
          <div className="pd-price-box">
            {discount > 0 && (
              <span className="pd-old-price">₹{basePrice}</span>
            )}
            <span className="pd-final-price">
              {isPriceValid ? `₹${finalPrice}` : "—"}
            </span>
          </div>

          {/* QUANTITY */}
          <div className="pd-qty-row">
            <span>Quantity</span>
            <div className="pd-qty-controls">
              <button
                onClick={() =>
                  setQuantity((q) => (q > 1 ? q - 1 : 1))
                }
              >
                −
              </button>
              <div>{quantity}</div>
              <button onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
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
                  onClick={() =>
                    setShowFullDescription(!showFullDescription)
                  }
                >
                  {showFullDescription
                    ? "Show Less"
                    : "Read More"}
                </button>
              )}
            </p>
          </div>

          {/* ADD TO CART */}
          <button
            className="pd-add-btn"
            onClick={handleAddToCart}
            disabled={!isPriceValid}
          >
            Add to Cart • ₹
            {isPriceValid
              ? finalPrice * (Number(quantity) || 1)
              : 0}
          </button>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <h3 className="pd-similar-title">Similar Products</h3>

      <div className="pd-similar-grid">
        {similar.map((item) => {
          const p = Number(item.price);
          const d = Number(item.discount) || 0;
          const final =
            Number.isFinite(p) && p > 0
              ? Math.round(p - (p * d) / 100)
              : 0;
          const img = item.images?.[0] || item.image;

          return (
            <div
              key={item._id}
              className="sim-card"
              onClick={() =>
                navigate(`/product-details/${item._id}`)
              }
            >
              <div className="sim-img-box">
                <img src={img} alt={item.name} />
                {d > 0 && (
                  <span className="sim-discount">{d}% OFF</span>
                )}
              </div>

              <div className="sim-info">
                <p className="sim-name">{item.name}</p>
                <div className="sim-price-row">
                  <span className="sim-final">₹{final}</span>
                  {d > 0 && <span className="sim-cut">₹{p}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
