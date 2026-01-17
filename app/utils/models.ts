// Type definition for navigation items with lucide icons
export interface NavItem {
    icon: string;
    label: string;
    active?: boolean;
    badge?: number;
  }

export interface Task {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  assignee?: {
      name: string
      avatar: string
  }
  dueDate?: string
  tags?: string[]
}

export interface Column {
    id: string
    title: string
    tasks: Task[]
}


export interface Stat {
  label: string
  value: string
  change: string
  trend: "up" | "down"
  icon: string
}

export interface Activity {
  id: string
  user: string
  action: string
  target: string
  time: string
}