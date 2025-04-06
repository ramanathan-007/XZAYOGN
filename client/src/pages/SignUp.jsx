import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/signup', {
        email,
        password,
      });

      if (res.data.success) {
        navigate('/success');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Error signing up.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/img2.png')" }}></div>

      <div className="w-1/2 flex flex-col justify-center px-16">
        <div className="text-right mb-4">
          <span className="text-sm">Already have an account? <a href="/" className="text-purple-600 font-semibold">Sign in</a></span>
        </div>

        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
