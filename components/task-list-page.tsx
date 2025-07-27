"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { Task } from "@/types/task"
import { Search, Eye, Filter, ClipboardList, AlertTriangle, CheckCircle, Check, X, Clock, User } from "lucide-react"
import DepartmentIcon from "@/components/department-icon"

interface TaskListPageProps {
  tasks: Task[]
  language: "en" | "ka"
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
}

export default function TaskListPage({ tasks, language, onUpdateTask }: TaskListPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"urgency" | "status" | "date">("urgency")
  const [availabilityDialog, setAvailabilityDialog] = useState<string | null>(null)
  const [staffName, setStaffName] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")

  const translations = {
    en: {
      title: "All Tasks",
      search: "Search tasks...",
      filterAll: "All Departments",
      statusAll: "All Status",
      housekeeping: "Housekeeping",
      kitchen: "Kitchen",
      maintenance: "Maintenance",
      sortBy: "Sort by",
      urgency: "Urgency",
      status: "Status",
      date: "Date",
      id: "ID",
      description: "Description",
      department: "Department",
      guestContact: "Guest Contact",
      actions: "Actions",
      viewDetails: "View Details",
      taskDetails: "Task Details",
      createdAt: "Created At",
      delayReason: "Delay Reason",
      pending: "Pending",
      inProgress: "In Progress",
      done: "Done",
      notDone: "Not Done",
      urgent: "Urgent",
      standard: "Standard",
      noTasks: "No tasks found",
      totalTasks: "Total Tasks",
      urgentTasks: "Urgent Tasks",
      completedTasks: "Completed Tasks",
      markAsDone: "Mark as Done",
      markAsNotDone: "Mark as Not Done",
      takeTask: "Take Task",
      staffAvailability: "Staff Availability",
      staffName: "Your Name",
      estimatedTime: "Estimated Time (minutes)",
      submitAvailability: "Submit Availability",
      assignedTo: "Assigned To",
      estimatedTimeLabel: "Estimated Time",
      minutes: "minutes",
      staffNamePlaceholder: "Enter your name",
      estimatedTimePlaceholder: "e.g., 30",
    },
    ka: {
      title: "ყველა დავალება",
      search: "ძებნა...",
      filterAll: "ყველა დეპარტამენტი",
      statusAll: "ყველა სტატუსი",
      housekeeping: "დასუფთავება",
      kitchen: "სამზარეულო",
      maintenance: "ტექნიკური მომსახურება",
      sortBy: "დალაგება",
      urgency: "სისწრაფე",
      status: "სტატუსი",
      date: "თარიღი",
      id: "ID",
      description: "აღწერა",
      department: "დეპარტამენტი",
      guestContact: "სტუმრის კონტაქტი",
      actions: "მოქმედებები",
      viewDetails: "დეტალების ნახვა",
      taskDetails: "დავალების დეტალები",
      createdAt: "შექმნის თარიღი",
      delayReason: "დაგვიანების მიზეზი",
      pending: "მოლოდინში",
      inProgress: "მუშავდება",
      done: "დასრულებული",
      notDone: "არ არის დასრულებული",
      urgent: "გადაუდებელი",
      standard: "სტანდარტული",
      noTasks: "დავალებები არ მოიძებნა",
      totalTasks: "სულ დავალებები",
      urgentTasks: "გადაუდებელი დავალებები",
      completedTasks: "დასრულებული დავალებები",
      markAsDone: "დასრულებულად მონიშვნა",
      markAsNotDone: "არადასრულებულად მონიშვნა",
      takeTask: "დავალების აღება",
      staffAvailability: "თანამშრომლის ხელმისაწვდომობა",
      staffName: "თქვენი სახელი",
      estimatedTime: "სავარაუდო დრო (წუთები)",
      submitAvailability: "ხელმისაწვდომობის გაგზავნა",
      assignedTo: "დანიშნულია",
      estimatedTimeLabel: "სავარაუდო დრო",
      minutes: "წუთი",
      staffNamePlaceholder: "შეიყვანეთ თქვენი სახელი",
      estimatedTimePlaceholder: "მაგ., 30",
    },
  }

  const t = translations[language]

  const getStatusBadge = (status: Task["status"]) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: t.pending },
      "in-progress": { color: "bg-teal-100 text-teal-800 border-teal-200", text: t.inProgress },
      done: { color: "bg-green-100 text-green-800 border-green-200", text: t.done },
      "not-done": { color: "bg-red-100 text-red-800 border-red-200", text: t.notDone },
    }

    const config = statusConfig[status]
    return <Badge className={`${config.color} border font-medium`}>{config.text}</Badge>
  }

  const getUrgencyBadge = (urgency: Task["urgency"]) => {
    return urgency === "urgent" ? (
      <Badge className="bg-red-500 text-white border-red-600 border font-medium animate-pulse">{t.urgent}</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200 border font-medium">{t.standard}</Badge>
    )
  }

  const getDepartmentName = (department: Task["department"]) => {
    const deptNames = {
      housekeeping: t.housekeeping,
      kitchen: t.kitchen,
      maintenance: t.maintenance,
    }
    return deptNames[department]
  }

  const handleMarkAsDone = (taskId: string) => {
    onUpdateTask(taskId, { status: "done" })
  }

  const handleMarkAsNotDone = (taskId: string) => {
    onUpdateTask(taskId, { status: "not-done" })
  }

  const handleTakeTask = (taskId: string) => {
    setAvailabilityDialog(taskId)
    setStaffName("")
    setEstimatedTime("")
  }

  const handleSubmitAvailability = () => {
    if (availabilityDialog && staffName.trim() && estimatedTime.trim()) {
      const timeInMinutes = Number.parseInt(estimatedTime)
      if (!isNaN(timeInMinutes)) {
        onUpdateTask(availabilityDialog, {
          status: "in-progress",
          assignedTo: staffName.trim(),
          estimatedTime: timeInMinutes,
        })
        setAvailabilityDialog(null)
        setStaffName("")
        setEstimatedTime("")
      }
    }
  }

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = filterDepartment === "all" || task.department === filterDepartment
      const matchesStatus = filterStatus === "all" || task.status === filterStatus
      return matchesSearch && matchesDepartment && matchesStatus
    })
    .sort((a, b) => {
      // Always prioritize urgent tasks first
      if (a.urgency === "urgent" && b.urgency !== "urgent") return -1
      if (b.urgency === "urgent" && a.urgency !== "urgent") return 1

      // Then sort by the selected criteria
      switch (sortBy) {
        case "urgency":
          return a.urgency === "urgent" ? -1 : 1
        case "status":
          return a.status.localeCompare(b.status)
        case "date":
        default:
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
    })

  const stats = {
    total: tasks.length,
    urgent: tasks.filter((task) => task.urgency === "urgent").length,
    completed: tasks.filter((task) => task.status === "done").length,
  }

  return (
    <div className="space-y-6 bg-teal-25 min-h-screen p-6 w-[67vw] ml-[1vw] mr-[1vw]">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-2 border-teal-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <ClipboardList className="h-8 w-8 text-teal-500" />
              <div>
                <p className="text-sm text-gray-700 font-medium">{t.totalTasks}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-red-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-700 font-medium">{t.urgentTasks}</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-teal-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-700 font-medium">{t.completedTasks}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Task List */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <Filter className="h-6 w-6" />
            <span>{t.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 bg-white">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-gray-200 focus:border-teal-400 focus:ring-teal-400"
              />
            </div>

            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="h-11 border-gray-200 focus:border-teal-400 focus:ring-teal-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filterAll}</SelectItem>
                <SelectItem value="housekeeping">{t.housekeeping}</SelectItem>
                <SelectItem value="kitchen">{t.kitchen}</SelectItem>
                <SelectItem value="maintenance">{t.maintenance}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-11 border-gray-200 focus:border-teal-400 focus:ring-teal-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.statusAll}</SelectItem>
                <SelectItem value="pending">{t.pending}</SelectItem>
                <SelectItem value="in-progress">{t.inProgress}</SelectItem>
                <SelectItem value="done">{t.done}</SelectItem>
                <SelectItem value="not-done">{t.notDone}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: "urgency" | "status" | "date") => setSortBy(value)}>
              <SelectTrigger className="h-11 border-gray-200 focus:border-teal-400 focus:ring-teal-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgency">{t.urgency}</SelectItem>
                <SelectItem value="status">{t.status}</SelectItem>
                <SelectItem value="date">{t.date}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Task List */}
          {filteredAndSortedTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ClipboardList className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">{t.noTasks}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="text-left p-4 font-semibold text-gray-700">{t.id}</th>
                    <th className="text-left p-4 font-semibold text-gray-700">{t.description}</th>
                    <th className="text-left p-4 font-semibold text-gray-700">{t.department}</th>
                    <th className="text-left p-4 font-semibold text-gray-700">{t.urgency}</th>
                    <th className="text-left p-4 font-semibold text-gray-700">{t.status}</th>
                    <th className="text-left p-4 font-semibold text-gray-700">{t.assignedTo}</th>
                    <th className="text-left p-4 font-semibold text-gray-700">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedTasks.map((task, index) => (
                    <tr
                      key={task.id}
                      className={`border-b hover:bg-teal-50 transition-colors ${
                        task.urgency === "urgent"
                          ? "bg-red-50 border-red-200"
                          : index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 font-mono text-sm text-gray-700">#{task.id}</td>
                      <td className="p-4 max-w-xs">
                        <div className="truncate font-medium text-gray-900">{task.description}</div>
                      </td>
                      <td className="p-4 text-gray-700 flex items-center space-x-2">
                        <DepartmentIcon department={task.department} />
                        <span>{getDepartmentName(task.department)}</span>
                      </td>
                      <td className="p-4">{getUrgencyBadge(task.urgency)}</td>
                      <td className="p-4">{getStatusBadge(task.status)}</td>
                      <td className="p-4 text-sm text-gray-700">
                        {task.assignedTo ? (
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{task.assignedTo}</span>
                            {task.estimatedTime && (
                              <span className="text-gray-500">
                                ({task.estimatedTime} {t.minutes})
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-teal-100 hover:text-teal-700">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle className="text-teal-600">{t.taskDetails}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <strong className="text-gray-700">{t.description}:</strong>
                                  <p className="mt-1 text-gray-900">{task.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong className="text-gray-700">{t.department}:</strong>
                                    <p className="text-gray-900">{getDepartmentName(task.department)}</p>
                                  </div>
                                  <div>
                                    <strong className="text-gray-700">{t.urgency}:</strong>
                                    <div className="mt-1">{getUrgencyBadge(task.urgency)}</div>
                                  </div>
                                </div>
                                <div>
                                  <strong className="text-gray-700">{t.status}:</strong>
                                  <div className="mt-1">{getStatusBadge(task.status)}</div>
                                </div>
                                <div>
                                  <strong className="text-gray-700">{t.guestContact}:</strong>
                                  <p className="text-gray-900">{task.guestContact}</p>
                                </div>
                                {task.assignedTo && (
                                  <div>
                                    <strong className="text-gray-700">{t.assignedTo}:</strong>
                                    <p className="text-gray-900">{task.assignedTo}</p>
                                  </div>
                                )}
                                {task.estimatedTime && (
                                  <div>
                                    <strong className="text-gray-700">{t.estimatedTimeLabel}:</strong>
                                    <p className="text-gray-900">
                                      {task.estimatedTime} {t.minutes}
                                    </p>
                                  </div>
                                )}
                                <div>
                                  <strong className="text-gray-700">{t.createdAt}:</strong>
                                  <p className="text-gray-900">{task.createdAt.toLocaleString()}</p>
                                </div>
                                {task.delayReason && (
                                  <div>
                                    <strong className="text-gray-700">{t.delayReason}:</strong>
                                    <p className="text-red-600 font-medium">{task.delayReason}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          {task.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTakeTask(task.id)}
                              className="hover:bg-teal-100 hover:text-teal-700"
                              title={t.takeTask}
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                          )}

                          {task.status === "in-progress" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsDone(task.id)}
                                className="hover:bg-green-100 hover:text-green-700"
                                title={t.markAsDone}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsNotDone(task.id)}
                                className="hover:bg-red-100 hover:text-red-700"
                                title={t.markAsNotDone}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Staff Availability Dialog */}
      <Dialog open={!!availabilityDialog} onOpenChange={() => setAvailabilityDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-teal-600 flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{t.staffAvailability}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="staffName">{t.staffName}</Label>
              <Input
                id="staffName"
                placeholder={t.staffNamePlaceholder}
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                className="border-gray-300 focus:border-teal-400 focus:ring-teal-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedTime">{t.estimatedTime}</Label>
              <Input
                id="estimatedTime"
                type="number"
                placeholder={t.estimatedTimePlaceholder}
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                className="border-gray-300 focus:border-teal-400 focus:ring-teal-400"
              />
            </div>
            <Button
              onClick={handleSubmitAvailability}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white"
              disabled={!staffName.trim() || !estimatedTime.trim()}
            >
              <User className="h-4 w-4 mr-2" />
              {t.submitAvailability}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
