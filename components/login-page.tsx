"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Globe } from "lucide-react"

interface LoginPageProps {
  onLogin: (staffId: string, password: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [staffId, setStaffId] = useState("")
  const [password, setPassword] = useState("")
  const [language, setLanguage] = useState<"en" | "ka">("en")

  const translations = {
    en: {
      title: "Welcome to HostiTask",
      subtitle: "Sign in to your account",
      staffId: "Staff ID",
      password: "Password",
      login: "Sign In",
      staffIdPlaceholder: "Enter your Staff ID",
      passwordPlaceholder: "Enter your Password",
    },
    ka: {
      title: "კეთილი იყოს თქვენი მობრძანება HostiTask-ში",
      subtitle: "შედით თქვენს ანგარიშში",
      staffId: "თანამშრომლის ID",
      password: "პაროლი",
      login: "შესვლა",
      staffIdPlaceholder: "შეიყვანეთ თქვენი თანამშრომლის ID",
      passwordPlaceholder: "შეიყვანეთ თქვენი პაროლი",
    },
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (staffId && password) {
      onLogin(staffId, password)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ka" : "en")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full mix-blend-soft-light animate-floatOne"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-soft-light animate-floatTwo"></div>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="text-white/90 hover:text-white hover:bg-white/10 border border-white/20 transition-colors duration-200"
        >
          <Globe className="h-4 w-4 mr-2" />
          {language === "en" ? "ქართული" : "English"}
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 animate-pulseLogo">
            <img src="/images/logo.png" alt="HostiTask Logo" className="w-full h-full rounded-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-gray-600 mt-2">{t.subtitle}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Input
                id="staffId"
                type="text"
                placeholder={t.staffIdPlaceholder}
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                required
                className="h-12 w-full border-gray-200 focus:border-teal-500 focus:ring-teal-500 bg-transparent rounded-md transition-colors duration-200"
              />
            </div>

            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 w-full border-gray-200 focus:border-teal-500 focus:ring-teal-500 bg-transparent rounded-md transition-colors duration-200"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white text-base font-semibold rounded-lg transition-colors duration-200"
            >
              {t.login}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
