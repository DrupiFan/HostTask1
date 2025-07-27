export interface Task {
  id: string
  description: string
  department: "housekeeping" | "kitchen" | "maintenance"
  urgency: "urgent" | "standard"
  status: "pending" | "in-progress" | "done" | "not-done"
  guestContact: string
  createdAt: Date
  delayReason: string | null
  assignedTo: string | null
  estimatedTime: number | null // in minutes
}
