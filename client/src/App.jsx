// client/src/App.jsx

import React, {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from './context/AuthContext.jsx'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function App() {
  const { authUser, loading } = useContext(AuthContext); // Get the loading state

  // If the app is still checking authentication, show a loading indicator
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <DotLottieReact src="https://lottie.host/6d11a16e-b991-4501-aaa7-0ae7a06eb726/I9cvMpv3CE.lottie"loop autoplay />
      </div>
    );
  }

  // Once loading is false, render the routes based on authUser status
  return (
    <div className='h-screen flex items-center justify-center bg-gray-900'>
      <Toaster/> 
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App;