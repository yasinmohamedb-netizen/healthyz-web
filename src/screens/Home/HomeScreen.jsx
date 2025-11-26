// ================================================
// src/screens/Home/HomeScreen.jsx (FINAL + SEO)
// Fully Updated – Firebase Data + Departments +
// Promotions + Why Choose HealthYz + Testimonials
// ================================================

import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import HomeSEO from "../../seo/HomeSEO";

import {
  MdFemale,
  MdChildCare,
  MdFavorite,
  MdAccessibilityNew,
  MdFaceRetouchingNatural,
  MdPsychology,
  MdSearch,
} from "react-icons/md";

const db = getFirestore();

export default function HomeScreen() {
  const navigate = useNavigate();

  const [featuredServices, setFeaturedServices] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [bestOffers, setBestOffers] = useState([]);
  const [healthTips, setHealthTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // =============================
  // FIREBASE FETCH FUNCTION
  // =============================
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
      fetchCol("featuredServices", setFeaturedServices),
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

  // Main Services
  const mainServices = [
    {
      title: "Online Consultation",
      image: "https://productimagestesting.s3.ap-south-1.amazonaws.com/onlineconss.jpg",
      bg: "#CFE4FF",
      route: "/video-consultation",
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

  // Departments list
  const departments = [
    { id: "1", name: "Gynecology", color: "#F29100", icon: <MdFemale color="#F29100" size={20} /> },
    { id: "2", name: "Pediatrics", color: "#439BAE", icon: <MdChildCare color="#439BAE" size={20} /> },
    { id: "3", name: "Cardiology", color: "#FF4D4D", icon: <MdFavorite color="#FF4D4D" size={20} /> },
    { id: "4", name: "Orthopedics", color: "#6C63FF", icon: <MdAccessibilityNew color="#6C63FF" size={20} /> },
    { id: "5", name: "Dermatology", color: "#00A86B", icon: <MdFaceRetouchingNatural color="#00A86B" size={20} /> },
    { id: "6", name: "Neurology", color: "#8A2BE2", icon: <MdPsychology color="#8A2BE2" size={20} /> },
  ];

  const filteredDepartments = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  // WHY CHOOSE DATA
  const whyChooseData = [
    { icon: "⚡", title: "Quick Connection", desc: "Get connected instantly — no long queues" },
    { icon: "🔒", title: "Secure & Private", desc: "Encrypted consultations with full privacy" },
    { icon: "💊", title: "e-Prescriptions", desc: "Instant digital prescriptions" },
    { icon: "⭐", title: "Top Specialists", desc: "Certified doctors from all specialties" },
    { icon: "🏥", title: "Lab Test Coordination", desc: "Lab tests arranged at your doorstep" },
    { icon: "❤️", title: "24/7 Support", desc: "Round-the-clock assistance" },
  ];

  const testimonials = [
    {
      name: "Priya S.",
      role: "Verified Patient",
      rating: "★★★★★",
      text: "The dermatologist was amazing. Got consultation within 20 minutes.",
      avatar: "PS",
    },
    {
      name: "Rahul M.",
      role: "Working Professional",
      rating: "★★★★★",
      text: "Great service after work hours. Zero waiting time.",
      avatar: "RM",
    },
    {
      name: "Anjali K.",
      role: "Family Member",
      rating: "★★★★★",
      text: "Booked for my parents—very helpful and patient doctor.",
      avatar: "AK",
    },
  ];

  return (
    <div className="home-page">

      {/* 🔥 SEO injected at top */}
      <HomeSEO />

      <main className="home-main">

        {/* ============================ */}
        {/* HERO SECTION */}
        {/* ============================ */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-badge badge">Trusted by 50,000+ Users</span>

            <h1 className="hero-title">
              Order Health & Wellness Products<br />From Home
            </h1>

            <p className="hero-subtitle">
              Browse and order medicines, wellness essentials, fitness gear,
              baby care, personal care, surgical items and more.
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

        {/* ============================ */}
        {/* SEARCH */}
        {/* ============================ */}
        <div className="search-wrapper">
          <div className="search-container">
            <MdSearch size={22} className="search-icon" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctors, services, medicines..."
              className="search-input"
            />
          </div>
        </div>

        {/* ============================ */}
        {/* MAIN SERVICES */}
        {/* ============================ */}
        <Section title="Quick Access" />
        <div className="top-services-section">
          {mainServices.map((s, i) => (
            <div
              key={i}
              className="main-service-card hover-lift"
              onClick={() => navigate(s.route)}
              role="button"
              tabIndex={0}
            >
              <div className="main-service-img-box" style={{ background: s.bg }}>
                <img src={s.image} className="main-service-img" alt={s.title} />
              </div>
              <div className="main-service-info">
                <h3>{s.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* ============================ */}
        {/* PROMOTIONS */}
        {/* ============================ */}
        <Section title="Promotions" />
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

        {/* ============================ */}
        {/* DEPARTMENTS */}
        {/* ============================ */}
        <Section title="All Departments" />
        <div className="departments-scroll">
          {filteredDepartments.map((d) => (
            <button
              key={d.id}
              className="dept-chip"
              style={{ borderColor: d.color }}
              onClick={() =>
                navigate("/department-details", { state: { departmentId: d.id } })
              }
            >
              <span className="dept-icon">{d.icon}</span>
              {d.name}
            </button>
          ))}
        </div>

        {/* ============================ */}
        {/* TRANSPLANT + FEATURED */}
        {/* ============================ */}
        <div className="split-70-30">
          <div className="left-70">
            <Section title="Transplant Connect" />
            <div
              className="transplant-banner click-card hover-lift"
              onClick={() => navigate("/TransplantConnect")}
            >
              <img
                src="https://productimagestesting.s3.ap-south-1.amazonaws.com/Transplant+connect_11zon.jpg"
                className="transplant-img"
                alt="Transplant Connect"
              />
              <div className="transplant-overlay">
                <h3>Organ Transplant Care</h3>
                <p>Specialized support & guidance for transplant families</p>
                <a href="/TransplantConnect" className="transplant-cta">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div className="right-30">
            <Section title="Featured Services" />
            <div className="featured-carousel">
              {featuredServices.map((item) => (
                <div
                  key={item.id}
                  className="featured-item hover-lift"
                  onClick={() => item.link && navigate(item.link)}
                >
                  {item.imageUrl ? (
                    <img src={item.imageUrl} className="featured-img" alt={item.name} />
                  ) : (
                    <div
                      className="featured-fallback"
                      style={{
                        background: item.bgColor,
                        color: item.textColor,
                      }}
                    >
                      <span>{item.name}</span>
                    </div>
                  )}

                  <div className="featured-info">
                    <h4>{item.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================ */}
        {/* TOP SERVICES + HEALTH TIPS */}
        {/* ============================ */}
        <div className="new-layout-container">

          {/* LEFT SIDE */}
          <div className="layout-left">
            <Section title="Top Services" />

            <div className="vertical-list">
              {topServices.map((s) => (
                <div
                  key={s.id}
                  className="ts-card hover-lift"
                  style={{
                    background: s.bgColor || "#ffffff",
                    color: s.textColor || "#1e293b",
                  }}
                  onClick={() => s.link && navigate(s.link)}
                >
                  {s.imageUrl ? (
                    <div className="ts-img-box">
                      <img src={s.imageUrl} className="ts-img" alt={s.title} />
                    </div>
                  ) : (
                    <div className="ts-fallback">
                      <h3>{s.title}</h3>
                      {s.subtitle && <p>{s.subtitle}</p>}
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

          {/* RIGHT SIDE */}
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

        {/* ============================ */}
        {/* BEST OFFERS */}
        {/* ============================ */}
        <Section title="Best Offers" />
        <div className="best-offers-row">
          {bestOffers.map((o) => (
            <div
              key={o.id}
              className="offer-card hover-lift"
              onClick={() => o.link && navigate(o.link)}
              style={{
                background: o.bgColor || "#ffffff",
                color: o.textColor || "#1e293b",
              }}
            >
              {o.imageUrl ? (
                <img src={o.imageUrl} className="offer-img" alt={o.title} />
              ) : (
                <div className="offer-fallback">
                  <h3>{o.title}</h3>
                </div>
              )}

              <div className="offer-info">
                <h3>{o.title}</h3>
                {o.subtitle && <p>{o.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* ============================ */}
        {/* WHY CHOOSE HEALTHYZ */}
        {/* ============================ */}
        <section className="why-choose-section">
          <div className="why-choose-container">
            <h2 className="why-choose-title">Why Choose HealthYz?</h2>
            <p className="why-choose-subtitle">
              We’re committed to providing you with the best healthcare experience
            </p>

            <div className="features-grid">
              {whyChooseData.map((item, i) => (
                <div key={i} className="feature-card hover-lift">
                  <span className="feature-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* TESTIMONIALS */}
            <div className="testimonials">
              <h3>What Our Patients Say</h3>
              <div className="testimonial-cards">
                {testimonials.map((t, i) => (
                  <div key={i} className="testimonial-card">
                    <div className="testimonial-rating">{t.rating}</div>
                    <p className="testimonial-text">{t.text}</p>

                    <div className="testimonial-author">
                      <div className="author-avatar">{t.avatar}</div>
                      <div>
                        <div className="author-name">{t.name}</div>
                        <div className="author-role">{t.role}</div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

// Reusable Section Component
function Section({ title, children }) {
  return (
    <div className="section">
      <h2 className="section-title">
        {title}
        {children}
      </h2>
    </div>
  );
}
