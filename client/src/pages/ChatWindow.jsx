// nonnonhere/chatapp/ChatApp-235f30d4b58c5736899f57792fdde4d717e97489/client/src/components/ChatWindow.jsx
import React from 'react'
import Message from './Message' // Import the new component
import assets, { userDummyData } from '../assets/assets' // Import assets

const ChatWindow = ({ selectedChatUser, messages, currentUser }) => {
  if (!selectedChatUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-2xl backdrop-blur-md shadow-lg">
        <h1 className="text-white text-2xl">Select a chat to start messaging</h1>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800 bg-opacity-50 p-6 rounded-2xl mx-4 backdrop-blur-md shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-600 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={selectedChatUser.profilePic}
            alt={selectedChatUser.fullName}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-white text-xl font-semibold">{selectedChatUser.fullName}</h2>
            <p className={`text-sm ${selectedChatUser.online ? 'text-green-400' : 'text-gray-400'}`}>
              {selectedChatUser.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <img src={assets.help_icon} alt="Info Icon" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4"> {/* Added custom-scrollbar */}
        {messages.map((message) => (
          <Message
            key={message._id}
            message={message}
            isSender={message.senderId === currentUser._id}
            senderProfilePic={selectedChatUser.profilePic} // For received messages
          />
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-600 mt-6">
        <textarea
          placeholder="Send a message"
          className="flex-1 bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 rounded-full py-3 px-6 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden min-h-[48px]" // min-h for single line
          rows="1"
          style={{ height: 'auto' }} // Allows auto-growing
          onInput={(e) => {
            e.target.style.height = 'auto'; // Reset height
            e.target.style.height = (e.target.scrollHeight) + 'px'; // Set to scroll height
          }}
        />
        <img src={assets.gallery_icon} alt="Gallery Icon" className="w-8 h-8 cursor-pointer opacity-70 hover:opacity-100" />
        <img src={assets.send_button} alt="Send Button" className="w-10 h-10 cursor-pointer opacity-70 hover:opacity-100" />
      </div>
    </div>
  )
}

export default ChatWindow