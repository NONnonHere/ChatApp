import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

function App() {
  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] bg-cover bg-center h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <h1>Welcome to QuickChat</h1>
    </div>
  )
}

export default App
