import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Icon } from '@iconify/react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/auth/reset-password`,
      });
      
      if (error) {
        if (error.message.includes('rate limit')) {
          setError('Too many requests. Please wait a few minutes');
        } else {
          setError(error.message);
        }
        return;
      }
      
      setSuccess(true);
    } catch (err) {
      setError('Connection error. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>Devmart</h1>
          <p>Reset your password</p>
        </div>
        
        {success && (
          <div className="auth-success-message">
            <Icon icon="mdi:check-circle" className="icon" />
            Password reset link sent! Check your email inbox (and spam folder).
          </div>
        )}
        
        {error && (
          <div className="auth-error-message">
            <Icon icon="mdi:alert-circle" className="icon" />
            {error}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="form-submit" disabled={isLoading || success}>
            {isLoading ? (
              <>
                <Icon icon="mdi:loading" className="icon spinning" />
                Sending...
              </>
            ) : success ? (
              'Email Sent'
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <Link to="/admin/auth/login">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
