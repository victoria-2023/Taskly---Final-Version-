# Taskly - Next.js Architecture & Design Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  (React Components + Tailwind CSS + Recharts/Chart.js)     │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    Pages Layer (Next.js)                     │
│  - index.tsx (Dashboard)                                     │
│  - tasks.tsx (Task Management)                               │
│  - scheduler.tsx (Weekly Calendar)                           │
│  - reports.tsx (Analytics)                                   │
│  - profile.tsx, settings.tsx, notifications.tsx, login.tsx   │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  Component Library                           │
│  - Layout (Sidebar + Header)                                 │
│  - Shadcn/UI Components (Button, Card, Input, etc.)         │
│  - Custom Components (ThemeSwitch, etc.)                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  State Management                            │
│  - React useState/useEffect hooks                            │
│  - Context API (ThemeProvider)                               │
│  - Local component state                                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  Data Services Layer                         │
│  - storage.ts (localStorage abstraction)                     │
│  - mockData.ts (initial data generation)                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    Data Layer                                │
│  Browser localStorage (client-side persistence)              │
│  Keys: taskly_tasks, taskly_events, taskly_user, etc.       │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Core Framework
- **Next.js 15.2** (Page Router)
- **React 18.3** (Functional Components + Hooks)
- **TypeScript** (Strict type safety)

### UI & Styling
- **Tailwind CSS v3.4** (Utility-first styling)
- **Shadcn/UI** (Pre-built component library)
- **Lucide React 0.474.0** (Icon library)

### Data Visualization
- **Recharts** (Charts: Pie, Bar, Line)

### Form Handling
- **React Hook Form** (Form management)
- **Zod** (Schema validation)

### Animation
- **Framer Motion** (Smooth transitions)

### Data Persistence
- **localStorage API** (Client-side browser storage)

## Project Structure

```
taskly/
├── src/
│   ├── components/
│   │   ├── ui/                      # Shadcn/UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── select.tsx
│   │   │   └── ... (40+ components)
│   │   ├── Layout.tsx               # Main app layout
│   │   └── ThemeSwitch.tsx          # Theme toggle
│   │
│   ├── contexts/
│   │   └── ThemeProvider.tsx        # Theme context
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx           # Responsive utilities
│   │   └── use-toast.ts             # Toast notifications
│   │
│   ├── lib/
│   │   ├── utils.ts                 # Utility functions
│   │   ├── storage.ts               # localStorage wrapper
│   │   └── mockData.ts              # Initial mock data
│   │
│   ├── pages/
│   │   ├── _app.tsx                 # App wrapper with auth
│   │   ├── _document.tsx            # HTML document
│   │   ├── index.tsx                # Dashboard
│   │   ├── tasks.tsx                # Task management
│   │   ├── scheduler.tsx            # Weekly calendar
│   │   ├── reports.tsx              # Analytics & reports
│   │   ├── profile.tsx              # User profile
│   │   ├── settings.tsx             # App settings
│   │   ├── notifications.tsx        # Notifications center
│   │   ├── login.tsx                # Login page
│   │   └── 404.tsx                  # 404 error page
│   │
│   ├── styles/
│   │   └── globals.css              # Global styles + Tailwind
│   │
│   └── types/
│       └── index.ts                 # TypeScript interfaces
│
├── public/
│   └── favicon.ico
│
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript config
├── next.config.mjs                  # Next.js config
├── package.json                     # Dependencies
└── README.md
```

## Data Models (TypeScript Interfaces)

### Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  category: "study" | "work" | "personal";
  priority: "high" | "medium" | "low";
  dueDate: string; // ISO date string
  completed: boolean;
  progress: number; // 0-100
  subtasks: Subtask[];
  createdAt: string; // ISO timestamp
}
```

### Subtask Interface
```typescript
interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}
```

### ScheduleEvent Interface
```typescript
interface ScheduleEvent {
  id: string;
  title: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  startTime: string; // "HH:MM" format
  endTime: string; // "HH:MM" format
  category: "study" | "work" | "personal";
  type: "scheduled" | "conflict" | "suggested";
}
```

### User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedDate: string; // ISO date
  stats: {
    totalTasks: number;
    completedTasks: number;
    studyHours: number;
    streak: number;
  };
}
```

### WeeklyReflection Interface
```typescript
interface WeeklyReflection {
  id: string;
  weekStart: string; // ISO date
  achievements: string;
  improvements: string;
  createdAt: string; // ISO timestamp
}
```

### Notification Interface
```typescript
interface Notification {
  id: string;
  type: "task" | "deadline" | "achievement" | "reminder";
  title: string;
  message: string;
  timestamp: string; // ISO timestamp
  read: boolean;
  link?: string;
}
```

### Settings Interface
```typescript
interface Settings {
  theme: "light" | "dark" | "system";
  notifications: {
    email: boolean;
    push: boolean;
    deadlineReminders: boolean;
    dailySummary: boolean;
  };
  preferences: {
    weekStartDay: "Mon" | "Sun";
    timeFormat: "12h" | "24h";
    defaultTaskCategory: "study" | "work" | "personal";
  };
}
```

## Core Features & Implementation

### 1. Dashboard (`/`)

**Purpose**: Overview of productivity metrics and upcoming tasks

**Key Components**:
- **Metrics Cards**: Task completion rate, study hours today, next deadline
- **Upcoming Tasks List**: Next 4 incomplete tasks sorted by due date
- **Weekly Calendar Preview**: 7-day grid with event indicators

**Data Flow**:
```
User visits Dashboard
    ↓
useEffect loads data from localStorage
    ↓
Calculate metrics (completion %, study hours, etc.)
    ↓
Render cards and lists
    ↓
Data updates in real-time when tasks/events change
```

**Key Functions**:
```typescript
const completionRate = Math.round((completedTasks / totalTasks) * 100);
const todayEvents = events.filter(e => e.day === currentDay);
const upcomingTasks = tasks
  .filter(t => !t.completed)
  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  .slice(0, 4);
```

### 2. Tasks Page (`/tasks`)

**Purpose**: Full CRUD task management with progress tracking

**Key Features**:
- **Task List**: Scrollable list with filter by category
- **Add Task Form**: Title, category, priority, due date
- **Task Card**: Title, badges, progress bar, subtasks, actions
- **Subtask Management**: Individual checkboxes with auto-progress calculation
- **Progress Calculation**: Auto-calculated from completed subtasks

**Data Operations**:
```typescript
// Add Task
const addTask = () => {
  const task = { id: Date.now().toString(), ...formData };
  const updated = [...tasks, task];
  setTasks(updated);
  storage.saveTasks(updated);
};

// Toggle Complete
const toggleTaskComplete = (taskId) => {
  const updated = tasks.map(t => 
    t.id === taskId 
      ? { ...t, completed: !t.completed, progress: !t.completed ? 100 : t.progress }
      : t
  );
  setTasks(updated);
  storage.saveTasks(updated);
};

// Calculate Progress
const calculateProgress = (task) => {
  if (task.subtasks.length === 0) return task.completed ? 100 : 0;
  const completed = task.subtasks.filter(st => st.completed).length;
  return Math.round((completed / task.subtasks.length) * 100);
};
```

### 3. Scheduler Page (`/scheduler`)

**Purpose**: Weekly calendar with conflict detection

**Key Features**:
- **Weekly Grid**: 7 columns (days) × 12 rows (8am-8pm time slots)
- **Add Event Form**: Title, day, start/end time, category
- **Conflict Detection**: Real-time overlap detection
- **Smart Suggestions**: AI-generated optimal study time slots
- **Color Coding**: Blue (study), Green (work), Purple (personal), Red (conflict)

**Conflict Detection Algorithm**:
```typescript
const detectConflicts = (newEvent) => {
  return events.filter(existing => {
    if (existing.day !== newEvent.day) return false;
    
    const newStart = parseInt(newEvent.startTime.replace(":", ""));
    const newEnd = parseInt(newEvent.endTime.replace(":", ""));
    const existingStart = parseInt(existing.startTime.replace(":", ""));
    const existingEnd = parseInt(existing.endTime.replace(":", ""));
    
    // Check for time overlap
    return (
      (newStart >= existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    );
  });
};
```

**Grid Rendering Logic**:
```typescript
const getEventForSlot = (day, hour) => {
  return events.filter(event => {
    if (event.day !== day) return false;
    const [startHour] = event.startTime.split(":").map(Number);
    const [endHour] = event.endTime.split(":").map(Number);
    return hour >= startHour && hour < endHour;
  });
};
```

### 4. Reports Page (`/reports`)

**Purpose**: Analytics dashboard with charts and weekly reflection

**Key Features**:
- **Summary Metrics**: Total hours, tasks completed, avg daily focus, productivity score
- **Pie Chart**: Weekly hours distribution by category
- **Bar Chart**: Daily productivity (hours per day)
- **Line Chart**: 4-week trend analysis (study/work/personal hours)
- **Weekly Reflection**: Text areas for achievements and improvements

**Chart Data Calculations**:
```typescript
// Category Time Distribution
const calculateCategoryTime = () => {
  const categoryHours = { study: 0, work: 0, personal: 0 };
  
  events.forEach(event => {
    const [startHour] = event.startTime.split(":").map(Number);
    const [endHour] = event.endTime.split(":").map(Number);
    const duration = endHour - startHour;
    categoryHours[event.category] += duration;
  });
  
  return [
    { category: "Study", hours: categoryHours.study, color: "#3B82F6" },
    { category: "Work", hours: categoryHours.work, color: "#10B981" },
    { category: "Personal", hours: categoryHours.personal, color: "#F59E0B" }
  ];
};

// Daily Productivity
const calculateDailyProductivity = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map(day => {
    const dayEvents = events.filter(e => e.day === day);
    const hours = dayEvents.reduce((sum, e) => {
      const [start] = e.startTime.split(":").map(Number);
      const [end] = e.endTime.split(":").map(Number);
      return sum + (end - start);
    }, 0);
    return { day, hours };
  });
};
```

### 5. Profile Page (`/profile`)

**Purpose**: User profile management and achievement tracking

**Key Features**:
- **User Info Card**: Avatar, name, email, role, join date
- **Edit Profile**: Inline editing with save/cancel
- **Statistics Grid**: Total tasks, completed, study hours, streak
- **Achievement Badges**: Gamification with earned/unearned badges
- **Completion Rate**: Visual progress bar

### 6. Settings Page (`/settings`)

**Purpose**: Application preferences and configuration

**Key Features**:
- **Notifications**: Email, push, deadline reminders, daily summary toggles
- **Appearance**: Theme selection (light/dark/system)
- **Preferences**: Week start day, time format, default category
- **Data Management**: Export data, clear all data

### 7. Notifications Page (`/notifications`)

**Purpose**: Notification center with filtering

**Key Features**:
- **Notification List**: All/Unread/Read filtering
- **Notification Types**: Task, deadline, achievement, reminder
- **Actions**: Mark as read, delete individual, clear all
- **Timestamp**: Relative time display (e.g., "2h ago")

### 8. Login Page (`/login`)

**Purpose**: User authentication and onboarding

**Key Features**:
- **Form Fields**: Name, email, role
- **Validation**: Real-time form validation
- **localStorage Auth**: Stores user data and auth flag
- **Protected Routes**: Redirects to login if not authenticated

## Data Persistence Strategy

### localStorage Structure

```javascript
// User Authentication
localStorage.setItem("taskly_authenticated", "true");

// User Profile
localStorage.setItem("taskly_user", JSON.stringify({
  id: "1",
  name: "Alex Johnson",
  email: "alex@email.com",
  role: "Student",
  joinedDate: "2024-01-15",
  stats: { totalTasks: 48, completedTasks: 32, studyHours: 156, streak: 7 }
}));

// Tasks Data
localStorage.setItem("taskly_tasks", JSON.stringify([
  { id: "1", title: "Task 1", ... },
  { id: "2", title: "Task 2", ... }
]));

// Schedule Events
localStorage.setItem("taskly_events", JSON.stringify([
  { id: "e1", title: "Math", day: "Mon", ... }
]));

// Weekly Reflections
localStorage.setItem("taskly_reflections", JSON.stringify([
  { id: "r1", weekStart: "2025-01-20", ... }
]));

// Notifications
localStorage.setItem("taskly_notifications", JSON.stringify([
  { id: "n1", type: "deadline", ... }
]));

// Settings
localStorage.setItem("taskly_settings", JSON.stringify({
  theme: "light",
  notifications: { ... },
  preferences: { ... }
}));
```

### Storage Service (`lib/storage.ts`)

```typescript
export const storage = {
  // Tasks
  getTasks: () => JSON.parse(localStorage.getItem("taskly_tasks") || "[]"),
  saveTasks: (tasks) => localStorage.setItem("taskly_tasks", JSON.stringify(tasks)),
  
  // Events
  getEvents: () => JSON.parse(localStorage.getItem("taskly_events") || "[]"),
  saveEvents: (events) => localStorage.setItem("taskly_events", JSON.stringify(events)),
  
  // Reflections
  getReflections: () => JSON.parse(localStorage.getItem("taskly_reflections") || "[]"),
  saveReflections: (reflections) => localStorage.setItem("taskly_reflections", JSON.stringify(reflections)),
  
  // Clear all data
  clearAll: () => {
    localStorage.removeItem("taskly_tasks");
    localStorage.removeItem("taskly_events");
    localStorage.removeItem("taskly_reflections");
    localStorage.removeItem("taskly_notifications");
  }
};
```

## Routing & Navigation

### Page Router Structure

```
/ (index.tsx)              → Dashboard
/tasks                     → Task Management
/scheduler                 → Weekly Calendar
/reports                   → Analytics & Reports
/profile                   → User Profile
/settings                  → App Settings
/notifications             → Notification Center
/login                     → Login Page
/404                       → 404 Error Page
```

### Protected Routes Implementation

```typescript
// _app.tsx
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = localStorage.getItem("taskly_authenticated");
    setIsAuthenticated(authenticated === "true");

    if (!authenticated && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  const isLoginPage = router.pathname === "/login";

  if (isLoginPage) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

## UI Component Architecture

### Layout Component (`components/Layout.tsx`)

```
┌────────────────────────────────────────────────────┐
│                    Sidebar (fixed)                  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Logo (Taskly)                                │  │
│  │  Navigation Links:                            │  │
│  │    - Dashboard                                │  │
│  │    - Tasks                                    │  │
│  │    - Scheduler                                │  │
│  │    - Reports                                  │  │
│  │  User Profile Card                            │  │
│  └──────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────┤
│                   Header Bar                       │
│  ┌──────────────────────────────────────────────┐  │
│  │  Page Title  [Notifications] [Settings] [User]│  │
│  └──────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────┤
│                  Main Content Area                 │
│  ┌──────────────────────────────────────────────┐  │
│  │                                                │  │
│  │  {children} - Page-specific content           │  │
│  │                                                │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Shadcn/UI Components Used

- **Form Controls**: Button, Input, Textarea, Checkbox, Switch, Select
- **Layout**: Card, Badge, Separator, Tabs
- **Feedback**: Progress, Toast, Alert, Alert Dialog
- **Navigation**: Navigation Menu, Dropdown Menu, Context Menu
- **Data Display**: Table, Avatar, Calendar, Tooltip

## State Management Pattern

### Component-Level State (React Hooks)

```typescript
// Local state for form inputs
const [newTask, setNewTask] = useState({
  title: "",
  category: "study",
  priority: "medium",
  dueDate: ""
});

// Loading from localStorage on mount
useEffect(() => {
  const storedTasks = storage.getTasks();
  setTasks(storedTasks);
}, []);

// Saving to localStorage on changes
const addTask = () => {
  const updatedTasks = [...tasks, newTask];
  setTasks(updatedTasks);
  storage.saveTasks(updatedTasks);
};
```

### Context API (Theme)

```typescript
// contexts/ThemeProvider.tsx
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Performance Optimizations

### Client-Side Rendering Only
- All pages use CSR (useEffect for data loading)
- No SSR/SSG to avoid hydration issues with localStorage
- Fast initial load, data loads after mount

### Conditional Rendering
```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null; // Prevent SSR hydration mismatch
```

### Efficient Re-renders
- Component-level state to minimize re-renders
- Memoization where needed (React.memo, useMemo, useCallback)
- Optimized list rendering with proper keys

## Security Considerations

### Data Privacy
- All data stored locally in user's browser
- No backend server or database
- Data never transmitted over network
- User has full control over their data

### XSS Protection
- React's built-in XSS protection
- No dangerouslySetInnerHTML usage
- Input sanitization for user-generated content

### Authentication
- Simple flag-based authentication
- Protected routes redirect to login
- localStorage-based session management

## Deployment Options

### Vercel (Recommended)
1. Connect GitHub repository
2. Auto-deploy on push
3. Zero configuration required
4. Free tier available

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Auto-deploy on push

### Static Export (if needed)
```bash
npm run build
npm run export
```
Deploy static files to any hosting service

## Browser Compatibility

### Supported Browsers
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

### localStorage Support
- All modern browsers support localStorage
- 5-10MB storage limit per domain
- Falls back gracefully if disabled

## Future Enhancement Opportunities

### Phase 2 - Backend Integration
- Connect to Supabase for cloud sync
- Multi-device synchronization
- User authentication with OAuth
- Real-time collaboration features

### Phase 3 - Advanced Features
- Push notifications (Web Push API)
- Offline support (Service Workers)
- Export to PDF/CSV
- Integration with Google Calendar
- Pomodoro timer integration
- Study group collaboration

### Phase 4 - Mobile
- Progressive Web App (PWA)
- Mobile-responsive design enhancements
- Touch gesture support
- Native mobile app (React Native)

## Testing Strategy

### Manual Testing Checklist
- [ ] User can login and create profile
- [ ] Dashboard displays correct metrics
- [ ] Tasks can be created, edited, completed, deleted
- [ ] Subtasks update task progress correctly
- [ ] Scheduler detects conflicts accurately
- [ ] Charts render with correct data
- [ ] Weekly reflections can be saved and viewed
- [ ] Settings persist across sessions
- [ ] Notifications display and can be managed
- [ ] Profile stats update correctly
- [ ] Theme switching works properly
- [ ] Data persists after browser refresh
- [ ] All routes are protected and redirect properly

### Automated Testing (Future)
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for data flow
- E2E tests with Playwright/Cypress

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:3000
```

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Code Quality
```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Format code
npx prettier --write .
```

## Success Metrics

### Technical Success
✅ Zero build errors
✅ TypeScript strict mode enabled
✅ All localStorage operations work correctly
✅ Responsive on all screen sizes
✅ Accessible (WCAG AA compliance)
✅ Fast page loads (<1s)

### User Experience Success
✅ Intuitive navigation
✅ Smooth animations
✅ Clear visual feedback
✅ No data loss on refresh
✅ Consistent UI/UX across pages
✅ Helpful error messages

---

This architecture provides a solid foundation for the Next.js/React version of Taskly with room for future enhancements and scaling!
