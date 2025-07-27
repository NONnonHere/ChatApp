// nonnonhere/chatapp/ChatApp-235f30d4b58c5736899f57792fdde4d717e97489/client/src/components/Message.jsx
import React from 'react'

const Message = ({ message, isSender, senderProfilePic }) => {
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className={`flex items-end gap-3 mb-4 ${isSender ? 'justify-end' : ''}`}>
      {!isSender && ( // Display sender's profile pic for received messages
        <img
          src={senderProfilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <div
        className={`flex flex-col max-w-[70%] p-3 rounded-lg ${
          isSender
            ? 'bg-indigo-600 self-end rounded-br-none'
            : 'bg-gray-700 rounded-bl-none'
        }`}
      >
        {message.text && <p className="text-white text-md break-words">{message.text}</p>}
        {message.image && (
          <img
            src={message.image}
            alt="Sent Image"
            className="max-w-full h-auto rounded-lg mt-2"
          />
        )}
        <span className={`text-xs mt-1 ${isSender ? 'text-gray-300' : 'text-gray-400'} self-end`}>
          {messageTime} {message.seen && isSender ? '✔️' : ''}
        </span>
      </div>
    </div>
  )
}

export default Message