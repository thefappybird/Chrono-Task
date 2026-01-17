export async function fetchStats(): Promise<Stat[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [
      { label: "Total Tasks", value: "128", change: "+12%", trend: "up", icon: "material-symbols:check-circle-outline-rounded" },
      { label: "In Progress", value: "24", change: "+8%", trend: "up", icon: "mdi:clock-outline" },
      { label: "Completed", value: "89", change: "+23%", trend: "up", icon: "fluent:data-trending-16-regular" },
      { label: "Overdue", value: "5", change: "-15%", trend: "down", icon: "cuida:alert-outline" },
    ]
  }
  
export async function fetchActivity(): Promise<Activity[]> {
await new Promise((resolve) => setTimeout(resolve, 1200))
return [
    { id: "1", user: "Alex Chen", action: "completed", target: "Landing page redesign", time: "2m ago" },
    { id: "2", user: "Sarah Kim", action: "commented on", target: "API integration", time: "15m ago" },
    { id: "3", user: "Mike Ross", action: "created", target: "Dashboard analytics", time: "1h ago" },
    { id: "4", user: "You", action: "moved", target: "Auth refactor to Review", time: "2h ago" },
]
}