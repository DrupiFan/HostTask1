"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import TaskCreationPage from "@/components/task-creation-page"
import TaskListPage from "@/components/task-list-page"
import Analytics from "@/components/analytics"
import QuickChat from "@/components/quick-chat"
import type { Task } from "@/types/task"

interface DashboardProps {
  userRole: "front-desk" | "manager"
  userName: string
  onLogout: () => void
}

// Sample data
const sampleTasks: Task[] = [
  {
    id: "1",
    description: "Room 101 needs cleaning",
    department: "housekeeping",
    urgency: "urgent",
    status: "pending",
    guestContact: "guest101@hotel.com",
    createdAt: new Date("2024-01-15T10:00:00"),
    delayReason: null,
    assignedTo: null,
    estimatedTime: null,
  },
  {
    id: "2",
    description: "Kitchen equipment maintenance",
    department: "maintenance",
    urgency: "standard",
    status: "in-progress",
    guestContact: "+995555123456",
    createdAt: new Date("2024-01-15T09:30:00"),
    delayReason: null,
    assignedTo: "John Smith",
    estimatedTime: 120,
  },
  {
    id: "3",
    description: "Room service for Room 205",
    department: "kitchen",
    urgency: "urgent",
    status: "done",
    guestContact: "guest205@hotel.com",
    createdAt: new Date("2024-01-15T08:00:00"),
    delayReason: null,
    assignedTo: "Maria Garcia",
    estimatedTime: 30,
  },
  {
    id: "4",
    description: "Air conditioning repair Room 303",
    department: "maintenance",
    urgency: "urgent",
    status: "not-done",
    guestContact: "+995555789012",
    createdAt: new Date("2024-01-14T16:00:00"),
    delayReason: "Lack of supplies",
    assignedTo: "Mike Johnson",
    estimatedTime: 180,
  },
  {
    id: "5",
    description: "Extra towels for Room 150",
    department: "housekeeping",
    urgency: "standard",
    status: "done",
    guestContact: "guest150@hotel.com",
    createdAt: new Date("2024-01-14T14:00:00"),
    delayReason: null,
    assignedTo: "Sarah Wilson",
    estimatedTime: 15,
  },
]

export default function Dashboard({ userRole, userName, onLogout }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks)
  const [language, setLanguage] = useState<"en" | "ka">("en")
  const [currentPage, setCurrentPage] = useState<"dashboard" | "create-task" | "view-tasks">("create-task")
  const [taskCounter, setTaskCounter] = useState(sampleTasks.length)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const addTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const newTaskCounter = taskCounter + 1
    const task: Task = {
      ...newTask,
      id: newTaskCounter.toString(),
      createdAt: new Date(),
    }
    // Add new tasks to the end of the list, not the beginning
    setTasks([...tasks, task])
    setTaskCounter(newTaskCounter)
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ka" : "en")
  }

  const handlePageChange = (page: "dashboard" | "create-task" | "view-tasks") => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false) // Close mobile menu when page changes
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "create-task":
        return <TaskCreationPage language={language} onAddTask={addTask} />
      case "view-tasks":
        return <TaskListPage tasks={tasks} language={language} onUpdateTask={updateTask} />
      case "dashboard":
      default:
        return userRole === "manager" ? (
          <Analytics tasks={tasks} language={language} />
        ) : (
          <div className="flex items-center justify-center text-center p-6 sm:p-12 bg-white rounded-lg shadow-lg max-w-2xl border-2 border-teal-200 min-h-[60vh] flex-col gap-y-4 mx-auto my-8 sm:my-20 animate-slideInUp">
            <div className="mb-6">
              <img src="/images/logo.png" alt="HostiTask Logo" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              {language === "en" ? "Welcome to HostiTask" : "კეთილი იყოს თქვენი მობრძანება HostiTask-ში"}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 px-4">
              {language === "en"
                ? "Use the sidebar to navigate to create tasks or view existing tasks."
                : "გამოიყენეთ გვერდითი პანელი დავალებების შესაქმნელად ან არსებული დავალებების სანახავად."}
            </p>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-teal-25 w-full overflow-hidden">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - hidden on mobile, visible on desktop */}
        <div className={`fixed lg:relative lg:block lg:w-80 xl:w-96 flex-shrink-0 z-50 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <DashboardSidebar
            language={language}
            onLogout={onLogout}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            userRole={userRole}
          />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader
            userRole={userRole}
            userName={userName}
            language={language}
            onToggleLanguage={toggleLanguage}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          <main className="flex-1 bg-teal-25 overflow-auto animate-fadeIn relative">
            {renderCurrentPage()}
            <QuickChat language={language} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
