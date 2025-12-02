import React, { useState } from "react";
import "./SelfTestsPage.css";

export default function SelfTestsPage() {
  const [openQuiz, setOpenQuiz] = useState(null);

  const toggleQuiz = (quizName) => {
    setOpenQuiz(openQuiz === quizName ? null : quizName);
  };

  return (
    <div className="self-tests-container">
      {/* HERO BANNER */}
      <div className="hero-section">
        <h1 className="st-title">✨ Discover Your Wellness Profile</h1>
        <p className="st-subtitle">
          Quick, anonymous, insightful — get personalized tips to feel your best.
        </p>
        <div className="benefit-tags">
          <span>⏱️ 2-Minute Quizzes</span>
          <span>🔒 100% Anonymous</span>
          <span>🎁 Personalized Recommendations</span>
        </div>
      </div>

      {/* ============================= */}
      {/* WOMEN QUIZZES */}
      {/* ============================= */}
      <section className="quiz-section">
        <h2 className="st-section-title">🌸 For Women</h2>
        <p className="section-desc">Tailored insights for your unique needs.</p>

        <QuizBlock
          title="Women: Intimate Hygiene Test"
          name="womenHygiene"
          openQuiz={openQuiz}
          toggleQuiz={toggleQuiz}
          icon="🧴"
          questions={[
            {
              q: "How often do you use intimate wash?",
              options: ["Daily", "2–3 times a week", "Only during periods", "I use soap"],
            },
            {
              q: "Do you experience itching or irritation?",
              options: ["Often", "Sometimes", "Rarely", "Never"],
            },
            {
              q: "Do you use scented products?",
              options: ["Yes", "Sometimes", "No"],
            },
            {
              q: "Do you wear tight clothing for long hours?",
              options: ["Yes", "Sometimes", "No"],
            },
          ]}
          resultMap={(counts) => {
            if (counts["Often"] >= 1 || counts["I use soap"]) return {
              text: "Sensitive skin — switch to a pH-balanced feminine wash.",
              cta: "Try Our Gentle Wash →",
              link: "/products/feminine-wash",
              color: "result-red"
            };
            if (counts["Sometimes"] >= 2) return {
              text: "Mild irritation — avoid scented products & cotton is your friend.",
              cta: "Shop Cotton Underwear →",
              link: "/products/underwear",
              color: "result-orange"
            };
            return {
              text: "Your hygiene routine is on point! Keep it up 💪",
              color: "result-green"
            };
          }}
        />

        <QuizBlock
          title="Women: Dryness / Discomfort Test"
          name="womenDryness"
          openQuiz={openQuiz}
          toggleQuiz={toggleQuiz}
          icon="💧"
          questions={[
            {
              q: "Dryness during intercourse?",
              options: ["Regularly", "Sometimes", "Rarely", "Never"],
            },
            {
              q: "Burning sensation after washing?",
              options: ["Yes", "Sometimes", "No"],
            },
            {
              q: "Water intake per day?",
              options: ["Low", "Medium", "High"],
            },
            {
              q: "Stress level?",
              options: ["High", "Medium", "Low"],
            },
          ]}
          resultMap={(counts) => {
            if (counts["Regularly"] || counts["Yes"]) return {
              text: "High dryness — water-based lubricants can help immensely.",
              cta: "Explore Lubricants →",
              link: "/sexual/lubes",
              color: "result-red"
            };
            if (counts["Sometimes"]) return {
              text: "Mild dryness — hydrate more & reduce stress.",
              cta: "Try Stress Relief Bundle →",
              link: "/products/stress-bundle",
              color: "result-orange"
            };
            return {
              text: "You’re hydrated and balanced — great job! 🌿",
              color: "result-green"
            };
          }}
        />

        <QuizBlock
          title="PCOD Symptom Checker"
          name="pcod"
          openQuiz={openQuiz}
          toggleQuiz={toggleQuiz}
          icon="🩺"
          questions={[
            { q: "Are your periods irregular?", options: ["Yes", "No"] },
            { q: "Belly fat increasing?", options: ["Yes", "No"] },
            { q: "Acne or hair fall issues?", options: ["Yes", "No"] },
            { q: "Low energy or mood swings?", options: ["Yes", "No"] },
            { q: "Sugar cravings?", options: ["Yes", "No"] },
          ]}
          resultMap={(counts) => {
            const yesCount = Object.values(counts).filter(c => c > 0).reduce((sum, val) => sum + val, 0);
            if (yesCount >= 3) return {
              text: "You may have PCOD-like symptoms. Not a diagnosis — but lifestyle changes can help.",
              cta: "Get PCOD Wellness Guide →",
              link: "/guides/pcod",
              color: "result-orange"
            };
            return {
              text: "Your hormonal balance looks good! Keep nourishing your body.",
              color: "result-green"
            };
          }}
        />
      </section>

      {/* ============================= */}
      {/* MEN QUIZZES */}
      {/* ============================= */}
      <section className="quiz-section">
        <h2 className="st-section-title">💙 For Men</h2>
        <p className="section-desc">Optimize performance, comfort, and confidence.</p>

        <QuizBlock
          title="Find Your Perfect Condom"
          name="condom"
          openQuiz={openQuiz}
          toggleQuiz={toggleQuiz}
          icon="🛡️"
          questions={[
            {
              q: "Preferred feel:",
              options: ["Sensitivity", "Pleasure", "Durability"],
            },
            {
              q: "Size:",
              options: ["Regular", "XL", "Not Sure"],
            },
            {
              q: "Texture preference:",
              options: ["Dotted", "Ribbed", "Ultra Thin", "Normal"],
            },
          ]}
          resultMap={() => ({
            text: "Recommended: Ultra-thin for sensitivity, Dotted/Ribbed for pleasure, XL for comfort.",
            cta: "Shop Condoms Now →",
            link: "/sexual/condoms",
            color: "result-blue"
          })}
        />

        <QuizBlock
          title="Stamina Lifestyle Test"
          name="stamina"
          openQuiz={openQuiz}
          toggleQuiz={toggleQuiz}
          icon="⚡"
          questions={[
            { q: "Do you sleep 7–8 hours?", options: ["Yes", "No"] },
            { q: "Do you exercise regularly?", options: ["Yes", "No"] },
            { q: "Do you feel tired easily?", options: ["Yes", "No"] },
            { q: "Are you stressed often?", options: ["Yes", "No"] },
            { q: "Do you eat junk food?", options: ["Yes", "No"] },
          ]}
          resultMap={(counts) => {
            const noCount = counts["No"] || 0;
            const yesCount = counts["Yes"] || 0;
            if (noCount >= 3) return {
              text: "Poor stamina — improve sleep, diet & exercise. Small changes, big results!",
              cta: "Boost Stamina Bundle →",
              link: "/products/stamina-kit",
              color: "result-red"
            };
            if (yesCount >= 3) return {
              text: "Your habits are solid — keep fueling your energy naturally!",
              color: "result-green"
            };
            return {
              text: "Moderate stamina — one tweak can make a difference.",
              cta: "Try Our Energy Gummies →",
              link: "/products/energy-gummies",
              color: "result-orange"
            };
          }}
        />

        <QuizBlock
          title="Men’s Intimate Hygiene Score"
          name="menHygiene"
          openQuiz={openQuiz}
          toggleQuiz={toggleQuiz}
          icon="🧼"
          questions={[
            { q: "How often do you wash intimate area?", options: ["Daily", "Sometimes", "Rarely"] },
            { q: "Do you use regular soap?", options: ["Yes", "No"] },
            { q: "Sweating issues?", options: ["Yes", "No"] },
            { q: "Any itching?", options: ["Often", "Sometimes", "Never"] },
          ]}
          resultMap={() => ({
            text: "Tip: Use pH-balanced intimate wash, avoid harsh soaps, and keep dry. Freshness = confidence.",
            cta: "Try Men’s Intimate Wash →",
            link: "/products/mens-wash",
            color: "result-blue"
          })}
        />
      </section>

      {/* ============================= */}
      {/* COMMON TESTS */}
      {/* ============================= */}
      <section className="quiz-section">
        <h2 className="st-section-title">🌈 For Everyone</h2>
        <p className="section-desc">Wellness starts from within — check your baseline.</p>

        <QuizBlock
          title="Stress Level Test"
          name="stress"
          openQuiz={openQuiz}
          toggleQuiz={toggleQuiz}
          icon="🧘‍♀️"
          questions={[
            { q: "Feel overwhelmed often?", options: ["Yes", "No"] },
            { q: "Sleep issues?", options: ["Yes", "No"] },
            { q: "Irritated easily?", options: ["Yes", "No"] },
            { q: "Hard to relax?", options: ["Yes", "No"] },
          ]}
          resultMap={(counts) => {
            const yesCount = counts["Yes"] || 0;
            if (yesCount >= 3) return {
              text: "High stress — try deep breathing, walks, or our Calm Box.",
              cta: "Shop Calm Box →",
              link: "/products/calm-box",
              color: "result-red"
            };
            if (yesCount === 2) return {
              text: "Moderate stress — a little self-care goes a long way.",
              cta: "Try Aromatherapy Set →",
              link: "/products/aroma-set",
              color: "result-orange"
            };
            return {
              text: "You’re managing stress beautifully. Keep prioritizing YOU.",
              color: "result-green"
            };
          }}
        />

        <QuizBlock
          title="Sleep Quality Test"
          name="sleep"
          openQuiz={openQuiz}
          toggleQuiz={toggleQuiz}
          icon="🌙"
          questions={[
            { q: "Do you fall asleep easily?", options: ["Yes", "No"] },
            { q: "Wake up repeatedly?", options: ["Yes", "No"] },
            { q: "Feel tired in morning?", options: ["Yes", "No"] },
          ]}
          resultMap={(counts) => {
            const noCount = counts["No"] || 0;
            if (noCount >= 2) return {
              text: "Poor sleep quality — consider a bedtime ritual or magnesium support.",
              cta: "Try Sleep Aid Bundle →",
              link: "/products/sleep-kit",
              color: "result-red"
            };
            return {
              text: "Your sleep cycle is healthy! Protect it like gold.",
              color: "result-green"
            };
          }}
        />
      </section>

      {/* FOOTER CTA */}
      <div className="footer-cta">
        <p>Love your results? Share this page with someone who needs it 💖</p>
        <button className="share-btn" onClick={() => navigator.share?.({
          title: 'Take my wellness quiz!',
          url: window.location.href
        }).catch(() => alert('Share this page manually :)'))}>
          Share This Quiz →
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- */
/* REUSABLE QUIZ COMPONENT — MODERNIZED */
/* ---------------------------------------------------- */

function QuizBlock({ title, name, openQuiz, toggleQuiz, icon, questions, resultMap }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const submitQuiz = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }
    setSubmitted(true);
  };

  /* Count answers */
  const counts = {};
  Object.values(answers).forEach((ans) => {
    counts[ans] = (counts[ans] || 0) + 1;
  });

  const result = submitted ? resultMap(counts) : null;

  return (
    <>
      <div
        className={`quiz-card ${openQuiz === name ? "active" : ""}`}
        onClick={() => toggleQuiz(name)}
      >
        <span className="quiz-icon">{icon}</span>
        <span className="quiz-title">{title}</span>
        <span className="chevron">{openQuiz === name ? "▲" : "▼"}</span>
      </div>

      {openQuiz === name && (
        <div className="quiz-box card-shadow">
          <h3>{title}</h3>

          {questions.map((item, index) => (
            <div key={index} className="quiz-question">
              <p><strong>{index + 1}. {item.q}</strong></p>
              <div className="options-grid">
                {item.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-pill ${answers[index] === opt ? "selected" : ""}`}
                    onClick={() => handleSelect(index, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button className="submit-btn pulse" onClick={submitQuiz}>
              Reveal My Result ✨
            </button>
          ) : (
            <div className={`result-card ${result.color}`}>
              <p className="result-text">{result.text}</p>
              {result.cta && (
                <a href={result.link} className="result-cta">
                  {result.cta}
                </a>
              )}
              <button className="retake-btn" onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}>
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}