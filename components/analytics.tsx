"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/types/task"
import { BarChart3, PieChart, TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react"

interface AnalyticsProps {
  tasks: Task[]
  language: "en" | "ka"
}

export default function Analytics({ tasks, language }: AnalyticsProps) {
  const translations = {
    en: {
      title: "Analytics Dashboard",
      totalTasks: "Total Tasks",
      avgCompletionTime: "Avg Completion Time",
      urgentTasks: "Urgent Tasks",
      completionRate: "Completion Rate",
      tasksByStatus: "Tasks by Status",
      tasksByDepartment: "Tasks by Department",
      delayReasons: "Delay Reasons",
      pending: "Pending",
      inProgress: "In Progress",
      done: "Done",
      notDone: "Not Done",
      housekeeping: "Housekeeping",
      kitchen: "Kitchen",
      maintenance: "Maintenance",
      hours: "hours",
    },
    ka: {
      title: "ანალიტიკის დაშბორდი",
      totalTasks: "სულ დავალებები",
      avgCompletionTime: "საშუალო დასრულების დრო",
      urgentTasks: "გადაუდებელი დავალებები",
      completionRate: "დასრულების მაჩვენებელი",
      tasksByStatus: "დავალებები სტატუსის მიხედვით",
      tasksByDepartment: "დავალებები დეპარტამენტის მიხედვით",
      delayReasons: "დაგვიანების მიზეზები",
      pending: "მოლოდინში",
      inProgress: "მუშავდება",
      done: "დასრულებული",
      notDone: "არ არის დასრულებული",
      housekeeping: "დასუფთავება",
      kitchen: "სამზარეულო",
      maintenance: "ტექნიკური მომსახურება",
      hours: "საათი",
    },
  }

  const t = translations[language]

  const analytics = useMemo(() => {
    const totalTasks = tasks.length
    const urgentTasks = tasks.filter((task) => task.urgency === "urgent").length
    const completedTasks = tasks.filter((task) => task.status === "done").length
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    // Status distribution
    const statusCounts = {
      pending: tasks.filter((task) => task.status === "pending").length,
      "in-progress": tasks.filter((task) => task.status === "in-progress").length,
      done: tasks.filter((task) => task.status === "done").length,
      "not-done": tasks.filter((task) => task.status === "not-done").length,
    }

    // Department distribution
    const departmentCounts = {
      housekeeping: tasks.filter((task) => task.department === "housekeeping").length,
      kitchen: tasks.filter((task) => task.department === "kitchen").length,
      maintenance: tasks.filter((task) => task.department === "maintenance").length,
    }

    // Delay reasons
    const delayReasons = tasks
      .filter((task) => task.delayReason)
      .reduce(
        (acc, task) => {
          const reason = task.delayReason!
          acc[reason] = (acc[reason] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

    return {
      totalTasks,
      urgentTasks,
      completionRate,
      avgCompletionTime: "2.5", // Mock data
      statusCounts,
      departmentCounts,
      delayReasons,
    }
  }, [tasks])

  const StatusChart = () => {
    const statusData = [
      { name: t.pending, value: analytics.statusCounts.pending, color: "bg-yellow-500" },
      { name: t.inProgress, value: analytics.statusCounts["in-progress"], color: "bg-teal-500" },
      { name: t.done, value: analytics.statusCounts.done, color: "bg-green-500" },
      { name: t.notDone, value: analytics.statusCounts["not-done"], color: "bg-red-500" },
    ]

    const total = statusData.reduce((sum, item) => sum + item.value, 0)

    return (
      <div className="space-y-4">
        {statusData.map((item) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0
          return (
            <div key={item.name} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${item.color}`}></div>
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-gray-600">
                    {item.value} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const DepartmentChart = () => {
    const deptData = [
      { name: t.housekeeping, value: analytics.departmentCounts.housekeeping, color: "bg-purple-500" },
      { name: t.kitchen, value: analytics.departmentCounts.kitchen, color: "bg-orange-500" },
      { name: t.maintenance, value: analytics.departmentCounts.maintenance, color: "bg-teal-500" },
    ]

    const maxValue = Math.max(...deptData.map((item) => item.value))

    return (
      <div className="space-y-4">
        {deptData.map((item) => {
          const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0
          return (
            <div key={item.name} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${item.color}`}></div>
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-gray-600">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-teal-25 min-h-screen p-6 w-[67vw] ml-[1vw] mr-[1vw]">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <BarChart3 className="h-6 w-6" />
            <span>{t.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6 bg-white">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white border-2 border-teal-200 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-teal-500" />
                  <div>
                    <p className="text-sm text-gray-700 font-medium">{t.totalTasks}</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalTasks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-green-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t.completionRate}</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.completionRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-red-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t.urgentTasks}</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.urgentTasks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t.avgCompletionTime}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analytics.avgCompletionTime} {t.hours}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-teal-200 bg-white shadow-lg">
              <CardHeader className="bg-teal-50 border-b border-teal-200">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <PieChart className="h-5 w-5 text-teal-500" />
                  <span>{t.tasksByStatus}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white p-4">
                <StatusChart />
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <BarChart3 className="h-5 w-5 text-teal-500" />
                  <span>{t.tasksByDepartment}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <DepartmentChart />
              </CardContent>
            </Card>
          </div>

          {/* Delay Reasons */}
          {Object.keys(analytics.delayReasons).length > 0 && (
            <Card className="border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-gray-800 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span>{t.delayReasons}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="space-y-2">
                  {Object.entries(analytics.delayReasons).map(([reason, count]) => (
                    <div
                      key={reason}
                      className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <span className="text-red-800 font-medium">{reason}</span>
                      <span className="font-bold text-red-900 bg-red-100 px-2 py-1 rounded">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
