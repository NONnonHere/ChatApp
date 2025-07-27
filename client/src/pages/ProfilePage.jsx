// nonnonhere/chatapp/ChatApp-235f30d4b58c5736899f57792fdde4d717e97489/client/src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import assets from '../assets/assets'; // Import assets for logo and avatar

export default function ProfilePage() {
  // Dummy data for the profile, replace with actual user data in a real application
  const [fullName, setFullName] = useState('Martin Johnson');
  const [bio, setBio] = useState('Hi Everyone, I am Using QuickChat');
  const [profileImage, setProfileImage] = useState(assets.profile_martin); // Use a dummy profile pic

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile save attempt:', { fullName, bio, profileImage });
    // In a real app, you'd send this data to your backend/database
    alert('Profile save functionality is not implemented in this UI-only version.');
  };

  // Placeholder for image upload interaction (UI only)
  const handleImageUploadClick = () => {
    alert('Image upload functionality is not implemented in this UI-only version.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center" style={{ backgroundImage: `url(${assets.bgImage})` }}>
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-2xl shadow-lg w-full max-w-md backdrop-blur-md border border-gray-700">
        <div className="flex justify-center mb-6">
          {/* You can add your app logo here if desired, similar to login/signup */}
          {/* <img src={assets.logo} alt="QuickChat Logo" className="w-24 h-auto" /> */}
        </div>
        <h2 className="text-white text-3xl font-bold text-center mb-6">Profile Details</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 cursor-pointer" onClick={handleImageUploadClick}>
              <img
                src={profileImage || assets.avatar_icon} // Fallback to a default avatar
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <span className="text-white text-center text-sm">Upload Profile Image</span>
              </div>
            </div>
          </div>

          {/* Full Name Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-gray-300 text-sm">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Bio Textarea */}
          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-gray-300 text-sm">Bio</label>
            <textarea
              id="bio"
              placeholder="Hi Everyone, I am Using QuickChat"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors duration-200 mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
