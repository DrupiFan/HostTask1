"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Task } from "@/types/task"
import { Search, Eye, Filter } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
  language: "en" | "ka"
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void
}

export default function TaskList({ tasks, language, onUpdateTask }: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"urgency" | "status" | "date">("date")

  const translations = {
    en: {
      title: "Task List",
      search: "Search tasks...",
      filterAll: "All Departments",
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
    },
    ka: {
      title: "დავალებების სია",
      search: "ძებნა...",
      filterAll: "ყველა დეპარტამენტი",
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
    },
  }

  const t = translations[language]

  const getStatusBadge = (status: Task["status"]) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: t.pending },
      "in-progress": { color: "bg-blue-100 text-blue-800", text: t.inProgress },
      done: { color: "bg-green-100 text-green-800", text: t.done },
      "not-done": { color: "bg-red-100 text-red-800", text: t.notDone },
    }

    const config = statusConfig[status]
    return <Badge className={config.color}>{config.text}</Badge>
  }

  const getUrgencyBadge = (urgency: Task["urgency"]) => {
    return urgency === "urgent" ? (
      <Badge className="bg-red-100 text-red-800">{t.urgent}</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">{t.standard}</Badge>
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

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = filterDepartment === "all" || task.department === filterDepartment
      return matchesSearch && matchesDepartment
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "urgency":
          return a.urgency === "urgent" ? -1 : 1
        case "status":
          return a.status.localeCompare(b.status)
        case "date":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <span>{t.title}</span>
        </CardTitle>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filterAll}</SelectItem>
              <SelectItem value="housekeeping">{t.housekeeping}</SelectItem>
              <SelectItem value="kitchen">{t.kitchen}</SelectItem>
              <SelectItem value="maintenance">{t.maintenance}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: "urgency" | "status" | "date") => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">{t.date}</SelectItem>
              <SelectItem value="urgency">{t.urgency}</SelectItem>
              <SelectItem value="status">{t.status}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">{t.noTasks}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">{t.id}</th>
                  <th className="text-left p-2 font-semibold">{t.description}</th>
                  <th className="text-left p-2 font-semibold">{t.department}</th>
                  <th className="text-left p-2 font-semibold">{t.urgency}</th>
                  <th className="text-left p-2 font-semibold">{t.status}</th>
                  <th className="text-left p-2 font-semibold">{t.guestContact}</th>
                  <th className="text-left p-2 font-semibold">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-2 font-mono text-sm">#{task.id}</td>
                    <td className="p-2 max-w-xs truncate">{task.description}</td>
                    <td className="p-2">{getDepartmentName(task.department)}</td>
                    <td className="p-2">{getUrgencyBadge(task.urgency)}</td>
                    <td className="p-2">{getStatusBadge(task.status)}</td>
                    <td className="p-2 text-sm">{task.guestContact}</td>
                    <td className="p-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t.taskDetails}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <strong>{t.description}:</strong>
                              <p className="mt-1">{task.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <strong>{t.department}:</strong>
                                <p>{getDepartmentName(task.department)}</p>
                              </div>
                              <div>
                                <strong>{t.urgency}:</strong>
                                <p>{task.urgency === "urgent" ? t.urgent : t.standard}</p>
                              </div>
                            </div>
                            <div>
                              <strong>{t.status}:</strong>
                              <div className="mt-1">{getStatusBadge(task.status)}</div>
                            </div>
                            <div>
                              <strong>{t.guestContact}:</strong>
                              <p>{task.guestContact}</p>
                            </div>
                            <div>
                              <strong>{t.createdAt}:</strong>
                              <p>{task.createdAt.toLocaleString()}</p>
                            </div>
                            {task.delayReason && (
                              <div>
                                <strong>{t.delayReason}:</strong>
                                <p className="text-red-600">{task.delayReason}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
