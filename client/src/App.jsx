// nonnonhere/chatapp/ChatApp-235f30d4b58c5736899f57792fdde4d717e97489/client/src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignupPage from './pages/SignupPage.jsx' // Import SignupPage

function App() {
  return (
    <div className='h-screen flex items-center justify-center bg-gray-900'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Add Signup route */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
