import React from 'react'
import { Routes, Route } from "react-router-dom"; 
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'

const App = () => {
  return (
  <div className="p-4 h-screen flex items-center justfiy-center">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
 
  </div>
  )
  }

export default App
