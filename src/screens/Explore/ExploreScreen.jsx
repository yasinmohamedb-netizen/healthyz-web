// ===============================================
// ExploreScreen.jsx — FULL FINAL (SEO + UI + FIXED ERRORS)
// ===============================================

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../Services/firebase/firebaseConfig";

import SidebarFilters from "./SidebarFilters";
import { CartContext } from "../../context/CartContext";
import { BASE_URL } from "../../context/config";

import "./ExploreScreen.css";
import ExploreSEO from "../../seo/ExploreSEO";

const db = getFirestore(firebaseApp);

// --------------------------------------------------
// Reusable Section Component (FIXES THE ERROR)
// --------------------------------------------------
function Section({ title }) {
  return (
    <div className="explore-section-title-wrapper">
      <h2 className="explore-section-title">{title}</h2>
    </div>
  );
}

// --------------------------------------------------

export default function ExploreScreen() {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);

  const [promoBanners, setPromoBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(2000);
  const [discount, setDiscount] = useState([]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("all");

  const categories = [
    { id: "gym", name: "Fitness", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/fitness.jpg" },
    { id: "beauty", name: "Beauty", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/beautyproducts.jpg" },
    { id: "sexual", name: "Sexual Wellness", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/sexual+wellness.jpg" },
    { id: "babycare", name: "Baby Care", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/babycare.jpg" },
    { id: "medicines", name: "Medicines", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/medicineproducts.jpg" },
     { id: "surgical", name: "Surgical", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/surgicalproducs.jpg" },
  ];

  // Load Promo Banners
  useEffect(() => {
    async function loadBanners() {
      setLoadingBanners(true);
      try {
        const snap = await getDocs(collection(db, "promoBanners"));
        setPromoBanners(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } finally {
        setLoadingBanners(false);
      }
    }
    loadBanners();
  }, []);

  // Load ALL products
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      try {
        const endpoints = [
          "/products",
          "/gym/products",
          "/beauty/products",
          "/babycare/products",
          "/medicines/products",
          "/sexual/products",
          "/surgical/products",
        ];

        const responses = await Promise.all(
          endpoints.map((url) =>
            axios.get(`${BASE_URL}${url}`).catch(() => ({ data: [] }))
          )
        );

        const merged = responses.flatMap((res) =>
          Array.isArray(res.data) ? res.data : []
        );

        setProducts(merged);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filter logic
  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => Number(p.price) <= priceRange)
    .filter((p) =>
      discount.length ? discount.some((d) => (p.discount || 0) >= d) : true
    )
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <ExploreSEO />

      <div className="explore-wrapper">
        {/* DESKTOP SIDEBAR */}
        <div className="explore-sidebar">
          <SidebarFilters
            categories={categories}
            selectedCategory={category}
            setSelectedCategory={setCategory}
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
          {/* HEADER */}
          <header className="section-header">
            <h1 className="section-title">Explore Products</h1>

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

          {/* SEARCH */}
          <div className="search-section">
            <div className="search-bar">
              <span className="search-icon">🔍</span>

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                className="search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {searchTerm && (
                <button className="clear-btn" onClick={() => setSearchTerm("")}>
                  ✖
                </button>
              )}
            </div>
          </div>

          {/* ⭐ HIDE THESE SECTIONS WHEN SEARCHING ⭐ */}
          {searchTerm.trim().length === 0 && (
            <>
              {/* PROMO BANNERS */}
              <div className="promo-wide-scroll">
                {promoBanners.map((b) => (
                  <div key={b.id} className="promo-wide-card">
                    <img src={b.imageUrl} alt={b.title} className="promo-wide-img" />

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

              {/* ============================== */}
              {/*   SHOP BY CATEGORY SECTION     */}
              {/* ============================== */}

              <Section title="Shop By Category" />

              <div className="explore-category-grid">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="explore-category-card hover-lift"
                    onClick={() => navigate(`/${c.id}`)}
                  >
                    <img
                      src={
                        c.image ||
                        "https://productimagestesting.s3.ap-south-1.amazonaws.com/ecmommerce.jpg"
                      }
                      alt={c.name}
                      className="explore-category-img"
                    />
                    <p className="explore-category-name">{c.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* MOBILE FILTERS */}
          <div className="mobile-filter-area">
            <SidebarFilters
              categories={categories}
              selectedCategory={category}
              setSelectedCategory={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              discount={discount}
              setDiscount={setDiscount}
              sort={sort}
              setSort={setSort}
            />
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <div className="loading-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((item) => {
                const base = Number(item.price);
                const off = item.discount || 0;
                const finalPrice = Math.round(base - (base * off) / 100);
                const img = item.images?.[0] || item.image;

                return (
                  <div
                    key={item._id}
                    className="prod-card"
                    onClick={() => navigate(`/product-details/${item._id}`)}
                  >
                    <div className="prod-img-box">
                      <img src={img} className="prod-img" alt={item.name} />
                      {off > 0 && <span className="discount-tag">{off}% OFF</span>}
                    </div>

                    <div className="prod-info">
                      <p className="prod-name">{item.name}</p>

                      <div className="price-row">
                        <span className="final-price">₹{finalPrice}</span>
                        {off > 0 && <span className="cut-price">₹{base}</span>}
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
            background: rgba(0,0,0,0.25);
            border-radius: 50%;
            border: none;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
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
            border-radius: 50%;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-filter-area { display: none; }

          @media (max-width: 900px) {
            .mobile-filter-area {
              display: block;
              margin-bottom: 16px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
