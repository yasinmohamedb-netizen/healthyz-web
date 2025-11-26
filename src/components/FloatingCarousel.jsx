// components/FloatingCarousel.jsx
import React, { useState, useEffect } from "react";
import "./FloatingCarousel.css";

export default function FloatingCarousel({ children, autoPlay = false, interval = 3000, direction = "horizontal", glide = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = React.Children.toArray(children);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className={`floating-carousel ${glide ? 'glide' : ''} dir-${direction}`}>
      <button onClick={prev} className="carousel-nav prev">‹</button>
      <div className="carousel-track" style={{ transform: direction === 'horizontal' 
        ? `translateX(-${currentIndex * 100}%)` 
        : `translateY(-${currentIndex * 100}%)` }}>
        {items.map((child, idx) => (
          <div key={idx} className="carousel-slide">
            {child}
          </div>
        ))}
      </div>
      <button onClick={next} className="carousel-nav next">›</button>
      <div className="carousel-dots">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}