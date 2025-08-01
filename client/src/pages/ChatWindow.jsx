// client/src/pages/ChatWindow.jsx

import React, { useState, useContext } from 'react'; 
import Message from './Message';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext'; 

const ChatWindow = ({ selectedChatUser, messages, setMessages, currentUser }) => {
  const [messageText, setMessageText] = useState(''); 
  const { sendMessage } = useContext(AuthContext); 

  if (!selectedChatUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-2xl backdrop-blur-md shadow-lg">
        <h1 className="text-white text-2xl">Select a chat to start messaging</h1>
      </div>
    );
  }

  const handleSendMessage = async () => {
    if (!messageText.trim()) return; 

    const newMessage = await sendMessage(selectedChatUser._id, messageText);
    if (newMessage) {
        
        setMessages([...messages, newMessage]);
        setMessageText(''); 
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800 bg-opacity-50 p-6 rounded-2xl mx-4 backdrop-blur-md shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-600 mb-6">
          {/* ... (header JSX remains the same) ... */}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
        {messages.map((message) => (
          <Message
            key={message._id}
            message={message}
            isSender={message.senderId === currentUser._id}
            senderProfilePic={selectedChatUser.profilePic}
          />
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-600 mt-6">
        <textarea
          placeholder="Send a message"
          className="flex-1 bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 rounded-full py-3 px-6 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden min-h-[48px]"
          rows="1"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
        />
        <img src={assets.gallery_icon} alt="Gallery Icon" className="w-8 h-8 cursor-pointer opacity-70 hover:opacity-100" />
        <img 
            src={assets.send_button} 
            alt="Send Button" 
            className="w-10 h-10 cursor-pointer opacity-70 hover:opacity-100"
            onClick={handleSendMessage} // Add onClick handler
        />
      </div>
    </div>
  );
};

export default ChatWindow;