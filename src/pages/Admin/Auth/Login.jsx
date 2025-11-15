import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Phase 4 - Implement Supabase Auth login
    console.log('Login form submitted - to be implemented in Phase 4', formData);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>Devmart</h1>
          <p>Sign in to your admin account</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="admin@devmart.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            
            <Link to="/admin/auth/reset-password" className="form-link">
              Forgot password?
            </Link>
          </div>
          
          <button type="submit" className="form-submit" disabled>
            Sign In (Phase 4)
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Protected admin area - authorized access only
          </p>
        </div>
      </div>
    </div>
  );
}
