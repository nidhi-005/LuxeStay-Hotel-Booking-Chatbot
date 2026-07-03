import React from 'react';

export default function HeroSection() {
  const scrollToRooms = () => {
    document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-eyebrow">✦ Asia Pacific's Premier Stay</div>
        <h1 className="hero-title">
          LuxeStay<br />
          <span className="hero-title-gold">Hotels</span>
        </h1>
        <p className="hero-subtitle">
          Where every detail is crafted for those who expect the finest.<br />
          Book your perfect room — instantly, effortlessly.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToRooms}>
            Explore Rooms
          </button>
          <button
            className="btn-secondary"
            onClick={() => document.querySelector('.chat-fab')?.click()}
          >
            💬 Book via AI Concierge
          </button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">6</span>
            <span className="stat-label">Room Types</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="stat-num">5★</span>
            <span className="stat-label">Rated Hotel</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="stat-num">24/7</span>
            <span className="stat-label">AI Concierge</span>
          </div>
        </div>
      </div>
    </section>
  );
}