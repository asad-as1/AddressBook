import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import img1 from "../../img/img1.jpg";
import img2 from "../../img/img2.jpg";
import Cookie from "cookies-js";

const HomePage = () => {
  const user = Cookie.get("user");
  // console.log(user)
  return (
    <div className="modern-home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Address Book <span className="highlight">Pro</span>
          </h1>
          <p className="tagline">Organize your world, one contact at a time</p>
          {!user && (
            <div className="hero-buttons">
              <Link to="/signup" className="glow-button">
                Sign Up Now
              </Link>
              <Link to="/login" className="outline-button">
                Login
              </Link>
            </div>
          )}
        </div>

        <div className="hero-graphic">
          <img
            src={img2}
            alt="Address Book Interface"
            className="overview-img"
          />
        </div>

        <div className="animated-circles">
          <div className="circle c1"></div>
          <div className="circle c2"></div>
          <div className="circle c3"></div>
        </div>
      </section>

      <section className="features-section">
        <h2>Powerful Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon contact-icon">📘</div>
            <h3>Smart Organization</h3>
            <p>Automatically categorize and sort your contacts</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon sync-icon">🔄</div>
            <h3>Cloud Sync</h3>
            <p>Access your contacts from any device, anytime</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon security-icon">🔒</div>
            <h3>Bank-grade Security</h3>
            <p>Your data is encrypted and secure</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-number">50k+</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">1M+</div>
          <div className="stat-label">Contacts Saved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
      </section>

      <section className="overview-section">
        <div className="overview-content">
          <h2>Everything You Need</h2>
          <div className="overview-grid">
            <div className="overview-item">
              <div className="overview-icon">✓</div>
              <div className="overview-text">
                <h3>Smart Contact Import</h3>
                <p>Import contacts from any source with a single click</p>
              </div>
            </div>
            <div className="overview-item">
              <div className="overview-icon">✓</div>
              <div className="overview-text">
                <h3>Custom Categories</h3>
                <p>Create personalized groups for better organization</p>
              </div>
            </div>
            <div className="overview-item">
              <div className="overview-icon">✓</div>
              <div className="overview-text">
                <h3>Birthday Reminders</h3>
                <p>Never miss important dates with smart notifications</p>
              </div>
            </div>
            <div className="overview-item">
              <div className="overview-icon">✓</div>
              <div className="overview-text">
                <h3>Contact Analytics</h3>
                <p>Get insights about your network and connections</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-section">
          <img src={img1} alt="Features Overview" className="overview-img" />
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Organizing Today</h2>
          <p>
            Join thousands of satisfied users and transform how you manage
            contacts
          </p>
          {!user && (
            <button className="pulse-button">
              <Link to="/signup" className="pulse-button">
                Register Now
              </Link>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
