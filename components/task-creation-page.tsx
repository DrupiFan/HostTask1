"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/types/task"
import { Plus, FileText, Building, AlertCircle, Phone, Home, ChefHat, Wrench } from "lucide-react"

interface TaskCreationPageProps {
  language: "en" | "ka"
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void
}

export default function TaskCreationPage({ language, onAddTask }: TaskCreationPageProps) {
  const [description, setDescription] = useState("")
  const [department, setDepartment] = useState<"housekeeping" | "kitchen" | "maintenance">("housekeeping")
  const [urgency, setUrgency] = useState<"urgent" | "standard">("standard")
  const [guestContact, setGuestContact] = useState("")
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  const translations = {
    en: {
      title: "Create New Task",
      description: "Task Description",
      descriptionPlaceholder: "Describe the guest request in detail...",
      department: "Department",
      housekeeping: "Housekeeping",
      kitchen: "Kitchen",
      maintenance: "Maintenance",
      urgency: "Urgency Level",
      urgent: "Urgent",
      standard: "Standard",
      guestContact: "Guest Contact Information",
      guestContactPlaceholder: "Phone number or email address",
      submit: "Create Task",
      success: "Task Created Successfully!",
      guestNotification: "Guest Notification",
      notificationMessage:
        "Your request has been received and will be processed shortly. We will contact you at the provided information once completed.",
      sendNotification: "Send Notification",
      taskCreated: "Task has been created and assigned to the appropriate department.",
    },
    ka: {
      title: "ახალი დავალების შექმნა",
      description: "დავალების აღწერა",
      descriptionPlaceholder: "დეტალურად აღწერეთ სტუმრის მოთხოვნა...",
      department: "დეპარტამენტი",
      housekeeping: "დასუფთავება",
      kitchen: "სამზარეულო",
      maintenance: "ტექნიკური მომსახურება",
      urgency: "სისწრაფის დონე",
      urgent: "გადაუდებელი",
      standard: "სტანდარტული",
      guestContact: "სტუმრის საკონტაქტო ინფორმაცია",
      guestContactPlaceholder: "ტელეფონის ნომერი ან ელ-ფოსტის მისამართი",
      submit: "დავალების შექმნა",
      success: "დავალება წარმატებით შეიქმნა!",
      guestNotification: "სტუმრის შეტყობინება",
      notificationMessage:
        "თქვენი მოთხოვნა მიღებულია და მალე დამუშავდება. დასრულების შემდეგ დაგიკავშირდებით მითითებულ საკონტაქტო ინფორმაციაზე.",
      sendNotification: "შეტყობინების გაგზავნა",
      taskCreated: "დავალება შეიქმნა და გადაეცა შესაბამის დეპარტამენტს.",
    },
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description.trim() && guestContact.trim()) {
      onAddTask({
        description: description.trim(),
        department,
        urgency,
        guestContact: guestContact.trim(),
        status: "pending",
        delayReason: null,
        assignedTo: null,
        estimatedTime: null,
      })

      // Generate notification message
      const timeEstimate = department === "housekeeping" ? "2 PM" : department === "kitchen" ? "30 minutes" : "1 hour"
      setNotificationMessage(
        `${department === "housekeeping" ? "Cleaning" : department === "kitchen" ? "Room service" : "Maintenance"} scheduled for ${timeEstimate}`,
      )

      // Reset form
      setDescription("")
      setGuestContact("")
      setDepartment("housekeeping")
      setUrgency("standard")

      // Show notification modal
      setShowNotificationModal(true)
    }
  }

  const handleSendNotification = () => {
    // Simulate API call to send notification
    console.log("Sending notification:", notificationMessage)
    setShowNotificationModal(false)
  }

  return (
    <div className="w-[67vw] ml-[1vw] mr-[1vw] h-full bg-teal-25 flex items-center justify-center p-6">
      <div className="w-full h-full flex items-center justify-center">
        <Card className="shadow-lg border-0 bg-white w-full max-w-4xl">
          <CardHeader className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center space-x-3 text-xl">
              <Plus className="h-6 w-6" />
              <span>{t.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="description"
                  className="text-gray-900 font-semibold text-base flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>{t.description}</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder={t.descriptionPlaceholder}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="min-h-[120px] border-gray-300 focus:border-teal-400 focus:ring-teal-400 text-base bg-white text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-900 font-semibold text-base flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>{t.department}</span>
                  </Label>
                  <Select
                    value={department}
                    onValueChange={(value: "housekeeping" | "kitchen" | "maintenance") => setDepartment(value)}
                  >
                    <SelectTrigger className="h-12 border-gray-300 focus:border-teal-400 focus:ring-teal-400 bg-white text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="housekeeping" className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <Home className="h-4 w-4" />
                          <span>{t.housekeeping}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="kitchen" className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <ChefHat className="h-4 w-4" />
                          <span>{t.kitchen}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="maintenance" className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <Wrench className="h-4 w-4" />
                          <span>{t.maintenance}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-900 font-semibold text-base flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{t.urgency}</span>
                  </Label>
                  <Select value={urgency} onValueChange={(value: "urgent" | "standard") => setUrgency(value)}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-teal-400 focus:ring-teal-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">{t.urgent}</SelectItem>
                      <SelectItem value="standard">{t.standard}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="guestContact"
                  className="text-gray-900 font-semibold text-base flex items-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>{t.guestContact}</span>
                </Label>
                <Input
                  id="guestContact"
                  placeholder={t.guestContactPlaceholder}
                  value={guestContact}
                  onChange={(e) => setGuestContact(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-teal-400 focus:ring-teal-400 text-base bg-white text-gray-900"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-teal-500 hover:bg-teal-600 text-white text-lg font-semibold rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                {t.submit}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
