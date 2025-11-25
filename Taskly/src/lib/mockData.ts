
import { Task, ScheduleEvent } from "@/types";

const getRelativeDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
};

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete React Assignment",
    category: "study",
    priority: "high",
    dueDate: getRelativeDate(3),
    completed: false,
    progress: 50,
    subtasks: [
      { id: "1-1", title: "Set up project structure", completed: true },
      { id: "1-2", title: "Implement components", completed: true },
      { id: "1-3", title: "Add styling", completed: false },
      { id: "1-4", title: "Write tests", completed: false },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Team Meeting Preparation",
    category: "work",
    priority: "medium",
    dueDate: getRelativeDate(6),
    completed: false,
    progress: 33,
    subtasks: [
      { id: "2-1", title: "Review agenda", completed: true },
      { id: "2-2", title: "Prepare slides", completed: false },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Grocery Shopping",
    category: "personal",
    priority: "low",
    dueDate: getRelativeDate(1),
    completed: true,
    progress: 100,
    subtasks: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Study for Midterm Exam",
    category: "study",
    priority: "high",
    dueDate: getRelativeDate(5),
    completed: false,
    progress: 0,
    subtasks: [],
    createdAt: new Date().toISOString(),
  },
];

export const initialEvents: ScheduleEvent[] = [
  {
    id: "e1",
    title: "Math",
    day: "Mon",
    startTime: "10:00",
    endTime: "11:30",
    category: "study",
    type: "scheduled",
  },
  {
    id: "e2",
    title: "Work Shift",
    day: "Tue",
    startTime: "08:00",
    endTime: "12:00",
    category: "work",
    type: "scheduled",
  },
  {
    id: "e3",
    title: "Lab",
    day: "Thu",
    startTime: "11:00",
    endTime: "13:00",
    category: "study",
    type: "scheduled",
  },
  {
    id: "e4",
    title: "Study Time",
    day: "Wed",
    startTime: "14:00",
    endTime: "16:00",
    category: "study",
    type: "scheduled",
  },
  {
    id: "e5",
    title: "Assignment",
    day: "Thu",
    startTime: "14:30",
    endTime: "16:30",
    category: "study",
    type: "scheduled",
  },
  {
    id: "e6",
    title: "Study Group",
    day: "Wed",
    startTime: "16:00",
    endTime: "18:00",
    category: "study",
    type: "scheduled",
  },
  {
    id: "e7",
    title: "Personal",
    day: "Sun",
    startTime: "15:00",
    endTime: "17:00",
    category: "personal",
    type: "scheduled",
  },
];
