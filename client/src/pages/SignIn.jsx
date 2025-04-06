import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // 👈 Import the CSS
import img2 from '../assets/img2.png'; // Adjust path if necessary

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogle = async (response) => {
    try {
      const res = await axios.post('http://localhost:5000/api/google-login', {
        token: response.credential,
      });

      if (res.data.success) {
        navigate('/success');
      } else {
        setError(res.data.message);
      }
    } catch {
      setError('Google login failed');
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: 'api-key',
        callback: handleGoogle,
      });

      window.google.accounts.id.renderButton(document.getElementById('googleBtn'), {
        theme: 'outline',
        size: 'large',
        width: '100%',
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });

      if (res.data.success) {
        navigate('/success');
      } else {
        setError(res.data.message);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      {/* Left section with image */}
      <div className="signin-left">
  <img src={img2} alt="Sign In Visual" />
</div>

      {/* Right section with form */}
      <div className="signin-right">
        <div className="signin-header">
          <span>
            Don’t have an account? <a href="/signup">Sign up</a>
          </span>
        </div>

        <h2 className="signin-title">Sign in</h2>

        <div id="googleBtn" className="google-button-container" />

        <div className="divider">OR</div>

        <form onSubmit={handleSubmit} className="signin-form">
          <label>Username or email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Your password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <div className="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>

          <button type="submit" className="signin-btn">
            Sign in
          </button>
        </form>

        <div className="continue-as-guest">
          <a href="#">Continue as guest →</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
