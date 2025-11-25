
import { Task, ScheduleEvent, WeeklyReflection } from "@/types";

const TASKS_KEY = "studypro_tasks";
const EVENTS_KEY = "studypro_events";
const REFLECTIONS_KEY = "studypro_reflections";

export const storage = {
  getTasks: (): Task[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTasks: (tasks: Task[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  getEvents: (): ScheduleEvent[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(EVENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveEvents: (events: ScheduleEvent[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  },

  getReflections: (): WeeklyReflection[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(REFLECTIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveReflections: (reflections: WeeklyReflection[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(reflections));
  },
};
