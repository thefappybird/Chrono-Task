<div align="center">

# ChronoTask

**A beautifully crafted task management application showcasing modern frontend design**

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SASS](https://img.shields.io/badge/SASS-1.97-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-14b8a6?style=flat-square)](CONTRIBUTING.md)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat-square&logo=vercel)](https://chronotask.vercel.app)

[Live Demo](https://chronotask.vercel.app) · [Report Bug](https://github.com/yourusername/chronotask/issues) · [Request Feature](https://github.com/yourusername/chronotask/issues)

</div>

---

## Overview

ChronoTask is a **frontend-only** task management application designed as a portfolio piece to demonstrate expertise in modern web development practices. It features realistic mock data fetching, elegant skeleton loading states, and polished micro-interactions.

### Why ChronoTask?

This project showcases:

- **Loading States Excellence** — Realistic skeleton loaders with shimmer animations
- **Mock API Simulation** — Simulated network latency for authentic UX testing
- **Micro-interactions** — Subtle animations that enhance user experience
- **Modern Design System** — Cohesive dark theme with teal accents
- **Component Architecture** — Clean, reusable Vue components

---

## Features

| Feature | Description |
|---------|-------------|
| **Kanban Board** | Drag-ready task columns with status indicators |
| **Skeleton Loading** | Beautiful shimmer animations during data fetch |
| **Mock Database** | Simulated API calls with realistic delays |
| **Stats Dashboard** | Real-time productivity metrics visualization |
| **Activity Feed** | Live updates with staggered animations |
| **Responsive Design** | Optimized for all screen sizes |
| **Collapsible Sidebar** | Clean navigation with project shortcuts |

---

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

| Color | Hex | Usage |
|-------|-----|-------|
| Slate 950 | `#0f172a` | Background |
| Slate 100 | `#f1f5f9` | Primary text |
| Teal 500 | `#14b8a6` | Accent / Interactive |
| Coral 500 | `#f97316` | Destructive actions |
| Amber 500 | `#f59e0b` | Warnings |

### Loading Strategy

Mock API calls simulate real-world latency (1000-1500ms) to showcase:
- Skeleton placeholder animations
- Graceful content transitions
- Progressive loading patterns

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

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
