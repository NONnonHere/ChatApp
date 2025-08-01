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

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state, default to true
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    const checkAuth = async () => {
        try {
            const { data } = await axios.get('/api/auth/check');
            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            toast.error('Authentication failed. Please log in again.');
        } finally {
            setLoading(false); // Set loading to false after the check is complete
        }
    };

    const login = async (userData, navigate) => {
        try {
            const {data} = await axios.post('/api/auth/login', userData);            
            console.log("Login response data:", data);
            if(data.success){
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token;
                setToken(data.token);
                localStorage.setItem('token', data.token);
                toast.success('Login successful!', data.message);
                navigate('/'); 
            }
            else{
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message)
            
        }

    }    

    const signup = async (userData) => {
        try {
            const {data} = await axios.post('/api/auth/signup', userData);            
            if(data.success){
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token;
                setToken(data.token);
                localStorage.setItem('token', data.token);
                toast.success('Signup successful!', data.message);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
            
        }

    }


    const logout = async() =>{
        localStorage.removeItem('token');
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.header.common["token"] = null;
        toast.success("logged out successfully");
        socket.disconnect();
    }



    const updateProfile = async (body) => {
        try {
            // Make the API call to the backend
            const {data} = await axios.put("/api/auth/update-profile", body);
            if(data.status === "success"){ // Check for "success" status
                setAuthUser(data.userData); // Use userData from response
                toast.success("Profile updated successfully");
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
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

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
    }, [token]);


   const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        loading, // Expose loading state
        login,
        logout,
        updateProfile,
    };
   
   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   );
}