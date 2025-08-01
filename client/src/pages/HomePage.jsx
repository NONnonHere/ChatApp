// client/src/pages/HomePage.jsx

import React, { useState, useEffect, useContext } from 'react';
import SidebarLeft from './SidebarLeft.jsx';
import ChatWindow from './ChatWindow';
import SidebarRight from './SidebarRight';
import { AuthContext } from '../context/AuthContext';

function HomePage() {
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { authUser, axios, onlineUsers, socket } = useContext(AuthContext); // Get the socket instance

  // Fetch users for the sidebar
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get("/api/messages/sidebar");
        if (data.status === "success") {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (authUser) {
      getUsers();
    }
  }, [authUser, axios]);

  // Fetch messages for the selected chat
  useEffect(() => {
    if (selectedChatUser) {
        const getMessages = async () => {
            try {
                const {data} = await axios.get(`/api/messages/${selectedChatUser._id}`);
                if (data.status === "success") {
                    setMessages(data.messages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        getMessages();
    } else {
      setMessages([]);
    }
  }, [selectedChatUser, authUser, axios]);

  // FIX: Add useEffect to listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (newMessage) => {
        // Check if the message belongs to the currently selected chat
        if (selectedChatUser?._id === newMessage.senderId) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      // Clean up the event listener when the component unmounts
      return () => socket.off("getMessage");
    }
  }, [socket, selectedChatUser]);


  const handleSelectChat = (user) => {
    setSelectedChatUser(user);
  };

  const usersWithStatus = users.map((user) => ({
    ...user,
    online: onlineUsers.includes(user._id),
  }));

  return (
    <div className='flex w-[90%] h-[90vh] rounded-3xl overflow-hidden shadow-2xl'>
      <SidebarLeft
        users={usersWithStatus}
        selectedChatUser={selectedChatUser}
        onSelectChat={handleSelectChat}
      />
      <ChatWindow
        selectedChatUser={selectedChatUser}
        messages={messages}
        setMessages={setMessages}
        currentUser={authUser}
      />
      <SidebarRight
        selectedChatUser={selectedChatUser}
        messages={messages}
      />
    </div>
  );
}

export default HomePage;