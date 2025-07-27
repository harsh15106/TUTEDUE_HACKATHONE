import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? 'star filled' : 'star'}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const ScrambleAnimation = ({ text, highlightText }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&';

  useEffect(() => {
    let intervalId;
    let isMounted = true;

    const animate = () => {
      let iteration = 0;
      clearInterval(intervalId);

      intervalId = setInterval(() => {
        if (!isMounted) return clearInterval(intervalId);

        const scrambled = text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        setDisplayText(scrambled);

        if (iteration >= text.length) {
          clearInterval(intervalId);
          setTimeout(() => {
            if (!isMounted) return;
            setDisplayText('');
            setTimeout(() => {
              if (isMounted) animate();
            }, 500);
          }, 2000);
        }
        iteration += 1 / 2;
      }, 50);
    };

    animate();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [text]);

  const highlightIndex = text.indexOf(highlightText);
  const startText = displayText.substring(0, highlightIndex);
  const highlighted = displayText.substring(highlightIndex, highlightIndex + highlightText.length);
  const endText = displayText.substring(highlightIndex + highlightText.length);

  return (
    <h1 className="landing-title">
      {startText}
      <span className="highlight">{highlighted}</span>
      {endText}
    </h1>
  );
};


const LandingPage = () => {
  const features = [
    { icon: '✅', title: 'Verified Suppliers', description: 'Connect with trusted, high-quality suppliers vetted by our team.' },
    { icon: '💰', title: 'Competitive Pricing', description: 'Access bulk discounts and competitive rates to increase your profit margins.' },
    { icon: '🚚', title: 'Reliable Delivery', description: 'Streamline your operations with timely and dependable delivery services.' },
  ];

  const supplierReviews = [
    { id: 1, name: 'Gupta Chaat Corner', rating: 5, comment: 'ApnaMandi helped me find the freshest vegetables. My profits have increased!' },
  ];

  const vendorReviews = [
    { id: 1, name: 'Rajesh Kumar Supplies', rating: 5, comment: 'I\'ve doubled my customer base since joining. The platform is so easy to use.' },
  ];

  const faqs = [
    { q: 'How do I register?', a: 'Click the "Login / Sign Up" button and choose your role to create an account.' },
    { q: 'Is there a fee to join?', a: 'No, joining ApnaMandi is completely free for both vendors and suppliers.' },
    { q: 'How are suppliers verified?', a: 'Our team conducts a thorough check of each supplier to ensure quality and reliability.' },
  ];

  return (
    <div className="landing-page">
      <section id="home" className="hero-section">
        <div className="landing-content">
          <ScrambleAnimation text="Welcome to ApnaMandi" highlightText="ApnaMandi" />
          <p className="landing-subtitle">
            Connecting street food vendors with quality suppliers.
          </p>
          <Link to="/auth" className="btn-get-started">
          Get Started
          <span className="material-symbols-outlined arrow">arrow_forward</span>
          </Link>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2 className="section-title">Why Choose ApnaMandi?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="reviews-section">
        <div className="review-column">
          <h2 className="section-title">What Vendors Are Saying</h2>
          {supplierReviews.map(review => (
            <div key={review.id} className="review-card">
              <p className="review-comment">"{review.comment}"</p>
              <div className="review-footer">
                <span className="review-name">- {review.name}</span>
                <StarRating rating={review.rating} />
              </div>
            </div>
          ))}
        </div>
        <div className="review-column">
          <h2 className="section-title">What Suppliers Are Saying</h2>
          {vendorReviews.map(review => (
            <div key={review.id} className="review-card">
              <p className="review-comment">"{review.comment}"</p>
              <div className="review-footer">
                <span className="review-name">- {review.name}</span>
                <StarRating rating={review.rating} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
