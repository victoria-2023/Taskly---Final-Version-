# Taskly - Student Productivity Web Application

A modern, feature-rich productivity web application built with Next.js, React, and TypeScript. Taskly helps students manage tasks, schedule study sessions, track productivity metrics, and achieve their goals.

![Taskly Dashboard](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features Documentation](#-key-features-documentation)
- [Data Storage](#-data-storage)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 📊 Dashboard
- **Real-time Metrics**: Task completion rate, study hours, next deadline countdown
- **Upcoming Tasks**: View your next 4 tasks sorted by due date
- **Weekly Overview**: 7-day calendar preview with event indicators
- **Personalized Greeting**: Time-based welcome messages

### ✅ Task Management
- **Full CRUD Operations**: Create, read, update, and delete tasks
- **Subtasks**: Break down tasks into manageable subtasks
- **Progress Tracking**: Automatic progress calculation based on subtask completion
- **Category System**: Organize tasks as Study, Work, or Personal
- **Priority Levels**: Set High, Medium, or Low priority
- **Smart Filtering**: Filter tasks by category
- **Due Date Tracking**: Never miss a deadline

### 📅 Smart Scheduler
- **Weekly Calendar Grid**: Visual 7-day schedule (8am-8pm)
- **Conflict Detection**: Automatically identifies scheduling conflicts
- **Smart Suggestions**: AI-powered optimal study time recommendations
- **Color-Coded Events**: Blue (study), Green (work), Purple (personal), Red (conflicts)
- **Quick Event Creation**: Add study sessions with title, day, time, and category

### 📈 Reports & Analytics
- **Productivity Metrics**: Total hours, tasks completed, daily averages
- **Pie Chart**: Weekly hours distribution by category
- **Bar Chart**: Daily productivity visualization
- **Line Chart**: 4-week productivity trends
- **Weekly Reflection**: Track achievements and areas for improvement
- **Reflection History**: View past reflections

### 👤 User Profile
- **Profile Management**: Edit name, email, and role
- **Statistics Dashboard**: Track total tasks, completion rate, study hours, streaks
- **Achievement System**: Earn badges for milestones
- **Visual Progress**: Completion rate progress bar

### ⚙️ Settings
- **Notification Preferences**: Email, push, deadline reminders, daily summary
- **Appearance**: Theme selection (light/dark/system)
- **Week Preferences**: Start day (Mon/Sun), time format (12h/24h)
- **Default Categories**: Set preferred task category
- **Data Management**: Export data, clear all data

### 🔔 Notifications
- **Notification Center**: View all notifications in one place
- **Type Filtering**: Filter by task, deadline, achievement, or reminder
- **Read/Unread Status**: Mark notifications as read
- **Time Stamps**: Relative time display (e.g., "2h ago")

## 🛠 Tech Stack

### Core Framework
- **Next.js 15.2** (Page Router)
- **React 18.3** (Functional Components + Hooks)
- **TypeScript** (Strict type safety)

### UI & Styling
- **Tailwind CSS v3.4** (Utility-first styling)
- **Shadcn/UI** (Pre-built component library with 40+ components)
- **Lucide React 0.474.0** (Beautiful icon library)

### Data Visualization
- **Recharts** (Responsive charts: Pie, Bar, Line)

### Form & Validation
- **React Hook Form** (Efficient form management)
- **Zod** (Schema validation)

### Animation
- **Framer Motion** (Smooth transitions and animations)

### Data Persistence
- **localStorage API** (Client-side browser storage)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd taskly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### First Time Setup

1. On first visit, you'll see the **Login Page**
2. Enter your:
   - Full Name (required)
   - Email Address (required)
   - Role (optional, e.g., "Student")
3. Click **"Get Started"**
4. You'll be redirected to the Dashboard with mock data pre-loaded

### Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📁 Project Structure

```
taskly/
├── src/
│   ├── components/
│   │   ├── ui/                   # Shadcn/UI components (40+ components)
│   │   ├── Layout.tsx            # Main app layout with sidebar
│   │   └── ThemeSwitch.tsx       # Theme toggle component
│   │
│   ├── contexts/
│   │   └── ThemeProvider.tsx     # Theme context provider
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx        # Responsive utilities
│   │   └── use-toast.ts          # Toast notifications
│   │
│   ├── lib/
│   │   ├── utils.ts              # Utility functions
│   │   ├── storage.ts            # localStorage wrapper
│   │   └── mockData.ts           # Initial mock data
│   │
│   ├── pages/
│   │   ├── _app.tsx              # App wrapper with auth
│   │   ├── _document.tsx         # HTML document
│   │   ├── index.tsx             # Dashboard (/)
│   │   ├── tasks.tsx             # Task management (/tasks)
│   │   ├── scheduler.tsx         # Weekly calendar (/scheduler)
│   │   ├── reports.tsx           # Analytics (/reports)
│   │   ├── profile.tsx           # User profile (/profile)
│   │   ├── settings.tsx          # App settings (/settings)
│   │   ├── notifications.tsx     # Notifications (/notifications)
│   │   ├── login.tsx             # Login page (/login)
│   │   └── 404.tsx               # 404 error page
│   │
│   ├── styles/
│   │   └── globals.css           # Global styles + Tailwind
│   │
│   └── types/
│       └── index.ts              # TypeScript interfaces
│
├── public/                       # Static assets
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
├── next.config.mjs               # Next.js config
└── package.json                  # Dependencies
```

## 📚 Key Features Documentation

### Task Management System

#### Creating a Task
1. Navigate to **Tasks** page
2. Click **"Add New Task"** button
3. Fill in:
   - **Title**: Task description
   - **Category**: Study, Work, or Personal
   - **Due Date**: Select deadline
   - **Priority**: High, Medium, or Low
4. Click **"Add Task"**

#### Managing Subtasks
- Tasks automatically calculate progress based on completed subtasks
- Check/uncheck individual subtasks to update progress
- Progress bar updates in real-time

#### Filtering Tasks
- Use the category filter dropdown to view:
  - All Tasks
  - Study tasks only
  - Work tasks only
  - Personal tasks only

### Scheduler & Conflict Detection

#### Adding a Schedule Event
1. Navigate to **Scheduler** page
2. Click **"Add Shift"** button
3. Select:
   - Day (Mon-Sun)
   - Start Time
   - End Time
   - Title
   - Category
4. Click **"Add Shift"**

#### Conflict Detection Algorithm
```typescript
// Detects overlapping time ranges on the same day
if (
  (newStart >= existingStart && newStart < existingEnd) ||
  (newEnd > existingStart && newEnd <= existingEnd) ||
  (newStart <= existingStart && newEnd >= existingEnd)
) {
  // Conflict detected!
}
```

#### Smart Suggestions
The scheduler provides intelligent study time suggestions based on:
- Free time availability
- Morning productivity peaks
- End-of-week review sessions
- Weekend intensive study opportunities

### Reports & Analytics

#### Chart Types

1. **Pie Chart** - Weekly Hours Distribution
   - Shows time spent per category (Study, Work, Personal)
   - Color-coded for easy visualization
   - Displays hours and percentages

2. **Bar Chart** - Daily Productivity
   - 7-day productivity overview
   - Hours per day visualization
   - Identifies most/least productive days

3. **Line Chart** - 4-Week Trends
   - Tracks study, work, and personal hours over 4 weeks
   - Multi-line visualization for comparison
   - Identifies productivity patterns

#### Weekly Reflection
- **Achievements**: What went well this week
- **Improvements**: Areas for growth
- **History**: View last 3 reflections
- **Date-stamped**: Track when reflections were written

## 💾 Data Storage

### localStorage Structure

All data is stored locally in the browser using localStorage:

```javascript
// Authentication
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

// Tasks
localStorage.setItem("taskly_tasks", JSON.stringify([...]));

// Schedule Events
localStorage.setItem("taskly_events", JSON.stringify([...]));

// Weekly Reflections
localStorage.setItem("taskly_reflections", JSON.stringify([...]));

// Notifications
localStorage.setItem("taskly_notifications", JSON.stringify([...]));

// Settings
localStorage.setItem("taskly_settings", JSON.stringify({...}));
```

### Data Privacy
- ✅ All data stored locally in your browser
- ✅ No backend server or database
- ✅ Data never transmitted over network
- ✅ You have full control over your data
- ✅ Export/clear data anytime in Settings

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! 🎉

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next`

### Environment Variables

No environment variables required! The app runs entirely client-side.

## 🧪 Testing

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

## 🎨 Customization

### Changing Colors

Edit `src/styles/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Blue */
  --secondary: 210 40% 96.1%;    /* Light gray */
  /* Add your custom colors */
}
```

### Adding New Pages

1. Create file in `src/pages/your-page.tsx`
2. Add navigation link in `src/components/Layout.tsx`
3. Add route to navigation array

### Customizing Mock Data

Edit `src/lib/mockData.ts` to change initial tasks and events.

## 🔐 Security

- React's built-in XSS protection
- No `dangerouslySetInnerHTML` usage
- Input sanitization for user-generated content
- Protected routes with authentication
- localStorage-based session management

## 🌍 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- localStorage support required (5-10MB storage limit)

## 🚧 Future Enhancements

### Phase 2 - Backend Integration
- [ ] Connect to Supabase for cloud sync
- [ ] Multi-device synchronization
- [ ] User authentication with OAuth
- [ ] Real-time collaboration features

### Phase 3 - Advanced Features
- [ ] Push notifications (Web Push API)
- [ ] Offline support (Service Workers)
- [ ] Export to PDF/CSV
- [ ] Google Calendar integration
- [ ] Pomodoro timer integration
- [ ] Study group collaboration

### Phase 4 - Mobile
- [ ] Progressive Web App (PWA)
- [ ] Mobile-responsive enhancements
- [ ] Touch gesture support
- [ ] Native mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, React, and TypeScript**

Taskly © 2025
