"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Globe, User, Menu } from "lucide-react"

interface DashboardHeaderProps {
  userRole: "front-desk" | "manager"
  userName: string
  language: "en" | "ka"
  onToggleLanguage: () => void
  onMobileMenuToggle: () => void
}

export default function DashboardHeader({ 
  userRole, 
  userName, 
  language, 
  onToggleLanguage, 
  onMobileMenuToggle 
}: DashboardHeaderProps) {
  const translations = {
    en: {
      frontDesk: "Front Desk",
      manager: "Manager",
    },
    ka: {
      frontDesk: "მიმღები",
      manager: "მენეჯერი",
    },
  }

  const t = translations[language]

  return (
    <header className="bg-white border-b-2 border-teal-200 px-3 sm:px-4 py-3 sm:py-4 shadow-sm w-full">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Mobile menu button and Sidebar trigger */}
        <div className="flex items-center flex-shrink-0 space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="lg:hidden text-gray-700 hover:bg-teal-50 p-2 h-10 w-10"
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <SidebarTrigger className="hidden lg:block text-gray-700" />
        </div>

        {/* Center - User info */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 flex-1 justify-center lg:justify-start lg:ml-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-400 rounded-full flex items-center justify-center">
            <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </div>
          <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none">
            {userRole === "front-desk" ? t.frontDesk : t.manager}: {userName}
          </h1>
        </div>

        {/* Right side - Language toggle only */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLanguage}
            className="text-gray-700 hover:text-gray-900 hover:bg-teal-50 text-xs sm:text-sm"
          >
            <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{language === "en" ? "ქართული" : "English"}</span>
            <span className="sm:hidden">{language === "en" ? "ქ" : "En"}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
