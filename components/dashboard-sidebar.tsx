"use client"

import { LayoutDashboard, Plus, ClipboardList, LogOut, Bot } from "lucide-react"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

interface DashboardSidebarProps {
  language: "en" | "ka"
  onLogout: () => void
  currentPage: "dashboard" | "create-task" | "view-tasks"
  onPageChange: (page: "dashboard" | "create-task" | "view-tasks") => void
  userRole: "front-desk" | "manager"
}

export default function DashboardSidebar({
  language,
  onLogout,
  currentPage,
  onPageChange,
  userRole,
}: DashboardSidebarProps) {
  const [aiModelEnabled, setAiModelEnabled] = useState(false)

  const translations = {
    en: {
      hostiTask: "HostiTask",
      dashboard: "Dashboard",
      createTask: "Create Task",
      viewTasks: "View Tasks",
      logout: "Logout",
      aiModel: "AI Assistant",
    },
    ka: {
      hostiTask: "HostiTask",
      dashboard: "დაშბორდი",
      createTask: "დავალების შექმნა",
      viewTasks: "დავალებების ნახვა",
      logout: "გასვლა",
      aiModel: "AI ასისტენტი",
    },
  }

  const t = translations[language]

  const toggleAiModel = () => {
    setAiModelEnabled(!aiModelEnabled)
  }

  return (
    <Sidebar className="bg-teal-50 text-gray-900 border-r-2 border-teal-200" style={{ width: "30vw" }}>
      <SidebarHeader className="p-6 bg-teal-100 border-b-2 border-teal-200">
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="HostiTask Logo" className="w-10 h-10 rounded-lg" />
          <h2 className="text-xl font-bold text-gray-900">{t.hostiTask}</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-teal-50">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {userRole === "manager" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => onPageChange("dashboard")}
                    className={`text-gray-900 hover:bg-teal-100 transition-colors ${
                      currentPage === "dashboard" ? "bg-teal-100 font-semibold" : ""
                    }`}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>{t.dashboard}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onPageChange("create-task")}
                  className={`text-gray-900 hover:bg-teal-100 transition-colors ${
                    currentPage === "create-task" ? "bg-teal-100 font-semibold" : ""
                  }`}
                >
                  <Plus className="h-5 w-5" />
                  <span>{t.createTask}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onPageChange("view-tasks")}
                  className={`text-gray-900 hover:bg-teal-100 transition-colors ${
                    currentPage === "view-tasks" ? "bg-teal-100 font-semibold" : ""
                  }`}
                >
                  <ClipboardList className="h-5 w-5" />
                  <span>{t.viewTasks}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* AI Model Toggle */}
              <SidebarMenuItem className="mt-6">
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-teal-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-gray-900" />
                    <span className="text-gray-900 text-sm font-medium">{t.aiModel}</span>
                  </div>
                  <button
                    onClick={toggleAiModel}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                      aiModelEnabled ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        aiModelEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </SidebarMenuItem>

              <SidebarMenuItem className="mt-8">
                <SidebarMenuButton onClick={onLogout} className="text-gray-900 hover:bg-red-100 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>{t.logout}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
