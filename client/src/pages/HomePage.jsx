// nonnonhere/chatapp/ChatApp-235f30d4b58c5736899f57792fdde4d717e97489/client/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react'
import SidebarLeft from './SidebarLeft.jsx'
import ChatWindow from './ChatWindow'
import SidebarRight from './SidebarRight'
import assets, { userDummyData, messagesDummyData } from '../assets/assets'

function HomePage() {
  const [selectedChatUser, setSelectedChatUser] = useState(null)
  const [currentMessages, setCurrentMessages] = useState([])

  // Simulate current user (e.g., the logged-in user)
  const currentUser = userDummyData[1]; // Martin Johnson as current user for demo purposes

  useEffect(() => {
    // When a chat user is selected, filter messages related to that user
    if (selectedChatUser) {
      const filteredMessages = messagesDummyData.filter(
        (msg) =>
          (msg.senderId === currentUser._id && msg.receiverId === selectedChatUser._id) ||
          (msg.senderId === selectedChatUser._id && msg.receiverId === currentUser._id)
      )
      setCurrentMessages(filteredMessages);
    } else {
      setCurrentMessages([]);
    }
  }, [selectedChatUser, currentUser._id]);

  const handleSelectChat = (user) => {
    setSelectedChatUser(user)
  }

  // To simulate online/offline status, you can modify userDummyData
  // For this example, let's make a few users online.
  const usersWithStatus = userDummyData.map((user, index) => ({
    ...user,
    online: index % 2 === 0, // Alternate online/offline for demo
  }));

  return (
    <div className='flex w-[90%] h-[90vh] rounded-3xl overflow-hidden shadow-2xl'>
      {/* Left Sidebar */}
      <SidebarLeft
        users={usersWithStatus}
        selectedChatUser={selectedChatUser}
        onSelectChat={handleSelectChat}
      />

      {/* Chat Window */}
      <ChatWindow
        selectedChatUser={selectedChatUser}
        messages={currentMessages}
        currentUser={currentUser}
      />

      {/* Right Sidebar */}
      <SidebarRight
        selectedChatUser={selectedChatUser}
        messages={currentMessages} // Pass messages to filter media
      />
    </div>
  )
}

export default HomePage