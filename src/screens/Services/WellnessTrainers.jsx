// src/screens/WellnessTrainersScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./WellnessTrainers.css";

const PROGRAMS = [
  {
    id: "1",
    title: "Yoga",
    description:
      "Relax, refresh, and strengthen your body & mind through guided yoga sessions tailored to your level.",
    screen: "/yoga",
    accent: "#6C5CE7",
    icon: "🧘‍♀️",
  },
  {
    id: "2",
    title: "Pilates",
    description:
      "Improve core strength, posture, and flexibility with low-impact, high-effectiveness Pilates routines.",
    screen: "/pilates",
    accent: "#00B894",
    icon: "💪",
  },
  {
    id: "3",
    title: "Zumba",
    description:
      "Burn calories and boost mood with high-energy, dance-based cardio workouts that feel like a party!",
    screen: "/zumba",
    accent: "#E17055",
    icon: "💃",
  },
  {
    id: "4",
    title: "Personal Training",
    description:
      "Custom 1-on-1 fitness coaching designed for your goals — weight loss, muscle gain, or general wellness.",
    screen: "/personal-training",
    accent: "#0984E3",
    icon: "🏋️‍♂️",
  },
];

export default function WellnessTrainersScreen() {
  const navigate = useNavigate();

  return (
    <div className="wt-container">
      <div className="wt-wrapper">
        {/* TOP HERO SECTION */}
        <div className="wt-hero-section">
          <div className="wt-badge">Trusted by 25,000+ Active Members</div>
          <h1 className="wt-main-title">Transform Your Wellness Journey</h1>
          <p className="wt-subtitle">
            Join live, expert-led online training programs designed to fit your lifestyle. No gym? No problem.
          </p>

          <div className="wt-benefits-grid">
            <div className="wt-benefit-item">
              <div className="wt-benefit-icon">📹</div>
              <div>
                <h3>Live Sessions</h3>
                <p>Real-time interaction with certified trainers</p>
              </div>
            </div>
            <div className="wt-benefit-item">
              <div className="wt-benefit-icon">📅</div>
              <div>
                <h3>Flexible Scheduling</h3>
                <p>Choose slots that work for your routine</p>
              </div>
            </div>
            <div className="wt-benefit-item">
              <div className="wt-benefit-icon">📊</div>
              <div>
                <h3>Progress Tracking</h3>
                <p>Weekly reports and personalized feedback</p>
              </div>
            </div>
            <div className="wt-benefit-item">
              <div className="wt-benefit-icon">💬</div>
              <div>
                <h3>Community Support</h3>
                <p>Join groups, share wins, stay motivated</p>
              </div>
            </div>
          </div>

          <div className="wt-hero-image">
            <img
              src="https://productimagestesting.s3.ap-south-1.amazonaws.com/WellnessHome.png"
              alt="Wellness Training"
              className="wt-hero-img"
            />
          </div>
        </div>

        {/* PROGRAM CARDS GRID */}
        <div className="wt-programs-section">
          <h2 className="wt-section-title">Choose Your Program</h2>
          <p className="wt-section-subtitle">
            Click any program below to view details and book your first session.
          </p>

          <div className="wt-program-grid">
            {PROGRAMS.map((item) => (
              <div
                key={item.id}
                className="wt-program-card"
                onClick={() => navigate(item.screen)}
              >
                <div
                  className="wt-pill"
                  style={{ backgroundColor: item.accent }}
                ></div>

                <div className="wt-program-icon">{item.icon}</div>
                <h3 className="wt-program-title">{item.title}</h3>
                <p className="wt-program-desc">{item.description}</p>

                <div className="wt-cta">
                  <span className="wt-cta-text">Book Now</span>
                  <span className="wt-cta-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION - FEATURES + TESTIMONIALS + FAQ */}
        <div className="wt-bottom-section">
          <div className="wt-bottom-container">
            <h2 className="wt-bottom-title">Why Train With Us?</h2>
            <p className="wt-bottom-subtitle">
              We combine expert guidance, flexible scheduling, and community support to keep you motivated.
            </p>

            <div className="wt-features-grid">
              <div className="wt-feature-card">
                <div className="wt-feature-icon">🏅</div>
                <h3>Certified Trainers</h3>
                <p>All our coaches are certified professionals with years of experience in their domain.</p>
              </div>
              <div className="wt-feature-card">
                <div className="wt-feature-icon">⏱️</div>
                <h3>Quick Onboarding</h3>
                <p>Get started within minutes. Book your first session today.</p>
              </div>
              <div className="wt-feature-card">
                <div className="wt-feature-icon">📱</div>
                <h3>App & Web Access</h3>
                <p>Train from your phone, tablet, or laptop — wherever you are.</p>
              </div>
              <div className="wt-feature-card">
                <div className="wt-feature-icon">🔁</div>
                <h3>Free Replacements</h3>
                <p>Didn’t vibe with your trainer? Switch anytime, no questions asked.</p>
              </div>
              <div className="wt-feature-card">
                <div className="wt-feature-icon">🎯</div>
                <h3>Goal-Oriented Plans</h3>
                <p>Whether it’s weight loss, flexibility, or strength — we customize for YOU.</p>
              </div>
              <div className="wt-feature-card">
                <div className="wt-feature-icon">❤️</div>
                <h3>24/7 Support</h3>
                <p>Chat with our wellness coordinators anytime for help or motivation.</p>
              </div>
            </div>

            <div className="wt-testimonials">
              <h3>What Our Members Say</h3>
              <div className="wt-testimonial-cards">
                <div className="wt-testimonial-card">
                  <div className="wt-rating">★★★★★</div>
                  <p>
                    "I’ve tried many apps, but this is the first time I actually stuck with a routine. My yoga trainer is amazing!"
                  </p>
                  <div className="wt-testimonial-author">
                    <div className="wt-author-name">Ananya R.</div>
                    <div className="wt-author-role">Yoga Enthusiast, Mumbai</div>
                  </div>
                </div>
                <div className="wt-testimonial-card">
                  <div className="wt-rating">★★★★★</div>
                  <p>
                    "Lost 8 kgs in 3 months with my personal trainer. He adjusted my plan every week based on progress. Worth every rupee."
                  </p>
                  <div className="wt-testimonial-author">
                    <div className="wt-author-name">Vikram S.</div>
                    <div className="wt-author-role">Weight Loss Journey, Delhi</div>
                  </div>
                </div>
                <div className="wt-testimonial-card">
                  <div className="wt-rating">★★★★★</div>
                  <p>
                    "Zumba sessions are the highlight of my week! The energy is infectious, and I’ve made friends in the group too."
                  </p>
                  <div className="wt-testimonial-author">
                    <div className="wt-author-name">Priya M.</div>
                    <div className="wt-author-role">Zumba Lover, Bangalore</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="wt-faq-section">
              <h3>Frequently Asked Questions</h3>
              <div className="wt-faq-list">
                <div className="wt-faq-item">
                  <h4>Do I need any equipment?</h4>
                  <p>
                    Most programs require minimal or no equipment. Your trainer will guide you on what’s needed before the first session.
                  </p>
                </div>
                <div className="wt-faq-item">
                  <h4>Can I reschedule my session?</h4>
                  <p>
                    Yes! You can reschedule up to 2 hours before the session starts, free of charge.
                  </p>
                </div>
                <div className="wt-faq-item">
                  <h4>What if I miss a session?</h4>
                  <p>
                    We offer one free make-up session per month. Just contact support within 24 hours.
                  </p>
                </div>
                <div className="wt-faq-item">
                  <h4>Are sessions recorded?</h4>
                  <p>
                    For privacy reasons, sessions are not recorded. But you’ll get summary notes and exercise videos after each class.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}