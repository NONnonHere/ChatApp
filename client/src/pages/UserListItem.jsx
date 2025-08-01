// client/src/pages/UserListItem.jsx

import React from 'react';
import assets from '../assets/assets'; // Import assets to get the default avatar

const UserListItem = ({ user, isSelected, onClick }) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all duration-200 ${
        isSelected ? 'bg-indigo-700 bg-opacity-70' : 'hover:bg-gray-700 hover:bg-opacity-50'
      }`}
      onClick={() => onClick(user)}
    >
      <img
       
        src={user.profilePic || assets.avatar_icon}
        alt={user.fullName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="text-white text-lg font-semibold">{user.fullName}</h3>
        <p className={`text-sm ${user.online ? 'text-green-400' : 'text-gray-400'}`}>
          {user.online ? 'Online' : 'Offline'}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;