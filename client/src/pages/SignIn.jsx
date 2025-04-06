// // import React, { useState } from "react";
// // import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
// // import { Link } from "react-router-dom";

// // const SignIn = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState({ email: "", password: "" });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!email) setError((err) => ({ ...err, email: "Email is required" }));
// //     if (!password)
// //       setError((err) => ({ ...err, password: "Password is required" }));
// //   };

// //   return (
// //     <div className="flex h-screen w-full">
// //       {/* Left Side Image */}
// //       <div className="w-1/2 hidden md:block">
// //         <img
// //           src="/img2.png"
// //           alt="Job Banner"
// //           className="object-cover w-full h-full"
// //         />
// //       </div>

// //       {/* Right Side Form */}
// //       <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6">
// //         <div className="w-full max-w-md">
// //           <div className="text-right text-sm mb-4">
// //             Don’t have an account? <Link to="/signup" className="text-purple-600 font-semibold">Sign up</Link>
// //           </div>

// //           <h2 className="text-2xl font-semibold mb-6">Sign in</h2>

// //           <button className="w-full border px-4 py-2 mb-4 flex items-center justify-center rounded-md shadow-sm">
// //             <FaGoogle className="mr-2" /> Continue with Google
// //           </button>

// //           <div className="text-center mb-4">OR</div>

// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-4">
// //               <label className="block text-sm">User name or email address</label>
// //               <input
// //                 type="text"
// //                 className="w-full border px-3 py-2 rounded-md"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //               />
// //               {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm">Your password</label>
// //               <div className="relative">
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   className="w-full border px-3 py-2 rounded-md pr-10"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                 />
// //                 <span
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute top-3 right-3 cursor-pointer"
// //                 >
// //                   {showPassword ? <FaEyeSlash /> : <FaEye />}
// //                 </span>
// //               </div>
// //               {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
// //             </div>

// //             <div className="text-sm text-right mb-4">
// //               <Link to="/forgot-password" className="text-purple-600">Forget your password</Link>
// //             </div>

// //             <button
// //               type="submit"
// //               className="w-full bg-gray-300 text-white py-2 rounded-md cursor-not-allowed"
// //               disabled
// //             >
// //               Sign in
// //             </button>
// //           </form>

// //           <div className="mt-6 text-center">
// //             <Link to="/guest" className="text-purple-600 font-semibold">
// //               Continue as guest →
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignIn;


// import React from 'react';
// import './SignIn.css';
// import img2 from '../assets/img2.png';

// function SignIn() {
//   return (
//     <div className="signin-container">
//       <div className="left-side">
//         <img src={img2} alt="Sign in visual" />
//       </div>
//       <div className="right-side">
//         <div className="top-link">Don’t have an account? <a href="/signup">Sign up</a></div>
//         <h2>Sign in</h2>
//         <button className="google-btn">Continue with Google</button>
//         <div className="or-divider">OR</div>
//         <form>
//           <label>
//             Username or email address
//             <input type="text" placeholder="Enter username or email" required />
//           </label>
//           <span className="error">Error message</span>

//           <label>
//             Your password
//             <input type="password" placeholder="Enter password" required />
//           </label>
//           <span className="error">Error message</span>

//           <div className="forgot-password">Forget your password?</div>
//           <button type="submit" className="signin-btn">Sign in</button>
//         </form>
//         <button className="guest-btn">Continue as guest</button>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

// frontend/src/pages/SignIn.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   // Google Sign-In Handler
//   const handleGoogle = async (response) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/google-login', {
//         token: response.credential,
//       });

//       if (res.data.success) {
//         alert('Google login successful!');
//         // store token / redirect if needed
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError('Google login failed');
//     }
//   };

//   // Setup Google Sign-In Button
//   useEffect(() => {
//     if (window.google) {
//       google.accounts.id.initialize({
//         client_id: '982628677943-m9cl6ldi8hfsfrkn59p5a2ohe39a0it5.apps.googleusercontent.com',
//         callback: handleGoogle,
//       });

//       google.accounts.id.renderButton(
//         document.getElementById('googleBtn'),
//         { theme: 'outline', size: 'large', width: 280 }
//       );
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/login', {
//         email,
//         password,
//       });

//       if (res.data.success) {
//         alert('Login successful!');
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-4">Sign In</h2>

//       <div id="googleBtn" className="mb-6" />

//       <div className="text-center text-sm text-gray-500 mb-4">OR</div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         {error && <p className="text-red-500">{error}</p>}

//         <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;



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
        client_id: '982628677943-m9cl6ldi8hfsfrkn59p5a2ohe39a0it5.apps.googleusercontent.com',
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
