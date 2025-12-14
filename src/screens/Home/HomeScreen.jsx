// ================================================
// src/screens/Home/HomeScreen.jsx (FINAL UPDATED)
// E-Commerce Focus + Category Cards + Why Choose Us
// ================================================

import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import HomeSEO from "../../seo/HomeSEO";

import { MdSearch } from "react-icons/md";

const db = getFirestore();

export default function HomeScreen() {
  const navigate = useNavigate();

  const [topServices, setTopServices] = useState([]);
  const [bestOffers, setBestOffers] = useState([]);
  const [healthTips, setHealthTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FIREBASE HELPER
  const fetchCol = async (col, setter) => {
    try {
      const snap = await getDocs(collection(db, col));
      setter(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setter([]);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchCol("topServices", setTopServices),
      fetchCol("bestOffers", setBestOffers),
      fetchCol("healthTips", setHealthTips),
      fetchCol("events", setEvents),
      fetchCol("promotions", setPromotions),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p className="loading-text">Loading your dashboard...</p>
      </div>
    );

  // ------------------------------------
  // MAIN SERVICES
  // ------------------------------------
  const mainServices = [
    {
      title: "Wellness Hub",
      image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/ecmommerce.jpg",
      bg: "#F7E9FF",
      route: "/wellness",
    },
    {
      title: "Homecare Services",
      image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/HomecareHome.png",
      bg: "#E3F7D2",
      route: "/home-care-services",
    },
    {
      title: "Wellness Trainers",
      image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/WellnessHome.png",
      bg: "#E9DEFF",
      route: "/wellness-trainers",
    },
    {
      title: "Order Products",
      image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/ecmommerce.jpg",
      bg: "#FCE9D8",
      route: "/explore",
    },
  ];

  // ------------------------------------
  // E-COMMERCE CATEGORIES
  // ------------------------------------
  const categories = [
    { id: "gym", name: "Fitness", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/fitness.jpg" },
    { id: "beauty", name: "Beauty", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/beautyproducts.jpg" },
    { id: "sexual", name: "Sexual Wellness", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/sexual+wellness.jpg" },
    { id: "babycare", name: "Baby Care", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/babycare.jpg" },
    { id: "medicines", name: "Medicines", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/medicineproducts.jpg" },
     { id: "surgical", name: "Surgical", image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/surgicalproducs.jpg" },
  ];

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ------------------------------------
  // WHY CHOOSE HEALTHYZ (NO IMAGES)
  // ------------------------------------
  const whyChooseData = [
    { icon: "⚡", title: "Fast Delivery", desc: "Doorstep delivery for all products" },
    { icon: "🔒", title: "Private & Secure", desc: "Your health data always stays private" },
    { icon: "❤️", title: "Trusted Products", desc: "Handpicked & verified essentials" },
    { icon: "💰", title: "Best Prices", desc: "Exclusive deals on top categories" },
  ];

  return (
    <div className="home-page">
      <HomeSEO />

      <main className="home-main">

        {/* HERO */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Order Health & Wellness Products<br />From Home
            </h1>

            <p className="hero-subtitle">
              Browse and order medicines, fitness, wellness, personal care,
              baby products & more.
            </p>

            <a href="/explore" className="hero-cta">Shop Now →</a>
          </div>

          <div className="hero-image">
            <img
              src="https://productimagestesting.s3.ap-south-1.amazonaws.com/ecmommerce.jpg"
              alt="Order Products"
              className="hero-img"
            />
          </div>
        </section>

        {/* SEARCH */}
        <div className="search-wrapper">
          <div className="search-container">
            <MdSearch size={22} className="search-icon" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories…"
              className="search-input"
            />
          </div>
        </div>

        {/* QUICK ACCESS */}
        <Section title="Quick Access" />

        <div className="top-services-section">
          {mainServices.map((s, i) => (
            <div key={i} className="main-service-card hover-lift" onClick={() => navigate(s.route)}>
              <div className="main-service-img-box" style={{ background: s.bg }}>
                <img src={s.image} className="main-service-img" alt={s.title} />
              </div>
              <div className="main-service-info">
                <h3>{s.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* PROMOTIONS */}
        <Section title="Wellness Picks" />
        <div className="promo-carousel">
          {promotions.map((p) => (
            <img
              key={p.id}
              src={p.imageUrl}
              className="promo-item hover-lift"
              onClick={() => p.link && navigate(p.link)}
              alt={p.title || "Promotion"}
            />
          ))}
        </div>

        {/* CATEGORY GRID */}
        <Section title="Shop By Category" />
        <div className="category-scroll">
  {filteredCategories.map((c) => (
    <div
      key={c.id}
      className="category-card-h"
      onClick={() => navigate(`/${c.id}`)}
    >
      <img src={c.image} className="category-img-h" alt={c.name} />
      <p className="category-name-h">{c.name}</p>
    </div>
  ))}
</div>


        {/* TOP SERVICES + HEALTH TIPS */}
        <div className="new-layout-container">

          <div className="layout-left">
            <Section title="Top Services" />
            <div className="vertical-list">
              {topServices.map((s) => (
                <div
                  key={s.id}
                  className="ts-card hover-lift"
                  style={{ background: s.bgColor || "#fff", color: s.textColor || "#222" }}
                  onClick={() => s.link && navigate(s.link)}
                >
                  {s.imageUrl && (
                    <div className="ts-img-box">
                      <img src={s.imageUrl} className="ts-img" alt={s.title} />
                    </div>
                  )}
                  <div className="ts-info">
                    <h3>{s.title}</h3>
                    {s.subtitle && <p>{s.subtitle}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="layout-right">
            <Section title="Health Tips" />
            <div className="tips-list">
              {healthTips.map((t) => (
                <div key={t.id} className="tip-fb-card hover-lift">
                  <h4>{t.title}</h4>
                  <p>{t.description}</p>
                </div>
              ))}
            </div>

            <Section title="Upcoming Events" />
            <div className="events-list">
              {events.map((e) => (
                <div key={e.id} className="event-fb-card hover-lift">
                  <h4>{e.title}</h4>
                  <p>{e.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================== */}
{/*  TRANSPLANT CONNECT – FULL WIDTH */}
{/* ============================== */}

<Section title="Transplant Connect" />

<div
  className="transplant-full-banner hover-lift"
  onClick={() => navigate("/TransplantConnect")}
>
  <img
    src="https://productimagestesting.s3.ap-south-1.amazonaws.com/Transplant+connect_11zon.jpg"
    alt="Transplant Connect"
    className="transplant-full-img"
  />

  <div className="transplant-full-overlay">
    <h3>Organ Transplant Care</h3>
    <p>Specialized support & guidance for transplant families</p>
    <a href="/TransplantConnect" className="transplant-full-cta">
      Learn More →
    </a>
  </div>
</div>


        {/* BEST OFFERS */}
        <Section title="Best Offers" />
        <div className="best-offers-row">
          {bestOffers.map((o) => (
            <div
              key={o.id}
              className="offer-card hover-lift"
              onClick={() => o.link && navigate(o.link)}
              style={{ background: o.bgColor || "#fff", color: o.textColor || "#222" }}
            >
              {o.imageUrl && <img src={o.imageUrl} className="offer-img" alt={o.title} />}
              <div className="offer-info">
                <h3>{o.title}</h3>
                {o.subtitle && <p>{o.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>

        

        {/* WHY CHOOSE HEALTHYZ */}
       {/* ============================ */}
{/* WHY CHOOSE HEALTHYZ */}
{/* ============================ */}

<section className="why-choose-section">
  <div className="why-choose-container">
    <h2 className="why-choose-title">Why Choose HealthYz?</h2>
    <p className="why-choose-subtitle">
      Your trusted partner for wellness & healthcare essentials
    </p>

    <div className="features-grid">

      {/* 1 */}
      <div className="feature-card hover-lift">
        <span className="feature-icon">⚡</span>
        <h3>Fast Delivery</h3>
        <p>Quick doorstep delivery for all products</p>
      </div>

      {/* 2 */}
      <div className="feature-card hover-lift">
        <span className="feature-icon">🔒</span>
        <h3>Private & Secure</h3>
        <p>Your health & wellness data stays private</p>
      </div>

      {/* 3 */}
      <div className="feature-card hover-lift">
        <span className="feature-icon">❤️</span>
        <h3>Trusted Products</h3>
        <p>Handpicked & verified wellness essentials</p>
      </div>

      {/* 4 */}
      <div className="feature-card hover-lift">
        <span className="feature-icon">💰</span>
        <h3>Best Prices</h3>
        <p>Exclusive deals across top categories</p>
      </div>

      {/* 5 */}
      <div className="feature-card hover-lift">
        <span className="feature-icon">📦</span>
        <h3>Wide Product Range</h3>
        <p>Everything from medicines to sexual wellness</p>
      </div>

      {/* 6 */}
      <div className="feature-card hover-lift">
        <span className="feature-icon">🛡️</span>
        <h3>Quality Assurance</h3>
        <p>Every item goes through strict quality checks</p>
      </div>

    </div>
  </div>
</section>


      </main>
    </div>
  );
}

// Reusable Section
function Section({ title }) {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
    </div>
  );
}
