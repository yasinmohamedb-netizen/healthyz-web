// ===============================================
// BeautyProductsScreen.jsx (FINAL UPDATED + SEO)
// ===============================================

import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../Services/firebase/firebaseConfig";

import SidebarFilters from "../Explore/SidebarFilters";
import { CartContext } from "../../context/CartContext";
import { BASE_URL } from "../../context/config";

import BeautySEO from "../../seo/BeautySEO";   // ⭐ ADDED SEO

import "../Explore/ExploreScreen.css";

const db = getFirestore(firebaseApp);

export default function BeautyProductsScreen() {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [promoBanners, setPromoBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("beauty");
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

  // Load Promo Banners
  useEffect(() => {
    async function loadBanners() {
      setLoadingBanners(true);
      try {
        const snap = await getDocs(collection(db, "promoBannerBeauty"));
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
        const res = await axios.get(`${BASE_URL}/beauty/products`);
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching beauty products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Apply Filters
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

      {/* 🔥 SEO added here */}
      <BeautySEO />

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

      {/* MAIN CONTENT AREA */}
      <div className="explore-main">

        {/* HEADER */}
        <header className="section-header">
          <h1 className="section-title">Explore Beauty Products</h1>

          <button className="header-cart-btn" onClick={() => navigate("/cart")}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png"
              alt="cart"
              className="header-cart-icon"
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
              placeholder="Search Beauty products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm("")}>
                ✖
              </button>
            )}
          </div>
        </div>

        {/* ⭐ PROMO BANNERS — HIDE WHEN SEARCHING ⭐ */}
        {searchTerm.trim().length === 0 && !loadingBanners && promoBanners.length > 0 && (
          <div className="promo-wide-scroll">
            {promoBanners.map((b) => (
              <div key={b.id} className="promo-wide-card">
                <img src={b.imageUrl} alt="banner" className="promo-wide-img" />

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
              const basePrice = Number(item.price);
              const off = item.discount || 0;
              const finalPrice = Math.round(basePrice - (basePrice * off) / 100);
              const img = item.images?.[0] || item.image;

              return (
                <div
                  key={item._id}
                  className="prod-card"
                  onClick={() => navigate(`/product-details/${item._id}`)}
                >
                  <div className="prod-img-box">
                    <img src={img} className="prod-img" alt="product" />

                    {off > 0 && <span className="discount-tag">{off}% OFF</span>}
                  </div>

                  <div className="prod-info">
                    <p className="prod-name">{item.name}</p>

                    <div className="price-row">
                      <span className="final-price">₹{finalPrice}</span>

                      {off > 0 && (
                        <span className="cut-price">₹{basePrice}</span>
                      )}
                    </div>

                    <button
                      className="add-btn"
                      onClick={(e) => {
                        e.stopPropagation();

                        addToCart({
                          id: item._id,
                          name: item.name,
                          price: finalPrice,
                          image: img,
                          quantity: 1,
                          discount: off,
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
        )}
      </div>

      {/* INLINE CSS */}
      <style>{`
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #3b8f89;
          padding: 20px;
          color: white;
          border-radius: 18px;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 22px;
          font-weight: 700;
        }

        .header-cart-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
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
          border-radius: 50%;
          background: #f29100;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: bold;
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
