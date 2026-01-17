
export async function fetchTasks(): Promise<Column[]> {
// Simulating network delay
await new Promise((resolve) => setTimeout(resolve, 1500))

return [
    {
    id: "todo",
    title: "To Do",
    tasks: [
        {
        id: "1",
        title: "Design system documentation",
        description: "Create comprehensive docs for the design system components",
        priority: "high",
        assignee: { name: "Alex Chen", avatar: "AC" },
        dueDate: "Jan 20",
        tags: ["Design", "Docs"],
        },
        {
        id: "2",
        title: "API integration tests",
        description: "Write unit tests for the new API endpoints",
        priority: "medium",
        assignee: { name: "Sarah Kim", avatar: "SK" },
        dueDate: "Jan 22",
        tags: ["Testing"],
        },
        {
        id: "3",
        title: "User onboarding flow",
        priority: "low",
        dueDate: "Jan 25",
        tags: ["UX"],
        },
    ],
    },
    {
    id: "in-progress",
    title: "In Progress",
    tasks: [
        {
        id: "4",
        title: "Dashboard analytics",
        description: "Implement real-time analytics dashboard with charts",
        priority: "high",
        assignee: { name: "Mike Ross", avatar: "MR" },
        dueDate: "Jan 18",
        tags: ["Feature", "Analytics"],
        },
        {
        id: "5",
        title: "Mobile responsiveness",
        priority: "medium",
        assignee: { name: "Alex Chen", avatar: "AC" },
        tags: ["Mobile"],
        },
    ],
    },
    {
    id: "review",
    title: "In Review",
    tasks: [
        {
        id: "6",
        title: "Authentication refactor",
        description: "Migrate to new auth provider with improved security",
        priority: "high",
        assignee: { name: "Sarah Kim", avatar: "SK" },
        dueDate: "Jan 17",
        tags: ["Security", "Backend"],
        },
    ],
    },
    {
    id: "done",
    title: "Completed",
    tasks: [
        {
        id: "7",
        title: "Landing page redesign",
        priority: "medium",
        assignee: { name: "Mike Ross", avatar: "MR" },
        tags: ["Design"],
        },
        {
        id: "8",
        title: "Performance optimization",
        priority: "low",
        tags: ["Performance"],
        },
    ],
    },
]
}