"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Globe, User } from "lucide-react"

interface DashboardHeaderProps {
  userRole: "front-desk" | "manager"
  userName: string
  language: "en" | "ka"
  onToggleLanguage: () => void
}

export default function DashboardHeader({ userRole, userName, language, onToggleLanguage }: DashboardHeaderProps) {
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
    <header className="bg-white border-b-2 border-teal-200 px-4 py-4 shadow-sm w-[67vw] ml-[1vw] mr-[1vw]">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Sidebar trigger */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger className="lg:hidden text-gray-700" />
        </div>

        {/* Center - User info */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            {userRole === "front-desk" ? t.frontDesk : t.manager}: {userName}
          </h1>
        </div>

        {/* Right side - Language toggle only */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLanguage}
            className="text-gray-700 hover:text-gray-900 hover:bg-teal-50"
          >
            <Globe className="h-4 w-4 mr-2" />
            {language === "en" ? "ქართული" : "English"}
          </Button>
        </div>
      </div>
    </header>
  )
}
