// client/context/AuthContext.jsx
import React from 'react';
import {createContext, useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import io from 'socket.io-client';
import { useState } from 'react';



const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;


export const AuthContext = React.createContext();


export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);


    const checkAuth = async () => {
        try {
            const { data } = await axios.get('/api/auth/check');
                if (data.success) {
                    setAuthUser(data.userData);
                    connectSocket(data.userData);
                }

        } catch (error) {
            toast.error('Authentication failed. Please log in again.');

        }
        finally {
            setLoading(false);
        }
    }

    const signup = async (userData) => {
        try {
            const { data } = await axios.post('/api/auth/signup', userData);
            if (data.status === 'success') {
                // Set user, token, and connect socket based on the server's response
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token;
                setToken(data.token);
                localStorage.setItem('token', data.token);
                toast.success('Signup successful! Welcome.');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
        }
    };

    const login = async (userData) => {
        try {
            const {data} = await axios.post('/api/auth/login', userData);
            if(data.status === "success"){
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token;
                setToken(data.token);
                localStorage.setItem('token', data.token);
                toast.success('Login successful!');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)

        }

    }


    const logout = async() =>{
        // FIX: Disconnect the socket before clearing local data
        if (socket) {
            socket.disconnect();
        }
        localStorage.removeItem('token');
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        setSocket(null); // Also clear the socket state
        delete axios.defaults.headers.common["token"]; // Use delete to remove the header
        toast.success("Logged out successfully");
    }

    const sendMessage = async (receiverId, message) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${receiverId}`, { text: message });
            if (data.status === 'success') {
                return data.data; 
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
        return null;
    };



    const updateProfile = async (body) => {
        try {
            const {data} = await axios.put("/api/auth/update-profile", body);
            
            
            if(data.status === "success"){
                setAuthUser(data.userData); 
                toast.success("Profile updated successfully");
            } else {
                
                toast.error(data.message || "Failed to update profile.");
            }
        } catch (error) {
            
            toast.error(error.response?.data?.message || "An error occurred.");
        }
    }



    const connectSocket = (userData) => {
        if(!userData || socket?.connected ) return;
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });
    }

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"] = token;
            checkAuth();
        } else {
            setLoading(false);
        }
    },[token]);


   const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    loading,
    login,
    logout,
    signup,
    sendMessage,
    updateProfile

   }

   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   );
}