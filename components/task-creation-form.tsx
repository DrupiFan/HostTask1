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
import { Plus } from "lucide-react"

interface TaskCreationFormProps {
  language: "en" | "ka"
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void
}

export default function TaskCreationForm({ language, onAddTask }: TaskCreationFormProps) {
  const [description, setDescription] = useState("")
  const [department, setDepartment] = useState<"housekeeping" | "kitchen" | "maintenance">("housekeeping")
  const [urgency, setUrgency] = useState<"urgent" | "standard">("standard")
  const [guestContact, setGuestContact] = useState("")

  const translations = {
    en: {
      title: "Create New Task",
      description: "Task Description",
      descriptionPlaceholder: "Describe the guest request...",
      department: "Department",
      housekeeping: "Housekeeping",
      kitchen: "Kitchen",
      maintenance: "Maintenance",
      urgency: "Urgency",
      urgent: "Urgent",
      standard: "Standard",
      guestContact: "Guest Contact",
      guestContactPlaceholder: "Phone or email",
      submit: "Submit Task",
    },
    ka: {
      title: "ახალი დავალების შექმნა",
      description: "დავალების აღწერა",
      descriptionPlaceholder: "აღწერეთ სტუმრის მოთხოვნა...",
      department: "დეპარტამენტი",
      housekeeping: "დასუფთავება",
      kitchen: "სამზარეულო",
      maintenance: "ტექნიკური მომსახურება",
      urgency: "სისწრაფე",
      urgent: "გადაუდებელი",
      standard: "სტანდარტული",
      guestContact: "სტუმრის კონტაქტი",
      guestContactPlaceholder: "ტელეფონი ან ელ-ფოსტა",
      submit: "დავალების გაგზავნა",
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
      })

      // Reset form
      setDescription("")
      setGuestContact("")
      setDepartment("housekeeping")
      setUrgency("standard")
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5 text-blue-600" />
          <span>{t.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">{t.description}</Label>
            <Textarea
              id="description"
              placeholder={t.descriptionPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.department}</Label>
              <Select
                value={department}
                onValueChange={(value: "housekeeping" | "kitchen" | "maintenance") => setDepartment(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housekeeping">{t.housekeeping}</SelectItem>
                  <SelectItem value="kitchen">{t.kitchen}</SelectItem>
                  <SelectItem value="maintenance">{t.maintenance}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t.urgency}</Label>
              <Select value={urgency} onValueChange={(value: "urgent" | "standard") => setUrgency(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">{t.urgent}</SelectItem>
                  <SelectItem value="standard">{t.standard}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestContact">{t.guestContact}</Label>
            <Input
              id="guestContact"
              placeholder={t.guestContactPlaceholder}
              value={guestContact}
              onChange={(e) => setGuestContact(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            {t.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
