import React from "react";
import { Link } from "react-router-dom";
import "../styles/landingPage.css";

const LandingPage = () => {
  return (
    <div className="page">
      {/* Nav */}
      <nav className="nav">
        <h2 className="logo">ReWear</h2>
        <div className="nav-links">
          <Link to="/swap">Start Swapping</Link>
          <Link to="/browse">Browse Items</Link>
          <Link to="/add-product">List an Item</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1 className="title">Welcome to ReWear</h1>
        <p className="subtitle">
          A community-powered clothing exchange platform to reduce waste and promote reuse.
        </p>
        <div>
          <Link to="/swap" className="button">Start Swapping</Link>
          <Link to="/browse" className="button-secondary">Browse Items</Link>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="section-title">Why ReWear?</h2>
        <ul className="feature-list">
          <li>🎯 Platform introduction</li>
          <li>🎯 Calls-to-action: “Start Swapping”, “Browse Items”, “List an Item”</li>
          <li>🎯 Featured items carousel (coming soon)</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ReWear. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
