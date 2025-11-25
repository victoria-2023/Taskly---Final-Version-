
export interface Task {
  id: string;
  title: string;
  category: "study" | "work" | "personal";
  priority: "high" | "medium" | "low";
  dueDate: string;
  completed: boolean;
  progress: number;
  subtasks: Subtask[];
  createdAt: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  startTime: string;
  endTime: string;
  category: "study" | "work" | "personal";
  type: "scheduled" | "suggested" | "conflict";
}

export interface WeeklyReflection {
  id: string;
  weekStart: string;
  achievements: string;
  improvements: string;
  createdAt: string;
}

export interface DailyProductivity {
  day: string;
  hours: number;
}

export interface CategoryTime {
  category: string;
  hours: number;
  color: string;
  [key: string]: any;
}

export interface WeeklyTrend {
  week: string;
  studyHours: number;
  workHours: number;
  personalHours: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinedDate: string;
  stats: {
    totalTasks: number;
    completedTasks: number;
    studyHours: number;
    streak: number;
  };
}

export interface Notification {
  id: string;
  type: "task" | "deadline" | "achievement" | "reminder";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Settings {
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
