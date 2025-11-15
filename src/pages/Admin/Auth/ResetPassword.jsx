import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Phase 4 - Implement Supabase Auth password reset
    console.log('Reset password submitted - to be implemented in Phase 4', email);
    setSuccess(true);
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
            Password reset instructions will be sent to your email (Phase 4)
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
          
          <button type="submit" className="form-submit" disabled>
            Send Reset Link (Phase 4)
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
