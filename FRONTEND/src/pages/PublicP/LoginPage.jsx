import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('vendor');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      navigate('/vendor/dashboard');
    } else {
      if (role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/supplier/dashboard');
      }
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h2>
          <p>{isLogin ? 'Login to continue to your dashboard.' : 'Sign up to get started with ApnaMandi.'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          {!isLogin && (
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
          )}

          <button type="submit" className="btn-auth-submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
