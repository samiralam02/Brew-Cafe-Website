import { Link } from "react-router-dom";
import { ShoppingBag, Star,Facebook, Instagram, Twitter } from "lucide-react";
import "./Dahboard.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">☕</span>
            <span className="logo-text">BrewByte</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#chefs">Chefs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <Link to="/menu" className="nav-btn">
            <ShoppingBag size={18} />
            Order Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="hero-title">
            Experience the
            <span className="highlight"> Taste </span>
            of the World
          </h1>
          <p className="hero-subtitle">
            Discover authentic flavors, crafted with care. Every cup tells a story of passion and perfection.
          </p>
          <Link to="/menu" className="cta-btn">
            Order Now
          </Link>
        </div>

        <div className="hero-image">
          <div className="hero-img-placeholder">
            <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500&h=500&fit=crop" alt="Hero Coffee" />
          </div>
        </div>

        {/* Discount Box */}
        <div className="discount-box">
          <div className="discount-icon">🎉</div>
          <div className="discount-content">
            <p className="discount-title">Great food and lots of discounted prices</p>
            <p className="discount-percent">50%</p>
            <p className="discount-text">off on Pizza</p>
          </div>
        </div>
      </section>

      {/* Best Delivered Section */}
      <section className="best-delivered" id="menu">
        <h2 className="section-title">
          <span className="bracket">[</span> Our Best Delivered <span className="bracket">]</span>
        </h2>

        <div className="delivered-items">
          <div className="delivered-card">
            <div className="delivered-img">
              <img src="https://images.unsplash.com/photo-1585518419759-87d9e24f2c5b?w=400&h=300&fit=crop" alt="Breakfast" />
            </div>
            <div className="delivered-content">
              <h3>Breakfast Specials</h3>
              <p>Start your day with our signature breakfast dishes. Fresh ingredients sourced daily from local farmers.</p>
              <div className="delivered-footer">
                <span className="price">$99/-</span>
                <button className="btn-sm">Order Now</button>
              </div>
            </div>
          </div>

          <div className="delivered-card">
            <div className="delivered-img">
              <img src="https://images.unsplash.com/photo-1571407-7296f97f8b85?w=400&h=300&fit=crop" alt="Pizza" />
            </div>
            <div className="delivered-content">
              <h3>Premium Pizza</h3>
              <p>Hand-tossed dough, premium toppings, and authentic Italian recipes. Baked to perfection every single time.</p>
              <div className="delivered-footer">
                <span className="price">$89/-</span>
                <button className="btn-sm">Order Now</button>
              </div>
            </div>
          </div>

          <div className="delivered-card">
            <div className="delivered-img">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" alt="Sides" />
            </div>
            <div className="delivered-content">
              <h3>Sides & Appetizers</h3>
              <p>Crispy fries, loaded nachos, and delicious wings. Perfect companions to complement your main course.</p>
              <div className="delivered-footer">
                <span className="price">$39/-</span>
                <button className="btn-sm">Order Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What They Say Section */}
      <section className="testimonials">
        <h2 className="section-title">
          <span className="bracket">[</span> What They Say <span className="bracket">]</span>
        </h2>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" />
              <div className="testimonial-info">
                <h4>John Smith</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#ffc107" color="#ffc107" />)}
                </div>
              </div>
            </div>
            <p className="testimonial-text">
              "Absolutely amazing! The quality of food and service is unmatched. I've been a regular for months now!"
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" />
              <div className="testimonial-info">
                <h4>Sarah Johnson</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#ffc107" color="#ffc107" />)}
                </div>
              </div>
            </div>
            <p className="testimonial-text">
              "Best coffee shop in town! The ambiance is perfect for working, and the baristas are super friendly."
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-header">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" />
              <div className="testimonial-info">
                <h4>Mike Chen</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#ffc107" color="#ffc107" />)}
                </div>
              </div>
            </div>
            <p className="testimonial-text">
              "Their specialty drinks are incredible. I always recommend this place to my friends and family."
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Chefs Section */}
      <section className="chefs" id="chefs">
        <h2 className="section-title">
          <span className="bracket">[</span> Meet Our Chefs <span className="bracket">]</span>
        </h2>

        <div className="chefs-container">
          <div className="chef-content">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" alt="Chef" className="chef-img" />
          </div>
          <div className="chef-info">
            <h3>Chef Antonio</h3>
            <p className="chef-desc">
              Our expert chefs bring passion, skill, and creativity to every dish. With over 20 years of experience in fine dining, they craft each meal to perfection, ensuring every bite is a memorable culinary experience.
            </p>
            <Link to="/menu" className="chef-btn">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>BrewByte Café</h4>
            <p>Experience authentic taste crafted with love.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#facebook"><Facebook size={20} /></a>
              <a href="#instagram"><Instagram size={20} /></a>
              <a href="#twitter"><Twitter size={20} /></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <input type="email" placeholder="Enter your email" className="email-input" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BrewByte Café. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}