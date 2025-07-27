import { Home, ChefHat, Wrench } from "lucide-react"

interface DepartmentIconProps {
  department: "housekeeping" | "kitchen" | "maintenance"
  className?: string
}

export default function DepartmentIcon({ department, className = "h-4 w-4" }: DepartmentIconProps) {
  const icons = {
    housekeeping: Home,
    kitchen: ChefHat,
    maintenance: Wrench,
  }

  const Icon = icons[department]
  return <Icon className={className} />
}
