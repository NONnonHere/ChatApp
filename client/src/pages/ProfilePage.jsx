// client/src/pages/ProfilePage.jsx

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import assets from '../assets/assets'; // Import assets for fallback images

export default function ProfilePage() {
  const { authUser, updateProfile } = useContext(AuthContext); // Get user and function from context

  // State for form fields, initialized with authUser data or empty strings
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null); // This will hold the File object or base64 string
  const [profileImagePreview, setProfileImagePreview] = useState(''); // For displaying the image

  // Populate form when authUser is available
  useEffect(() => {
    if (authUser) {
      setFullName(authUser.fullName || '');
      setBio(authUser.bio || '');
      setProfileImagePreview(authUser.profilePic || assets.avatar_icon);
    }
  }, [authUser]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      fullName,
      bio,
      // Only include profilePic if a new image was selected
      ...(profileImage && { profilePic: profileImage }),
    };
    await updateProfile(profileData);
  };

  // Handle image selection and create a preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a base64 string for the backend and a preview URL for the frontend
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImage(reader.result); // Base64 for API
        setProfileImagePreview(reader.result); // Base64 for preview
      };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center" style={{ backgroundImage: `url(${assets.bgImage})` }}>
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-2xl shadow-lg w-full max-w-md backdrop-blur-md border border-gray-700">
        <h2 className="text-white text-3xl font-bold text-center mb-6">Profile Details</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4 mb-4">
            <label htmlFor="profile-upload" className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 cursor-pointer">
              <img
                src={profileImagePreview} // Use the preview state
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <span className="text-white text-center text-sm">Upload Image</span>
              </div>
            </label>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
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
              placeholder="Tell us about yourself"
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}