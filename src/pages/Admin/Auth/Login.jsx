import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Icon } from '@iconify/react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check for success message from password reset
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
    setSuccessMessage('');
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setSuccessMessage('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/admin/dashboard`;
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) {
        if (error.message.includes('already registered')) {
          setError('This email is already registered. Please login instead.');
        } else if (error.message.includes('rate limit')) {
          setError('Too many attempts. Please try again later');
        } else {
          setError(error.message);
        }
        return;
      }
      
      // Check if email confirmation is required
      if (data?.user && !data.session) {
        setSuccessMessage('Account created! Please check your email to confirm your account.');
      } else {
        // Auto-confirmed, redirect to dashboard
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Connection error. Please check your internet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please check your email to confirm your account');
        } else if (error.message.includes('rate limit')) {
          setError('Too many attempts. Please try again later');
        } else {
          setError(error.message);
        }
        return;
      }
      
      // Successful login - redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Connection error. Please check your internet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = mode === 'signup' ? handleSignup : handleLogin;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>Devmart</h1>
          <p>{mode === 'login' ? 'Sign in to your admin account' : 'Create your admin account'}</p>
        </div>
        
        {error && (
          <div className="auth-error-message">
            <Icon icon="mdi:alert-circle" className="icon" />
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="auth-success-message">
            <Icon icon="mdi:check-circle" className="icon" />
            {successMessage}
          </div>
        )}
        
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
              placeholder={mode === 'signup' ? 'Minimum 6 characters' : 'Enter your password'}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          {mode === 'login' && (
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
          )}
          
          <button type="submit" className="form-submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icon icon="mdi:loading" className="icon spinning" />
                {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
              </>
            ) : (
              mode === 'signup' ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={toggleMode} 
              className="auth-toggle-link"
              disabled={isLoading}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
