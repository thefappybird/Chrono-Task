<div align="center">

# ChronoTask

**A real-time collaborative task management application demonstrating modern frontend engineering practices**

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SASS/SCSS](https://img.shields.io/badge/SASS-1.97-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Vitest](https://img.shields.io/badge/Vitest-1.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-2-FFC029?style=for-the-badge&logo=pinia&logoColor=white)](https://pinia.vuejs.org/)

[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-14b8a6?style=flat-square)](CONTRIBUTING.md)

</div>

---

## 📋 Overview

ChronoTask is a **real-time collaborative task management application** built from scratch to demonstrate advanced frontend engineering practices. It showcases:

- **Drag-and-drop task management** across multiple view types (Kanban board, list, calendar)
- **Optimistic UI updates** with conflict resolution for collaborative editing
- **Real-time simulation** of concurrent user activity
- **Performance optimization** with virtual scrolling and memoization
- **Custom components** built from scratch without UI frameworks
- **Type-safe** TypeScript implementation with comprehensive testing

This portfolio project implements all core requirements with production-quality code standards, focusing on UX excellence and technical depth.

---

## ✨ Core Features

### 1. **Task Management**

- ✅ Create, read, update, and delete tasks
- ✅ Task properties: title, description, priority (low/medium/high), status, assigned user, tags
- ✅ Drag-and-drop reordering within and between columns
- ✅ Drag-and-drop date reassignment in calendar view
- ✅ Filter tasks by priority, assignee, or search term (with normalization)

### 2. **Multiple View Modes**

- 🎯 **Board View** — Kanban columns grouped by status (Todo, In Progress, Done)
- 📋 **List View** — Horizontal scrolling list layout with full columns visible
- 📅 **Calendar View** — Date-grouped columns with drag-drop date reassignment
- All views sync in real-time with dynamic filtering support

### 3. **State Management**

- 🎭 **Pinia stores** for modal and view state management
- 💾 **LocalStorage integration** with reactive synchronization
- ⚡ **Optimistic updates** — UI updates before server confirmation
- 🔄 **Automatic rollback** on operation failure
- 📊 **Activity logging** for user actions and timestamps

### 4. **Real-Time Collaboration Simulation**

- 👥 **Multi-user editing** simulation with 30% chance of concurrent edits
- 🚨 **Conflict detection** and blocking during edit conflicts
- 🔔 **Toast notifications** for task changes by other users
- ⏱️ **Activity tracking** with timestamped user actions
- 📝 **Simulated delays** (400ms) with retry logic (5 retries, 20% failure rate)

### 5. **Performance Optimization**

- 🚀 **Virtual scrolling** for 1000+ task items using VirtualScroller
- 📦 **Lazy task loading** with skeleton UI placeholders
- 🎬 **Shimmer animations** during data loading
- 💭 **Memoization** of expensive computations (v-memo)
- ⏱️ **Debounced search** for responsive filtering

### 6. **Advanced Vue Concepts**

- 🎯 **Custom directives** — Auto-focus and focus-trap for modals
- 🧩 **Composables** — Reusable logic (useCrud, useColumns, useLocalStorage, useActivity, etc.)
- 📡 **Provide/Inject** — Cross-component loading state communication
- 🔀 **Dynamic components** — Conditional rendering of board/list/calendar views
- 🎨 **Composition API** — Modern Vue 3 setup syntax throughout

### 7. **Accessibility & UX**

- ♿ **ARIA labels** on interactive elements
- ⌨️ **Keyboard navigation** support
- 🎨 **Dark mode** by default with cohesive design system
- 📱 **Responsive design** (mobile, tablet, desktop)
- ✅ **Loading states** with skeleton loaders and fallback UI

---

## 🏗️ Project Structure

```
Chrono-Task/
├── app/
│   ├── components/
│   │   ├── ActionButtons.vue              # View toggle & filter controls
│   │   ├── TheStats.vue & TheStatsSkeleton.vue
│   │   ├── globals/                       # Reusable UI components
│   │   │   ├── TheHeader.vue              # App header with branding
│   │   │   ├── TheToast.vue               # Toast notification system
│   │   │   ├── TheFallback.vue            # Error fallback UI
│   │   │   ├── PillBadge.vue              # Badge component
│   │   │   └── SideTitle.vue              # Section titles
│   │   ├── modal/                         # Modal components
│   │   │   ├── ModalEditCreate.vue        # Create/edit task modal
│   │   │   ├── ModalDelete.vue            # Delete confirmation
│   │   │   ├── FormField.vue              # Reusable form fields
│   │   │   ├── SelectField.vue            # Dropdown selects
│   │   │   ├── TagField.vue               # Tag input component
│   │   │   └── FormBtn.vue                # Styled form buttons
│   │   ├── tasks/
│   │   │   ├── TaskCardExpanded.vue       # Expandable task card
│   │   │   ├── FilterTasks.vue            # Filter UI component
│   │   │   ├── VirtualTaskCards.vue       # Virtual scroller wrapper
│   │   │   ├── ActionBtn.vue              # Action button component
│   │   │   ├── board/
│   │   │   │   ├── DashView.vue           # Kanban board layout
│   │   │   │   └── TaskColumn.vue         # Single column with drop zone
│   │   │   ├── list/
│   │   │   │   └── ListView.vue           # Horizontal list view
│   │   │   └── calendar/
│   │   │       └── CalendarView.vue       # Date-grouped calendar view
│   │   └── skeletons/                     # Skeleton loaders for each view
│   ├── composables/
│   │   ├── useCrud.ts                     # Task CRUD operations with optimistic updates
│   │   ├── useColumns.ts                  # Column organization & drag-drop logic
│   │   ├── useActivity.ts                 # User activity logging & simulation
│   │   ├── useTask.ts                     # Individual task operations
│   │   ├── useTaskForm.ts                 # Form state management
│   │   ├── useUser.ts                     # User data management
│   │   ├── useLocalStorage.ts             # Reactive localStorage wrapper
│   │   ├── useError.ts                    # Error handling utilities
│   │   ├── useFocused.ts                  # Focus management
│   │   └── useWebSocket.ts                # WebSocket simulation (placeholder)
│   ├── stores/
│   │   ├── useModalStore.ts               # Pinia modal state
│   │   ├── useToastStore.ts               # Toast notification state
│   │   └── useViewStore.ts                # Current view mode (board/list/calendar)
│   ├── utils/
│   │   ├── models.ts                      # TypeScript interfaces
│   │   ├── crud-types.ts                  # CRUD operation types
│   │   ├── seedData.ts                    # Mock data generation
│   │   ├── task-stats.ts                  # Statistics calculations
│   │   ├── color-styles.ts                # Priority color mappings
│   │   ├── format-date.ts                 # Date formatting utilities
│   │   ├── normalize-filter.ts            # Search filter normalization
│   │   ├── search-resolver.ts             # Task search resolvers
│   │   ├── replace-by-id.ts               # Array utilities
│   │   ├── errors.ts                      # Custom error classes
│   │   └── transform-data.ts              # Data transformation utilities
│   ├── plugins/
│   │   └── directives.ts                  # Custom directives (auto-focus, focus-trap)
│   ├── assets/
│   │   └── styles/
│   │       └── globals.scss               # Design tokens & global styles
│   ├── pages/
│   │   └── index.vue                      # Main dashboard page
│   ├── layouts/
│   │   └── default.vue                    # Root layout wrapper
│   └── app.vue                            # App root component
├── public/
│   └── robots.txt
├── test/
│   └── nuxt/
│       ├── useCrud.test.ts                # CRUD composable tests
│       ├── useColumns.test.ts             # Columns composable tests
│       └── useActivity.test.ts            # Activity composable tests
├── vitest.config.ts                       # Vitest configuration
├── nuxt.config.ts                         # Nuxt configuration
├── tsconfig.json                          # TypeScript configuration
├── package.json                           # Dependencies & scripts
└── README.md                              # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **pnpm** (recommended)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/Chrono-Task.git
cd Chrono-Task

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Start development server
npm run dev
# or
pnpm dev
```

The application will be available at **[http://localhost:3000](http://localhost:3000)**

---

## 📦 Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start development server with hot reload |
| `npm run build`     | Build for production                     |
| `npm run preview`   | Preview production build locally         |
| `npm run lint`      | Run ESLint on source files               |
| `npm test`          | Run Vitest unit tests                    |
| `npm run test:unit` | Run unit tests with coverage             |

---

## 🛠️ Tech Stack & Tools

| Technology         | Version | Purpose                          |
| ------------------ | ------- | -------------------------------- |
| **Vue.js**         | 3       | Progressive JavaScript framework |
| **Nuxt**           | 4       | Full-stack Vue framework         |
| **TypeScript**     | 5       | Type-safe JavaScript             |
| **SASS/SCSS**      | 1.97    | Advanced CSS styling             |
| **Pinia**          | 2       | State management                 |
| **Vitest**         | 1.0     | Unit testing framework           |
| **Vue Test Utils** | 2       | Component testing utilities      |
| **Nuxt Icon**      | -       | Icon system                      |
| **Google Fonts**   | Lato    | Typography                       |

---

## 🎯 Key Implementation Highlights

### Optimistic Updates with Rollback

```typescript
// Real-time UI update before server confirmation
items.value = replaceById(items.value, id, () => optimisticItem);

try {
  await delay(400, 5, 0.2); // Simulated network call
  logActivity("task:update", optimisticItem.id);
} catch (error) {
  // Automatic rollback on failure
  items.value = replaceById(items.value, id, () => prevItem);
}
```

### Reactive LocalStorage with Caching

```typescript
// Ensures same ref instance across all consumers
const stateCache = new Map<string, Ref<unknown>>();
export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  if (stateCache.has(key)) {
    return stateCache.get(key) as Ref<T>;
  }
  // ... initialization logic
}
```

### Virtual Scrolling for Performance

```typescript
// Efficiently renders 1000+ items with VirtualScroller
<VirtualTaskCards
  :tasks="column.tasks"
  @drop="onDrop($event, column, 'status')"
/>
```

### Drag-and-Drop Implementation

```typescript
function startDrag(event: DragEvent, item: Task) {
  event.dataTransfer!.effectAllowed = "move";
  event.dataTransfer!.setData("taskId", item.id);
}

async function onDrop(event: DragEvent, targetColumn: Column) {
  const taskId = event.dataTransfer?.getData("taskId");
  await update({ status: targetColumn.id }, taskId);
}
```

### Conflict Detection

```typescript
// Simulates concurrent user editing (30% chance)
if (Math.random() < 0.3) activity.simulateOtherUserEditing(id);
if (!activity.checkAndBlockIfEdited(id)) {
  throw new Error("Edit conflict: another user is editing this task.");
}
```

---

## 🧪 Testing

ChronoTask includes unit tests for composables demonstrating testing best practices:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

- ✅ `useCrud` — CRUD operations, optimistic updates, error handling
- ✅ `useColumns` — Column organization, filtering, drag-drop logic
- ✅ `useActivity` — Activity logging, user simulation, conflict detection

Tests use Vue Test Utils with `defineComponent` to provide proper component instance context for lifecycle hooks.

---

## 🎨 Design System

### Color Palette

| Color         | Hex       | Usage                         |
| ------------- | --------- | ----------------------------- |
| **Slate 950** | `#0f172a` | Background                    |
| **Slate 100** | `#f1f5f9` | Primary text                  |
| **Teal 500**  | `#14b8a6` | Accent & interactive elements |
| **Teal 600**  | `#0d9488` | Hover states                  |
| **Slate 700** | `#334155` | Secondary text                |
| **Coral 500** | `#f97316` | Destructive actions           |
| **Amber 500** | `#f59e0b` | Warnings                      |
| **Green 500** | `#22c55e` | Success states                |

### Typography

- **Font Family** — Lato (via Google Fonts)
- **Base Size** — 16px
- **Line Height** — 1.5

### Responsive Breakpoints

- **Mobile** — < 768px
- **Tablet** — 768px - 1024px
- **Desktop** — > 1024px

The dashboard adapts intelligently:

- **Mobile** — Single column with horizontal scroll
- **Tablet** — 2 columns
- **Desktop** — 3 columns (always visible, user can scroll)

---

## 🔑 Key Features by Component

### Board View (`DashView.vue`)

- 3-column Kanban layout with drag-and-drop
- Status-based task organization
- Responsive grid that adapts to screen size
- Skeleton loaders during data fetch

### List View (`ListView.vue`)

- Horizontal scrolling columns (always 3 visible)
- All columns simultaneously visible for comparison
- Drag-drop support between columns
- Task expansion on click

### Calendar View (`CalendarView.vue`)

- Date-grouped columns (current month + next month)
- Drag-drop date reassignment
- Scroll-to-today functionality
- Watcher integration for real-time updates

### Filter System

- Filter by priority, assignee, or search term
- Multi-token search with AND logic
- Works across all view modes
- Normalized token matching

### Modal System

- Create/edit task modal with form validation
- Delete confirmation modal
- Smooth open/close animations
- Focus trap directives for accessibility

### Activity Simulation

- 30% chance of concurrent user edits
- Generates activity logs with timestamps
- Toast notifications for external changes
- Automatic blocking during conflicts

---

## 🚦 Performance Features

| Feature                  | Benefit                         |
| ------------------------ | ------------------------------- |
| **Virtual Scrolling**    | Handles 1000+ items efficiently |
| **Skeleton Loaders**     | Progressive content revelation  |
| **Memoization**          | Prevents unnecessary re-renders |
| **Debounced Search**     | Reduces filter operations       |
| **Lazy Loading**         | Task details load on demand     |
| **Responsive Grid**      | Always 3 columns on desktop     |
| **LocalStorage Caching** | Immediate data availability     |

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

<div align="center">

**[⬆ Back to top](#chronotask)**

Built with ❤️ using Vue 3, Nuxt, and TypeScript

</div>

## Tech Stack

```
├── Framework        Nuxt 4
├── Language         TypeScript 5
├── Styling          SASS (SCSS)
├── Components       Vue 3 Composition API
├── Icons            Nuxt Lucide Icons
├── Fonts            Lato (Google Fonts)
└── Deployment       Vercel
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm / npm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/chronotask.git

# Navigate to directory
cd chronotask

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
chronotask/
├── app/
│   ├── layouts/
│   │   └── default.vue     # Root layout
│   ├── pages/
│   │   └── index.vue       # Main dashboard page
│   ├── components/         # Vue components
│   │   ├── TheSidebar.vue  # Navigation sidebar
│   │   ├── TheHeader.vue   # Top header with search
│   │   ├── TaskColumn.vue  # Individual task columns
│   │   ├── TaskCard.vue    # Task card component
│   │   └── TheStats.vue    # Statistics dashboard
│   ├── assets/
│   │   └── styles/
│   │       └── globals.scss # Global styles & design tokens
│   └── utils/
│       ├── task-board.ts   # Mock database & queries
│       └── models.ts       # TypeScript interfaces
└── public/
    └── ...                 # Static assets
```

---

## Design Decisions

### Color Palette

| Color     | Hex       | Usage                |
| --------- | --------- | -------------------- |
| Slate 950 | `#0f172a` | Background           |
| Slate 100 | `#f1f5f9` | Primary text         |
| Teal 500  | `#14b8a6` | Accent / Interactive |
| Coral 500 | `#f97316` | Destructive actions  |
| Amber 500 | `#f59e0b` | Warnings             |

### Loading Strategy

Mock API calls simulate real-world latency (1000-1500ms) to showcase:

- Skeleton placeholder animations
- Graceful content transitions
- Progressive loading patterns

---

## Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Build for production     |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with care by [Your Name](https://github.com/yourusername)**

If you found this useful, please consider giving it a star!

</div>
