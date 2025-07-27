// nonnonhere/chatapp/ChatApp-235f30d4b58c5736899f57792fdde4d717e97489/client/src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets'; // Import assets for logo

function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(''); // For profile picture URL

  // No actual signup logic, just UI
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup attempt:', { fullName, email, password, profilePic });
    // In a real app, you'd handle user registration and data storage here
    alert('Signup functionality is not implemented in this UI-only version.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center" style={{ backgroundImage: `url(${assets.bgImage})` }}>
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-2xl shadow-lg w-full max-w-md backdrop-blur-md border border-gray-700">
        <div className="flex justify-center mb-6">
          <img src={assets.logo} alt="QuickChat Logo" className="w-24 h-auto" />
        </div>
        <h2 className="text-white text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Profile Picture URL (Optional)"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-300 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
