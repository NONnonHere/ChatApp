// nonnonhere/chatapp/ChatApp-235f30d4b58c5736899f57792fdde4d717e97489/client/src/components/SidebarRight.jsx
import React from 'react'
import { imagesDummyData } from '../assets/assets' // Import dummy image data

const SidebarRight = ({ selectedChatUser, messages }) => {
  // Filter messages to get only those with images for the media section
  const mediaMessages = messages.filter(msg => msg.image);

  if (!selectedChatUser) {
    return (
      <div className="w-1/5 bg-gray-800 bg-opacity-70 p-6 rounded-r-2xl flex flex-col backdrop-blur-md shadow-lg items-center justify-center">
        <p className="text-white text-center">Select a chat to see details</p>
      </div>
    )
  }

  return (
    <div className="w-1/5 bg-gray-800 bg-opacity-70 p-6 rounded-r-2xl flex flex-col backdrop-blur-md shadow-lg">
      {/* User Profile Info */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-4">
          <img
            src={selectedChatUser.profilePic}
            alt={selectedChatUser.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
          />
          <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full ${selectedChatUser.online ? 'bg-green-500' : 'bg-gray-500'} border-2 border-gray-800`}></span>
        </div>
        <h2 className="text-white text-xl font-bold">{selectedChatUser.fullName}</h2>
        <p className={`text-sm ${selectedChatUser.online ? 'text-green-400' : 'text-gray-400'}`}>
          {selectedChatUser.online ? 'Online' : 'Offline'}
        </p>
        <p className="text-gray-300 text-sm mt-2">{selectedChatUser.bio}</p>
      </div>

      {/* Media Section */}
      <div className="mb-8">
        <h3 className="text-white text-lg font-semibold mb-4">Media</h3>
        <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto custom-scrollbar p-1">
          {mediaMessages.length > 0 ? (
            mediaMessages.map((msg, index) => (
              <img
                key={index}
                src={msg.image}
                alt={`Media ${index}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm col-span-2">No media shared yet.</p>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200">
        Logout
      </button>
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

export default SidebarRight