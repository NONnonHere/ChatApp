// nonnonhere/chatapp/ChatApp-235f30d4b58c5736899f57792fdde4d717e97489/client/src/App.jsx
import React, {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignupPage from './pages/SignupPage.jsx' // Import SignupPage
import { Toaster } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext.jsx'

function App() {
  const { authUser } = useContext(AuthContext);
  return (
    <div className='h-screen flex items-center justify-center bg-gray-900'>
      <Toaster/> 
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Add Signup route */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App
