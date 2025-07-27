// nonnonhere/chatapp/ChatApp-235f30d4b58c5736899f57792fdde4d717e97489/client/src/components/SidebarLeft.jsx
import React from 'react'
import UserListItem from './UserListItem' // Import the new component
import assets, { userDummyData } from '../assets/assets' // Import assets and dummy data

const SidebarLeft = ({ users, selectedChatUser, onSelectChat }) => {
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

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2"> {/* Added custom-scrollbar */}
        {users.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            isSelected={selectedChatUser && selectedChatUser._id === user._id}
            onClick={onSelectChat}
          />
        ))}
      </div>

      {/* Add custom-scrollbar styles to index.css if not already there */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.4); /* gray-400 with opacity */
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

export default SidebarLeft