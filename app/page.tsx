"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import Dashboard from "@/components/dashboard"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const handleLogin = (email: string, password: string) => {
    // Simulate API call - determine role based on email domain or other logic
    const role = email.includes("manager") ? "manager" : "front-desk"
    setUserEmail(email)
    setUserName(email.split("@")[0])
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
    setUserEmail("")
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  // Determine role based on email or other logic
  const userRole = userEmail.includes("manager") ? "manager" : "front-desk"

  return <Dashboard userRole={userRole} userName={userName} onLogout={handleLogout} />
}
