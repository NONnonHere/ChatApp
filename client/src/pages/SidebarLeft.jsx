// client/src/pages/SidebarLeft.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserListItem from './UserListItem';
import assets from '../assets/assets'; 
import { AuthContext } from '../context/AuthContext';


const SidebarLeft = ({ users, selectedChatUser, onSelectChat }) => {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="w-1/4 bg-gray-800 bg-opacity-70 p-6 rounded-l-2xl flex flex-col backdrop-blur-md shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <img src={assets.logo} alt="QuickChat Logo" className="w-10 h-10 object-contain" />
        <h2 className="text-white text-3xl font-bold">QuickChat</h2>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <img
          src={assets.search_icon}
          alt="Search Icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
        />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {/* This will now map over the real users passed via props */}
        {users.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            isSelected={selectedChatUser && selectedChatUser._id === user._id}
            onClick={onSelectChat}
          />
        ))}
      </div>

      {/* Profile Button Section */}
      {authUser && (
        <div className="mt-auto pt-4 border-t border-gray-700">
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <img
              src={authUser.profilePic || assets.avatar_icon}
              alt={authUser.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold">{authUser.fullName}</h3>
              <p className="text-sm text-gray-400">View Profile</p>
            </div>
          </Link>
        </div>
      )}
      
      {/* Scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.4);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default SidebarLeft;