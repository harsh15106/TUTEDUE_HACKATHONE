import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ onSignUp, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('vendor');
  const [showPassword, setShowPassword] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [stallName, setStallName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  
  const [businessName, setBusinessName] = useState('');
  const [specialties, setSpecialties] = useState('');

  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha(randomString);
  };

  useEffect(() => {
    generateCaptcha();
  }, [isLogin]);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (captcha.toLowerCase() !== captchaInput.toLowerCase()) {
      setError("Captcha is incorrect.");
      generateCaptcha();
      return;
    }
    
    const userData = { fullName, email, password, role };
    if (role === 'vendor') {
      userData.stallName = stallName;
      userData.cuisineType = cuisineType;
    } else {
      userData.businessName = businessName;
      userData.specialties = specialties;
    }

    onSignUp(userData);
    setError('');
    alert('Sign up successful! Please log in.');
    setIsLogin(true);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (captcha.toLowerCase() !== captchaInput.toLowerCase()) {
      setError("Captcha is incorrect.");
      generateCaptcha();
      return;
    }
    const success = onLogin({ email, password });
    if (!success) {
      setError("Invalid email or password.");
      generateCaptcha();
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <div className="auth-header">
          <h2 className="auth-title">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h2>
          <p className="auth-subtitle">{isLogin ? 'Login to continue to your dashboard.' : 'Sign up to get started with ApnaMandi.'}</p>
        </div>

        <form className="auth-form" onSubmit={isLogin ? handleLogin : handleSignUp}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" required />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
          <div className="form-group password-group">
            <label>Password</label>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
            <span className="password-toggle-icon material-symbols-outlined" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </div>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
              </div>
              <div className="password-restrictions">
                Password must be at least 8 characters long.
              </div>
              <div className="role-selector">
                <label>You are a:</label>
                <div className="role-options">
                  <label className={role === 'vendor' ? 'active' : ''}>
                    <input type="radio" name="role" value="vendor" checked={role === 'vendor'} onChange={() => setRole('vendor')} />
                    Vendor
                  </label>
                  <label className={role === 'supplier' ? 'active' : ''}>
                    <input type="radio" name="role" value="supplier" checked={role === 'supplier'} onChange={() => setRole('supplier')} />
                    Supplier
                  </label>
                </div>
              </div>
              {role === 'vendor' && (
                <>
                  <div className="form-group">
                    <label>Stall Name</label>
                    <input type="text" value={stallName} onChange={(e) => setStallName(e.target.value)} placeholder="e.g., Gupta Chaat Corner" required />
                  </div>
                  <div className="form-group">
                    <label>Cuisine Type</label>
                    <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} placeholder="e.g., Chaat, Dosa, etc." required />
                  </div>
                </>
              )}
              {role === 'supplier' && (
                <>
                  <div className="form-group">
                    <label>Business Name</label>
                    <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g., Rajesh Kumar Supplies" required />
                  </div>
                  <div className="form-group">
                    <label>Specialties</label>
                    <input type="text" value={specialties} onChange={(e) => setSpecialties(e.target.value)} placeholder="e.g., Vegetables, Spices" required />
                  </div>
                </>
              )}
            </>
          )}

          <div className="captcha-group">
            <label>Enter Captcha</label>
            <div className="captcha-wrapper">
              <div className="captcha-box">{captcha}</div>
              <button type="button" className="btn-refresh-captcha" onClick={generateCaptcha}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
            <input type="text" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="Enter the text above" required />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-auth-submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;