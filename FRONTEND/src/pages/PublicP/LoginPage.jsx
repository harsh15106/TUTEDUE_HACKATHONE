import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const API_URL = 'http://localhost:3001/api/v1';

const LoginPage = () => {
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
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha(randomString);
  };

  useEffect(() => {
    generateCaptcha();
  }, [isLogin]);

  // --- SIGN UP ---
  const handleSignUp = async (e) => {
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
    try {
      const payload = {
        username: fullName,
        email,
        pass: password,
        address: "N/A", // You can add an address field if you want
        identity: role,
        phone: "0000000000" // You can add a phone field if you want
      };
      const res = await axios.post(`${API_URL}/auth/register`, payload);
      alert('Sign up successful! Please log in.');
      setIsLogin(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  // --- LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    if (captcha.toLowerCase() !== captchaInput.toLowerCase()) {
      setError("Captcha is incorrect.");
      generateCaptcha();
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        pass: password
      });
      // Save token and user info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setError('');
      // Redirect based on role
      if (res.data.user.identity === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (res.data.user.identity === 'supplier') {
        navigate('/supplier/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
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