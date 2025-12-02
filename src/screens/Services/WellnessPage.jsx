import React, { useState, useEffect } from "react";
import "./WellnessPage.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL, apiFetch } from "../../context/config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../Services/firebase/firebaseConfig";

const db = getFirestore(firebaseApp);

export default function WellnessPage() {
  const navigate = useNavigate();

  // ---------------------------
  // STATE
  // ---------------------------
  const [question, setQuestion] = useState("");
  const [answeredQA, setAnsweredQA] = useState([]);

  const [wellnessPromo, setWellnessPromo] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);

  // ---------------------------
  // LOAD WELLNESS PROMO BANNERS
  // ---------------------------
  useEffect(() => {
    async function loadBanners() {
      setLoadingBanners(true);
      try {
        const snap = await getDocs(collection(db, "wellnessPromo"));
        setWellnessPromo(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error loading wellness promo:", err);
      } finally {
        setLoadingBanners(false);
      }
    }

    loadBanners();
  }, []);

  // ---------------------------
  // FETCH ANSWERED Q&A FROM BACKEND
  // ---------------------------
  const fetchAnswered = async () => {
    try {
      const data = await apiFetch("/anonymous-qa/answered");
      setAnsweredQA(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch answered Q&A", err);
    }
  };

  useEffect(() => {
    fetchAnswered();
  }, []);

  // ---------------------------
  // SUBMIT NEW QUESTION
  // ---------------------------
  const handleSubmitQuestion = async () => {
    if (!question.trim()) return;

    try {
      await apiFetch("/anonymous-qa/ask", {
        method: "POST",
        body: JSON.stringify({ question }),
      });

      alert("Your question was submitted anonymously — we’ll answer soon 💬");
      setQuestion("");
      fetchAnswered();
    } catch (err) {
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="wellness-container">

      {/* HERO BANNER - EMOTIONAL HOOK */}
      <div className="hero-banner">
        <h1 className="hero-title">Your Wellness, Your Way</h1>
        <p className="hero-subtitle">
          Explore self-care, sexual wellness, and confidence-boosting tools — all designed for <strong>you</strong>.
        </p>
        <button className="hero-cta" onClick={() => navigate("/sexual")}>
          Treat Yourself Today →
        </button>
      </div>

      {/* ============================================ */}
      {/* WELLNESS PROMOTIONAL BANNERS AT TOP */}
      {/* ============================================ */}
      {!loadingBanners && wellnessPromo.length > 0 && (
      <div className="promo-wide-scroll">
      {wellnessPromo.map((b) => (
        <div key={b.id} className="promo-wide-card">
          <img src={b.imageUrl} alt={b.title} className="promo-wide-img" />
    
          <div className="promo-wide-info">
            <h2 className="promo-wide-title">{b.title}</h2>
            <p className="promo-wide-sub">{b.subtitle}</p>
    
            {b.link && (
              <button
                className="promo-wide-btn"
                onClick={() => navigate(b.link)}
              >
                Learn More →
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
    
      )}

      {/* PAGE TITLE */}
      <h2 className="wellness-title">Wellness Hub</h2>
      <p className="wellness-subtitle">
        Your private sanctuary for quizzes, self-tests, expert answers & feel-good essentials.
      </p>

      {/* ---------------------------------------------
          1. ANONYMOUS Q&A SECTION — REBRANDED AS "ASK OUR EXPERTS"
      ---------------------------------------------- */}
      <div className="qa-box card-shadow">
        <div className="section-header">
          <h3>Ask Our Experts (100% Anonymous)</h3>
          <p className="section-desc">No judgment. Just honest, caring answers.</p>
        </div>

        <textarea
          className="qa-input"
          placeholder="What’s on your mind? Ask anything…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button className="qa-submit pulse" onClick={handleSubmitQuestion}>
          Send My Question 💬
        </button>

        <h4 className="qa-recent">Answered Questions</h4>

{answeredQA.length === 0 ? (
  <p className="no-qa">We’re gathering wisdom — check back soon!</p>
) : (
  <div 
    style={{
      maxHeight: "300px",
      overflowY: "auto",
      paddingRight: "10px",
      marginTop: "10px"
    }}
  >
    {answeredQA.map((item, index) => (
      <div 
        key={index} 
        className="qa-item fade-in"
        style={{
          marginBottom: "15px",
          background: "#fafafa",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #eee"
        }}
      >
        <p className="qa-q"><strong>Q:</strong> {item.question}</p>
        <p className="qa-a"><strong>A:</strong> {item.answer}</p>
      </div>
    ))}
  </div>
)}

        {answeredQA.length > 3 && (
          <button className="see-all-btn" onClick={() => navigate("/qa-archive")}>
            See All Answers →
          </button>
        )}
      </div>

      {/* ---------------------------------------------
          2. SELF TESTS / QUIZZES — REBRANDED AS PERSONALIZED JOURNEY
      ---------------------------------------------- */}
      <div className="quiz-section">
        <h3 className="quiz-title">Start Your Personalized Wellness Journey</h3>
        <p className="quiz-subtitle">Quick, insightful, and totally private.</p>

        <div className="quiz-grid">
          <div
            className="quiz-card big-quiz-card glow-on-hover"
            onClick={() => navigate("/self-tests")}
          >
            <div className="quiz-icon">🧠</div>
            <h4 className="quiz-main-title">Discover Your Wellness Profile</h4>
            <p className="quiz-sub">
              Take our 2-minute quiz and unlock personalized recommendations.
            </p>
            <span className="quiz-cta">Start Now →</span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------
          3. SEXUAL WELLNESS STORE — SEDUCTIVE + BENEFIT-DRIVEN
      ---------------------------------------------- */}
      <div className="store-banner gradient-border">
        <div className="store-content">
          <h3>✨ Elevate Your Pleasure, Confidence & Connection</h3>
          <p>Luxury lubes, premium condoms, intimate care — all discreetly delivered.</p>
          <div className="store-benefits">
            <span>🔒 Discreet Packaging</span>
            <span>⚡ Fast Shipping</span>
            <span>💯 Satisfaction Guaranteed</span>
          </div>
          <button className="store-btn pulse" onClick={() => navigate("/sexual")}>
            Shop Feel-Good Essentials →
          </button>
          <p className="store-urgency">Limited stock on bestsellers — don’t wait!</p>
        </div>
      </div>

      {/* FOOTER CTA — EMOTIONAL CLOSE */}
      <div className="footer-cta">
        <p>You deserve to feel amazing — inside and out.</p>
        <button className="footer-btn" onClick={() => navigate("/sexual")}>
          Start Your Journey →
        </button>
      </div>
    </div>
  );
}