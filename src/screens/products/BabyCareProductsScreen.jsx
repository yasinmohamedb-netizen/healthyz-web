// ===============================================
// BabyCareProductsScreen.jsx (FINAL UPDATED + SEO)
// ===============================================

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../Services/firebase/firebaseConfig";
import SidebarFilters from "../Explore/SidebarFilters";
import { CartContext } from "../../context/CartContext";
import { BASE_URL } from "../../context/config";

import BabycareSEO from "../../seo/BabycareSEO";   // ⭐ ADDED SEO

import "../Explore/ExploreScreen.css";

const db = getFirestore(firebaseApp);

export default function BabyCareProductsScreen() {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [promoBanners, setPromoBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("baby");
  const [priceRange, setPriceRange] = useState(2000);
  const [discount, setDiscount] = useState([]);
  const [sort, setSort] = useState("");

  const categories = [
    { id: "fitness", name: "Fitness" },
    { id: "beauty", name: "Beauty" },
    { id: "sexual", name: "Sexual Wellness" },
    { id: "baby", name: "Baby Care" },
    { id: "medicines", name: "Medicines" },
    { id: "surgical", name: "Surgical" },
  ];

  // Load Banners
  useEffect(() => {
    async function loadBanners() {
      setLoadingBanners(true);
      try {
        const snap = await getDocs(collection(db, "promoBannerBaby"));
        setPromoBanners(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } finally {
        setLoadingBanners(false);
      }
    }
    loadBanners();
  }, []);

  // Load Products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/babycare/products`);
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching BabyCare products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filters
  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => Number(p.price) <= priceRange)
    .filter((p) =>
      discount.length > 0 ? discount.some((d) => (p.discount || 0) >= d) : true
    )
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="explore-wrapper">

      {/* 🔥 ADD SEO HERE */}
      <BabycareSEO />

      {/* DESKTOP SIDEBAR */}
      <div className="explore-sidebar">
        <SidebarFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          discount={discount}
          setDiscount={setDiscount}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="explore-main">

        {/* HEADER — same style as Explore Screen */}
        <header className="section-header">
          <h1 className="section-title">Explore BabyCare</h1>

          <button className="header-cart-btn" onClick={() => navigate("/cart")}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png"
              className="header-cart-icon"
              alt="cart"
            />
            {cartItems.length > 0 && (
              <span className="header-cart-badge">{cartItems.length}</span>
            )}
          </button>
        </header>

        {/* SEARCH BAR */}
        <div className="search-section">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search BabyCare products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm("")}>
                ✖
              </button>
            )}
          </div>
        </div>

        {/* ⭐ PROMO BANNERS — HIDE WHEN SEARCHING ⭐ */}
        {searchTerm.trim().length === 0 && promoBanners.length > 0 && (
          <div className="promo-wide-scroll">
            {promoBanners.map((b) => (
              <div key={b.id} className="promo-wide-card">
                <img src={b.imageUrl} className="promo-wide-img" alt={b.title} />
                <div className="promo-wide-info">
                  <h2 className="promo-wide-title">{b.title}</h2>
                  <p className="promo-wide-sub">{b.subtitle}</p>
                  <button
                    className="promo-wide-btn"
                    onClick={() => b.link && navigate(b.link)}
                  >
                    Shop Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MOBILE FILTER BUTTON */}
        <div className="mobile-filter-btn-wrapper">
          <SidebarFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            discount={discount}
            setDiscount={setDiscount}
            sort={sort}
            setSort={setSort}
          />
        </div>

        {/* PRODUCT GRID */}
        {!loading && (
          <div className="product-grid">
            {filtered.map((item) => {
              const price = Number(item.price);
              const disc = item.discount || 0;
              const finalPrice = Math.round(price - (price * disc) / 100);
              const img = item.images?.[0] || item.image;

              return (
                <div
                  key={item._id}
                  className="prod-card"
                  onClick={() => navigate(`/product-details/${item._id}`)}
                >
                  <div className="prod-img-box">
                    <img src={img} className="prod-img" alt={item.name} />
                    {disc > 0 && <span className="discount-tag">{disc}% OFF</span>}
                  </div>

                  <div className="prod-info">
                    <p className="prod-name">{item.name}</p>

                    <div className="price-row">
                      <span className="final-price">₹{finalPrice}</span>
                      {disc > 0 && <span className="cut-price">₹{price}</span>}
                    </div>

                    <button
  className="add-btn"
  onClick={(e) => {
    e.stopPropagation();

    addToCart({
      productId: item._id,          // ✅ REQUIRED
      name: item.name,
      finalItemPrice: finalPrice,   // ✅ REQUIRED
      image: img,
      quantity: 1,
      variantId: null,
      variantLabel: null,
    });

    // allow state update before navigation
    setTimeout(() => {
      navigate("/cart");
    }, 0);
  }}
>
  ADD TO CART
</button>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* INLINE STYLES */}
      <style>{`
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #3b8f89;
          padding: 20px;
          border-radius: 18px;
          color: white;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 22px;
          font-weight: 700;
        }

        .header-cart-btn {
          width: 48px;
          height: 48px;
          background: rgba(0,0,0,0.2);
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
        }

        .header-cart-icon {
          width: 22px;
          filter: invert(100%);
        }

        .header-cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 18px;
          height: 18px;
          background: #F29100;
          color: white;
          font-size: 10px;
          font-weight: bold;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .mobile-filter-btn-wrapper {
          display: none;
        }

        @media (max-width: 900px) {
          .mobile-filter-btn-wrapper {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
